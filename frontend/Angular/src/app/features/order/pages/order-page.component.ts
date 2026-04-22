import { Component, computed, inject, signal, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartService } from '../services/cart.service';
import { CartItem } from '../types';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './order-page.component.html',
})
export class OrderPageComponent {
  private readonly cartService = inject(CartService);

  // Cart signals
  readonly cart = computed(() => this.cartService.cart());
  readonly cartItems = computed(() => this.cartService.items());
  readonly isEmpty = computed(() => this.cartService.isEmpty());
  readonly subtotal = computed(() => this.cartService.subtotal());
  readonly total = computed(() => this.cartService.total());

  // Signal-based form fields (Angular 21)
  readonly customerName = signal('');
  readonly customerEmail = signal('');
  readonly customerPhone = signal('');
  readonly deliveryAddress = signal('');

  // Form validation
  readonly isFormValid = computed(() => {
    return (
      this.customerName().trim().length > 0 &&
      this.customerEmail().includes('@') &&
      this.customerPhone().trim().length > 0 &&
      this.deliveryAddress().trim().length > 0
    );
  });

  // Submission state
  readonly isSubmitting = signal(false);

  updateQuantity(itemId: string, newQuantity: number): void {
    if (newQuantity > 0) {
      this.cartService.updateQuantity(itemId, newQuantity);
    }
  }

  removeItem(itemId: string): void {
    this.cartService.removeItem(itemId);
  }

  async placeOrder(): Promise<void> {
    if (this.isSubmitting() || !this.isFormValid()) {
      return;
    }

    this.isSubmitting.set(true);

    try {
      // TODO: Implement API call when OrderService is available
      console.log('Order placed:', {
        customerName: this.customerName(),
        customerEmail: this.customerEmail(),
        customerPhone: this.customerPhone(),
        deliveryAddress: this.deliveryAddress(),
        items: this.cartItems(),
        subtotal: this.subtotal(),
        total: this.total(),
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert('Order placed successfully!');
      this.cartService.clearCart();

      // Reset form signals
      this.customerName.set('');
      this.customerEmail.set('');
      this.customerPhone.set('');
      this.deliveryAddress.set('');
    } catch (error) {
      alert('Failed to place order. Please try again.');
      console.error('Order error:', error);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
