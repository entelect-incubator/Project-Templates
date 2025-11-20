/**
 * Cart Store - Manages shopping cart state
 *
 * Responsibility: Handle cart items and calculations (total, item count, etc.)
 * Should NOT: Manage orders, customer info, or loading states
 *
 * This store is focused solely on cart operations, making it:
 * - Easy to test
 * - Simple to understand
 * - Reusable in other contexts
 */

import { computed, signal } from '@preact/signals-react';
import type { CartItem } from './types';

// ============================================================================
// Signals - Cart State
// ============================================================================

/**
 * Array of items currently in the shopping cart
 */
export const cartItems = signal<CartItem[]>([]);

// ============================================================================
// Computed Values
// ============================================================================

/**
 * Total price of all items in cart (price × quantity for each item)
 * Automatically updates when cartItems changes
 */
export const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

/**
 * Total number of items in cart (sum of all quantities)
 * Used for cart badge display
 */
export const cartItemCount = computed(() => {
  return cartItems.value.reduce((count, item) => count + item.quantity, 0);
});

/**
 * Whether the cart is empty
 * Useful for conditional rendering
 */
export const isCartEmpty = computed(() => {
  return cartItems.value.length === 0;
});

// ============================================================================
// Cart Operations
// ============================================================================

/**
 * Add a pizza to cart or increase quantity if already exists
 *
 * @param item The cart item to add (with pizzaId, name, price, quantity)
 *
 * @example
 * addToCart({
 *   pizzaId: 'margherita-1',
 *   pizzaName: 'Margherita',
 *   price: 10.99,
 *   quantity: 1
 * });
 */
export const addToCart = (item: CartItem): void => {
  const existing = cartItems.value.find((cartItem) => cartItem.pizzaId === item.pizzaId);

  if (existing) {
    // Pizza already in cart - increase quantity
    cartItems.value = cartItems.value.map((cartItem) =>
      cartItem.pizzaId === item.pizzaId
        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
        : cartItem
    );
  } else {
    // New pizza - add to cart
    cartItems.value = [...cartItems.value, item];
  }
};

/**
 * Remove an item completely from cart
 *
 * @param pizzaId The ID of the pizza to remove
 *
 * @example
 * removeFromCart('margherita-1');
 */
export const removeFromCart = (pizzaId: string): void => {
  cartItems.value = cartItems.value.filter((item) => item.pizzaId !== pizzaId);
};

/**
 * Update the quantity of an item in cart
 *
 * If quantity becomes 0 or negative, item is removed automatically
 *
 * @param pizzaId The ID of the pizza to update
 * @param quantity The new quantity
 *
 * @example
 * updateCartItemQuantity('margherita-1', 3);
 * updateCartItemQuantity('margherita-1', 0); // Removes item
 */
export const updateCartItemQuantity = (pizzaId: string, quantity: number): void => {
  if (quantity <= 0) {
    removeFromCart(pizzaId);
  } else {
    cartItems.value = cartItems.value.map((item) =>
      item.pizzaId === pizzaId ? { ...item, quantity } : item
    );
  }
};

/**
 * Remove all items from cart
 *
 * Use this after successful order submission
 *
 * @example
 * clearCart();
 */
export const clearCart = (): void => {
  cartItems.value = [];
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get a specific item from cart
 *
 * @param pizzaId The ID of the pizza to find
 * @returns The cart item or undefined if not found
 *
 * @example
 * const item = getCartItem('margherita-1');
 */
export const getCartItem = (pizzaId: string): CartItem | undefined => {
  return cartItems.value.find((item) => item.pizzaId === pizzaId);
};

/**
 * Check if a specific pizza is in the cart
 *
 * @param pizzaId The ID of the pizza to check
 * @returns true if pizza is in cart, false otherwise
 *
 * @example
 * if (isInCart('margherita-1')) {
 *   // Show "In Cart" badge
 * }
 */
export const isInCart = (pizzaId: string): boolean => {
  return cartItems.value.some((item) => item.pizzaId === pizzaId);
};
