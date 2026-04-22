/**
 * Order Modal Component
 *
 * Single Responsibility: Modal for customer details and order submission
 * with real-time status polling. Works with the generated API types.
 *
 * @see https://angular.dev/style-guide
 */
import {
  Component,
  inject,
  signal,
  computed,
  OnDestroy,
  Output,
  EventEmitter,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { OrderService, CreateOrderCommand, OrderStatus } from '../../../../generated/api';
import { ToastBannerService } from '../../../../shared/components/toast-banner/toast-banner.service';
import { Subject, takeUntil, interval, switchMap, catchError, of, takeWhile } from 'rxjs';

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  instructions: string;
}

type ModalStep = 'cart' | 'details' | 'processing' | 'status';

@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  template: `
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" (click)="closeModal()"></div>

    <!-- Modal Content -->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden pointer-events-auto"
      >
        <!-- Header -->
        <div
          class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            @switch (currentStep()) { @case ('cart') { Your Cart } @case ('details') { Your Details
            } @case ('processing') { Processing Order } @case ('status') { Order Status } }
          </h2>
          <button
            (click)="closeModal()"
            class="w-10 h-10 flex items-center justify-center rounded-full
                   hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                   text-gray-500 dark:text-gray-400"
            aria-label="Close modal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <!-- Step: Cart Summary -->
          @if (currentStep() === 'cart') { @if (cartService.isEmpty()) {
          <div class="text-center py-8">
            <div class="text-6xl mb-4"></div>
            <p class="text-gray-500 dark:text-gray-400">Your cart is empty</p>
          </div>
          } @else {
          <div class="space-y-3 mb-6">
            @for (item of cartService.items(); track item.pizzaId) {
            <div
              class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
            >
              <div class="flex-1">
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ item.pizzaName }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ item.price | currency }} {{ item.quantity }}
                </p>
              </div>
              <div class="flex items-center gap-3">
                <span class="font-bold text-primary">
                  {{ item.price * item.quantity | currency }}
                </span>
                <button
                  (click)="removeItem(item.pizzaId)"
                  class="text-red-500 hover:text-red-400 transition-colors p-1"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            }
          </div>

          <!-- Totals -->
          <div class="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
            <div class="flex justify-between text-gray-500 dark:text-gray-400">
              <span>Subtotal</span>
              <span>{{ cartService.subtotal() | currency }}</span>
            </div>
            <div class="flex justify-between text-gray-500 dark:text-gray-400">
              <span>Tax (8%)</span>
              <span>{{ cartService.tax() | currency }}</span>
            </div>
            <div class="flex justify-between text-gray-500 dark:text-gray-400">
              <span>Delivery</span>
              <span>{{
                cartService.deliveryFee() === 0 ? 'FREE' : (cartService.deliveryFee() | currency)
              }}</span>
            </div>
            <div
              class="flex justify-between text-xl font-bold pt-2 border-t border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white"
            >
              <span>Total</span>
              <span class="text-primary">{{ cartService.total() | currency }}</span>
            </div>
          </div>
          } }

          <!-- Step: Customer Details -->
          @if (currentStep() === 'details') {
          <form (ngSubmit)="submitOrder()" class="space-y-4">
            <div>
              <label class="block mb-2 font-medium text-gray-900 dark:text-white">
                Your Name
              </label>
              <input
                type="text"
                [(ngModel)]="customerDetails.name"
                name="name"
                placeholder="John Doe"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label class="block mb-2 font-medium text-gray-900 dark:text-white">
                Email Address
              </label>
              <input
                type="email"
                [(ngModel)]="customerDetails.email"
                name="email"
                placeholder="john&#64;example.com"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label class="block mb-2 font-medium text-gray-900 dark:text-white">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                [(ngModel)]="customerDetails.phone"
                name="phone"
                placeholder="+27 11 999 9999"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label class="block mb-2 font-medium text-gray-900 dark:text-white">
                Delivery Address (Optional)
              </label>
              <textarea
                [(ngModel)]="customerDetails.address"
                name="address"
                placeholder="123 Main St, Cape Town"
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows="2"
              ></textarea>
            </div>

            <div>
              <label class="block mb-2 font-medium text-gray-900 dark:text-white">
                Special Instructions (Optional)
              </label>
              <textarea
                [(ngModel)]="customerDetails.instructions"
                name="instructions"
                placeholder="No onions, extra cheese, etc."
                class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows="2"
              ></textarea>
            </div>
          </form>
          }

          <!-- Step: Processing -->
          @if (currentStep() === 'processing') {
          <div class="text-center py-12">
            <div
              class="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"
            ></div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Placing your order...
            </h3>
            <p class="text-gray-500 dark:text-gray-400">
              Please wait while we process your delicious pizza order
            </p>
          </div>
          }

          <!-- Step: Order Status -->
          @if (currentStep() === 'status') {
          <div class="text-center py-8">
            <div class="text-6xl mb-6">
              @switch (orderStatus()) { @case ('Confirmed') { } @case ('Making') { } @case
              ('Complete') { } @case ('SentOutForDelivery') { } @default { } }
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Order #{{ orderId() }}
            </h3>
            <p class="text-lg text-primary font-medium mb-4">
              Status: {{ getStatusLabel(orderStatus()) }}
            </p>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              @switch (orderStatus()) { @case ('Confirmed') { Your order has been confirmed! We're
              getting ready to make your pizza. } @case ('Making') { Our chef is preparing your
              delicious pizza with love! } @case ('Complete') { Your order is complete and ready! }
              @case ('SentOutForDelivery') { Your pizza is on its way! Get ready to enjoy! }
              @default { Processing your order... } }
            </p>

            <!-- Progress Indicator -->
            <div class="flex items-center justify-center gap-2 mb-6">
              @for (step of orderSteps; track step) {
              <div class="flex items-center gap-2">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                  [class.bg-primary]="isStepComplete(step)"
                  [class.text-white]="isStepComplete(step)"
                  [class.bg-gray-200]="!isStepComplete(step)"
                  [class.dark:bg-gray-600]="!isStepComplete(step)"
                  [class.text-gray-500]="!isStepComplete(step)"
                >
                  {{ step.icon }}
                </div>
                @if (!$last) {
                <div
                  class="w-8 h-1 rounded transition-colors"
                  [class.bg-primary]="isStepComplete(step)"
                  [class.bg-gray-200]="!isStepComplete(step)"
                  [class.dark:bg-gray-600]="!isStepComplete(step)"
                ></div>
                }
              </div>
              }
            </div>

            <p class="text-sm text-gray-400">
              @if (orderStatus() !== 'Complete' && orderStatus() !== 'SentOutForDelivery') {
              Auto-refreshing every 5 seconds... } @else { Thank you for your order! }
            </p>
          </div>
          }
        </div>

        <!-- Footer -->
        <div class="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          @if (currentStep() === 'cart' && !cartService.isEmpty()) {
          <button
            (click)="goToDetails()"
            class="w-full py-3 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
          >
            Proceed to Checkout
          </button>
          } @if (currentStep() === 'details') {
          <div class="flex gap-3">
            <button
              type="button"
              (click)="goToCart()"
              class="flex-1 py-3 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Back
            </button>
            <button
              (click)="submitOrder()"
              [disabled]="!isFormValid()"
              class="flex-1 py-3 px-6 bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
            >
              Place Order
            </button>
          </div>
          } @if (currentStep() === 'status') {
          <button
            (click)="closeModal()"
            class="w-full py-3 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class OrderModalComponent implements OnDestroy {
  close = output<void>();

  protected readonly cartService = inject(CartService);
  private readonly orderService = inject(OrderService);
  private readonly toastService = inject(ToastBannerService);
  private readonly destroy$ = new Subject<void>();

  readonly currentStep = signal<ModalStep>('cart');
  readonly orderId = signal<number | null>(null);
  readonly orderStatus = signal<string>('Pending');

  customerDetails: CustomerDetails = {
    name: '',
    email: '',
    phone: '',
    address: '',
    instructions: '',
  };

  readonly orderSteps = [
    { status: 'Confirmed', icon: '1' },
    { status: 'Making', icon: '2' },
    { status: 'Complete', icon: '3' },
    { status: 'SentOutForDelivery', icon: '4' },
  ];

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeModal(): void {
    this.close.emit();
  }

  goToCart(): void {
    this.currentStep.set('cart');
  }

  goToDetails(): void {
    this.currentStep.set('details');
  }

  removeItem(pizzaId: string): void {
    this.cartService.removeItem(pizzaId);
  }

  isFormValid(): boolean {
    return !!(this.customerDetails.name.trim() && this.customerDetails.email.trim());
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      Confirmed: 'Order Confirmed',
      Making: 'Preparing Your Pizza',
      Complete: 'Ready for Pickup/Delivery',
      SentOutForDelivery: 'Out for Delivery',
    };
    return labels[status] || status;
  }

  isStepComplete(step: { status: string }): boolean {
    const statusOrder = ['Confirmed', 'Making', 'Complete', 'SentOutForDelivery'];
    const currentIndex = statusOrder.indexOf(this.orderStatus());
    const stepIndex = statusOrder.indexOf(step.status);
    return stepIndex <= currentIndex;
  }

  submitOrder(): void {
    if (!this.isFormValid()) return;
    if (this.cartService.isEmpty()) {
      this.toastService.error('Your cart is empty');
      return;
    }

    this.currentStep.set('processing');

    // Get the first pizza ID from cart (API expects single pizzaId)
    const firstItem = this.cartService.items()[0];
    const pizzaId = parseInt(firstItem.pizzaId, 10);

    const command: CreateOrderCommand = {
      customerName: this.customerDetails.name,
      customerEmail: this.customerDetails.email,
      pizzaId: pizzaId,
    };

    this.orderService
      .createOrder(command)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.error('Order failed:', err);
          this.toastService.error('Failed to place order. Please try again.');
          this.currentStep.set('details');
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result?.data?.id) {
          this.orderId.set(result.data.id);
          this.orderStatus.set('Confirmed');
          this.currentStep.set('status');
          this.cartService.clearCart();
          this.toastService.success('Order placed successfully!');
          this.startStatusPolling(result.data.id);
        }
      });
  }

  private startStatusPolling(orderId: number): void {
    interval(5000)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.orderService.getOrderStatus(orderId)),
        takeWhile((result) => {
          const status = result?.data;
          return status !== OrderStatus.Complete && status !== OrderStatus.SentOutForDelivery;
        }, true),
        catchError((err) => {
          console.error('Status check failed:', err);
          return of(null);
        })
      )
      .subscribe((result) => {
        if (result?.data) {
          this.orderStatus.set(result.data);
        }
      });
  }
}
