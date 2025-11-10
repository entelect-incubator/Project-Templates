/**
 * Global Cart & Order State Management using Preact Signals
 *
 * This store manages:
 * - Shopping cart items
 * - Customer information
 * - Current order status
 * - Order tracking
 */

import { signal, computed } from '@preact/signals-react';

// ============================================================================
// Type Definitions
// ============================================================================

export interface CartItem {
  pizzaId: string;
  pizzaName: string;
  price: number;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  id: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';
  createdAt: string;
  customeName?: string;
}

// ============================================================================
// Signals - Global State
// ============================================================================

export const cartItems = signal<CartItem[]>([]);
export const customerInfo = signal<CustomerInfo | null>(null);
export const currentOrder = signal<Order | null>(null);
export const isOrderLoading = signal(false);
export const orderError = signal<string | null>(null);

// ============================================================================
// Computed Values
// ============================================================================

export const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

export const cartItemCount = computed(() => {
  return cartItems.value.reduce((count, item) => count + item.quantity, 0);
});

export const isCartEmpty = computed(() => {
  return cartItems.value.length === 0;
});

export const isOrderCompleted = computed(() => {
  return currentOrder.value?.status === 'completed';
});

// ============================================================================
// Cart Operations
// ============================================================================

/**
 * Add a pizza to cart or update quantity if already exists
 */
export const addToCart = (item: CartItem): void => {
  const existing = cartItems.value.find((cartItem) => cartItem.pizzaId === item.pizzaId);

  if (existing) {
    // Update quantity
    cartItems.value = cartItems.value.map((cartItem) =>
      cartItem.pizzaId === item.pizzaId
        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
        : cartItem
    );
  } else {
    // Add new item
    cartItems.value = [...cartItems.value, item];
  }
};

/**
 * Remove item from cart
 */
export const removeFromCart = (pizzaId: string): void => {
  cartItems.value = cartItems.value.filter((item) => item.pizzaId !== pizzaId);
};

/**
 * Update item quantity
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
 * Clear entire cart
 */
export const clearCart = (): void => {
  cartItems.value = [];
};

// ============================================================================
// Customer Info Operations
// ============================================================================

/**
 * Set customer information
 */
export const setCustomerInfo = (info: CustomerInfo): void => {
  customerInfo.value = info;
};

/**
 * Clear customer information
 */
export const clearCustomerInfo = (): void => {
  customerInfo.value = null;
};

// ============================================================================
// Order Operations
// ============================================================================

/**
 * Set current order and save to cookie
 */
export const setCurrentOrder = (order: Order): void => {
  currentOrder.value = order;
  saveOrderToCookie(order);
};

/**
 * Clear current order
 */
export const clearCurrentOrder = (): void => {
  currentOrder.value = null;
};

/**
 * Update order status (for polling)
 */
export const updateOrderStatus = (status: string): void => {
  if (currentOrder.value) {
    currentOrder.value = {
      ...currentOrder.value,
      status: status as Order['status'],
    };
  }
};

// ============================================================================
// Error Handling
// ============================================================================

/**
 * Set error message
 */
export const setOrderError = (error: string | null): void => {
  orderError.value = error;
};

/**
 * Clear error message
 */
export const clearOrderError = (): void => {
  orderError.value = null;
};

/**
 * Set loading state
 */
export const setOrderLoading = (loading: boolean): void => {
  isOrderLoading.value = loading;
};

// ============================================================================
// Cookie Operations
// ============================================================================

const ORDER_COOKIE_NAME = 'pezza_last_order';
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

/**
 * Save order to cookie for recovery on page reload
 */
export const saveOrderToCookie = (order: Order): void => {
  try {
    const cookieValue = JSON.stringify({
      id: order.id,
      customeName: customerInfo.value?.name,
      createdAt: order.createdAt,
    });

    const encodedValue = encodeURIComponent(cookieValue);
    document.cookie = `${ORDER_COOKIE_NAME}=${encodedValue}; max-age=${COOKIE_MAX_AGE}; path=/`;
  } catch (error) {
    console.error('Failed to save order to cookie:', error);
  }
};

/**
 * Load order from cookie
 */
export const loadOrderFromCookie = (): {
  id: number;
  customeName: string;
  createdAt: string;
} | null => {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${ORDER_COOKIE_NAME}=([^;]*)`));
    if (match && match[1]) {
      return JSON.parse(decodeURIComponent(match[1]));
    }
  } catch (error) {
    console.error('Failed to load order from cookie:', error);
  }
  return null;
};

/**
 * Clear order from cookie
 */
export const clearOrderFromCookie = (): void => {
  document.cookie = `${ORDER_COOKIE_NAME}=; max-age=0; path=/`;
};

// ============================================================================
// Reset All State
// ============================================================================

/**
 * Reset all store state (use after successful order)
 */
export const resetOrderStore = (): void => {
  clearCart();
  clearCustomerInfo();
  clearOrderError();
  setOrderLoading(false);
  // Keep currentOrder for tracking view
};
