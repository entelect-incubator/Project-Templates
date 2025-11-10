/**
 * Cart Store using Preact Signals
 * Global state management for shopping cart and orders
 */

import { signal, computed } from '@preact/signals-react';
import type { Pizza, CartItem, CustomerInfo } from '@/features/pizzas/types';

// Cart state
export const cartItems = signal<CartItem[]>([]);
export const customerInfo = signal<CustomerInfo>({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zipCode: '',
});

// Computed values
export const cartTotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.subtotal, 0)
);

export const cartItemCount = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
);

export const isCartEmpty = computed(() => cartItems.value.length === 0);

// Cart actions
export const cartActions = {
  addItem: (pizza: Pizza, quantity: number = 1) => {
    const existingItemIndex = cartItems.value.findIndex((item) => item.pizzaId === pizza.id);

    if (existingItemIndex >= 0) {
      // Update existing item
      const updatedItems = [...cartItems.value];
      const existingItem = updatedItems[existingItemIndex];
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + quantity,
        subtotal: (existingItem.quantity + quantity) * pizza.price,
      };
      cartItems.value = updatedItems;
    } else {
      // Add new item
      const newItem: CartItem = {
        pizzaId: pizza.id,
        pizza,
        quantity,
        subtotal: quantity * pizza.price,
      };
      cartItems.value = [...cartItems.value, newItem];
    }
  },

  removeItem: (pizzaId: string) => {
    cartItems.value = cartItems.value.filter((item) => item.pizzaId !== pizzaId);
  },

  updateQuantity: (pizzaId: string, quantity: number) => {
    if (quantity <= 0) {
      cartActions.removeItem(pizzaId);
      return;
    }

    const updatedItems = cartItems.value.map((item) => {
      if (item.pizzaId === pizzaId) {
        return {
          ...item,
          quantity,
          subtotal: quantity * item.pizza.price,
        };
      }
      return item;
    });
    cartItems.value = updatedItems;
  },

  clearCart: () => {
    cartItems.value = [];
  },

  updateCustomerInfo: (info: Partial<CustomerInfo>) => {
    customerInfo.value = { ...customerInfo.value, ...info };
  },

  resetCustomerInfo: () => {
    customerInfo.value = {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
    };
  },
};
