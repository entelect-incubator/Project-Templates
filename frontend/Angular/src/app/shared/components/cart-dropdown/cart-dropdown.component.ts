/**
 * Cart Dropdown Component
 * Shows cart items in a dropdown menu with checkout button
 * Follows SOLID principles - single responsibility for cart preview
 */

import { Component, input, output, inject, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../../features/order/services/cart.service';
import { CartItem } from '../../../features/order/types';

@Component({
  selector: 'app-cart-dropdown',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="fixed inset-0 z-40" (click)="close.emit()"></div>

    <div
      class="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
    >
      <!-- Header -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Your Cart @if (itemCount() > 0) {
          <span class="ml-auto bg-primary text-white text-sm px-2 py-0.5 rounded-full">
            {{ itemCount() }}
          </span>
          }
        </h3>
      </div>

      <!-- Cart Items -->
      <div class="max-h-64 overflow-y-auto">
        @if (items().length === 0) {
        <div class="p-8 text-center">
          <svg
            class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p class="text-gray-500 dark:text-gray-400">Your cart is empty</p>
          <p class="text-sm text-gray-400 dark:text-gray-500 mt-1">Add some delicious pizzas!</p>
        </div>
        } @else { @for (item of items(); track item.pizzaId) {
        <div
          class="p-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div class="flex gap-3">
            <!-- Pizza Icon -->
            <div
              class="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-2xl"
            >
              🍕
            </div>

            <!-- Details -->
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                {{ item.pizzaName }}
              </h4>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ item.price | currency }} × {{ item.quantity }}
              </p>
              <p class="text-sm font-semibold text-primary mt-0.5">
                {{ item.price * item.quantity | currency }}
              </p>
            </div>

            <!-- Quantity Controls -->
            <div class="flex flex-col items-center gap-1">
              <button
                (click)="updateQuantity(item.pizzaId, item.quantity + 1)"
                class="w-6 h-6 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-xs font-bold"
              >
                +
              </button>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{
                item.quantity
              }}</span>
              <button
                (click)="updateQuantity(item.pizzaId, item.quantity - 1)"
                class="w-6 h-6 rounded bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center text-xs font-bold"
              >
                −
              </button>
            </div>
          </div>
        </div>
        } }
      </div>

      <!-- Footer -->
      @if (items().length > 0) {
      <div class="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <!-- Total -->
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-600 dark:text-gray-400">Total:</span>
          <span class="text-xl font-bold text-gray-900 dark:text-white">{{
            total() | currency
          }}</span>
        </div>

        <!-- Actions -->
        <div class="flex gap-2">
          <button
            (click)="cartService.clearCart()"
            class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            Clear
          </button>
          <button
            (click)="checkout.emit()"
            class="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-medium flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Checkout
          </button>
        </div>
      </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class CartDropdownComponent {
  close = output<void>();
  checkout = output<void>();

  protected readonly cartService = inject(CartService);

  protected readonly items = computed(() => this.cartService.items());
  protected readonly itemCount = computed(() => this.cartService.itemCount());
  protected readonly total = computed(() => this.cartService.total());

  protected updateQuantity(pizzaId: string, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.cartService.removeItem(pizzaId);
    } else {
      this.cartService.updateQuantity(pizzaId, newQuantity);
    }
  }
}
