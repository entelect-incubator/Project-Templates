/**
 * Cart Service
 * Service for cart management using Angular signals
 */

import { Injectable, inject, signal, computed } from '@angular/core';
import { CartItem, Cart, CartState } from '../types';
import { Pizza } from '../../pizza/types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Reactive state using Angular signals
  private readonly _state = signal<CartState>({
    items: [],
    loading: false,
    error: null,
  });

  // Public read-only computed state
  readonly state = this._state.asReadonly();
  readonly items = computed(() => this._state().items);
  readonly loading = computed(() => this._state().loading);
  readonly error = computed(() => this._state().error);

  // Computed cart totals
  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  readonly tax = computed(() => this.subtotal() * 0.08); // 8% tax
  readonly deliveryFee = computed(() => (this.subtotal() > 50 ? 0 : 5.99));
  readonly total = computed(() => this.subtotal() + this.tax() + this.deliveryFee());

  readonly itemCount = computed(() => this.items().reduce((sum, item) => sum + item.quantity, 0));

  readonly isEmpty = computed(() => this.items().length === 0);

  readonly cart = computed(
    (): Cart => ({
      items: this.items(),
      subtotal: this.subtotal(),
      tax: this.tax(),
      deliveryFee: this.deliveryFee(),
      total: this.total(),
      itemCount: this.itemCount(),
    })
  );

  /**
   * Add pizza to cart
   */
  addToCart(pizza: Pizza, quantity: number = 1): void {
    this._state.update((state) => {
      const existingItemIndex = state.items.findIndex((item) => item.pizzaId === pizza.id);

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };

        return {
          ...state,
          items: updatedItems,
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          pizzaId: pizza.id,
          pizzaName: pizza.name,
          price: pizza.price,
          quantity,
        };

        return {
          ...state,
          items: [...state.items, newItem],
        };
      }
    });

    this.saveToLocalStorage();
  }

  /**
   * Update item quantity
   */
  updateQuantity(pizzaId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(pizzaId);
      return;
    }

    this._state.update((state) => {
      const updatedItems = state.items.map((item) =>
        item.pizzaId === pizzaId ? { ...item, quantity } : item
      );

      return {
        ...state,
        items: updatedItems,
      };
    });

    this.saveToLocalStorage();
  }

  /**
   * Remove item from cart
   */
  removeItem(pizzaId: string): void {
    this._state.update((state) => ({
      ...state,
      items: state.items.filter((item) => item.pizzaId !== pizzaId),
    }));

    this.saveToLocalStorage();
  }

  /**
   * Clear entire cart
   */
  clearCart(): void {
    this._state.update((state) => ({
      ...state,
      items: [],
    }));

    this.saveToLocalStorage();
  }

  /**
   * Get item by pizza ID
   */
  getItem(pizzaId: string): CartItem | undefined {
    return this.items().find((item) => item.pizzaId === pizzaId);
  }

  /**
   * Check if pizza is in cart
   */
  isInCart(pizzaId: string): boolean {
    return this.items().some((item) => item.pizzaId === pizzaId);
  }

  /**
   * Load cart from localStorage
   */
  loadFromLocalStorage(): void {
    try {
      const saved = localStorage.getItem('pizza-cart');
      if (saved) {
        const items = JSON.parse(saved) as CartItem[];
        this._state.update((state) => ({
          ...state,
          items,
        }));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      this.setError('Failed to load saved cart');
    }
  }

  /**
   * Save cart to localStorage
   */
  private saveToLocalStorage(): void {
    try {
      localStorage.setItem('pizza-cart', JSON.stringify(this.items()));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
      this.setError('Failed to save cart');
    }
  }

  // Private helper methods
  private setError(error: string): void {
    this._state.update((state) => ({ ...state, error }));
  }

  private clearError(): void {
    this._state.update((state) => ({ ...state, error: null }));
  }
}
