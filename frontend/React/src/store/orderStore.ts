/**
 * Order Store - Manages order status and tracking state
 *
 * Responsibility: Handle order creation, status updates, loading, and errors
 * Should NOT: Manage cart items or customer information
 *
 * This store is focused solely on order operations, making it:
 * - Independent from cart logic
 * - Easy to test order workflows
 * - Reusable for order history features
 */

import { computed, signal } from '@preact/signals-react';
import type { Order, OrderCookieData, OrderStatus } from './types';

// ============================================================================
// Signals - Order State
// ============================================================================

/**
 * Currently active order
 * Null when no order exists, set after user places an order
 */
export const currentOrder = signal<Order | null>(null);

/**
 * Whether an order request is being processed
 * Set to true during API call, false when complete
 */
export const isOrderLoading = signal(false);

/**
 * Error message if order creation fails
 * Null when no error, set when API call fails
 */
export const orderError = signal<string | null>(null);

// ============================================================================
// Computed Values
// ============================================================================

/**
 * Whether current order is completed
 *
 * @returns true if order status is 'completed', false otherwise
 */
export const isOrderCompleted = computed(() => {
  return currentOrder.value?.status === 'completed';
});

/**
 * Whether current order is being prepared
 *
 * @returns true if order is in 'preparing' state, false otherwise
 */
export const isOrderPreparing = computed(() => {
  return currentOrder.value?.status === 'preparing';
});

/**
 * Whether current order is ready for pickup
 *
 * @returns true if order is 'ready', false otherwise
 */
export const isOrderReady = computed(() => {
  return currentOrder.value?.status === 'ready';
});

/**
 * Display-friendly order status text
 *
 * @returns Human-readable status or empty string if no order
 */
export const orderStatusText = computed(() => {
  if (!currentOrder.value) return '';

  const statusMap: Record<OrderStatus, string> = {
    pending: 'Order Pending',
    confirmed: 'Order Confirmed',
    preparing: 'Preparing Your Order',
    ready: 'Ready for Pickup',
    completed: 'Order Completed',
  };

  return statusMap[currentOrder.value.status] || 'Unknown Status';
});

// ============================================================================
// Order Operations
// ============================================================================

/**
 * Set current order and save to cookie
 *
 * Called after successful order creation
 *
 * @param order The new order from API response
 *
 * @example
 * setCurrentOrder({
 *   id: 12345,
 *   status: 'confirmed',
 *   createdAt: '2024-01-15T10:30:00Z',
 *   customeName: 'John Doe'
 * });
 */
export const setCurrentOrder = (order: Order): void => {
  currentOrder.value = order;
  saveOrderToCookie(order);
};

/**
 * Clear current order
 *
 * Used when starting new order or logging out
 *
 * @example
 * clearCurrentOrder();
 */
export const clearCurrentOrder = (): void => {
  currentOrder.value = null;
};

/**
 * Update order status (for polling/webhook updates)
 *
 * Preserves other order properties, only updates status
 *
 * @param status The new order status
 *
 * @example
 * updateOrderStatus('preparing');
 * updateOrderStatus('ready');
 */
export const updateOrderStatus = (status: string): void => {
  if (currentOrder.value) {
    currentOrder.value = {
      ...currentOrder.value,
      status: status as OrderStatus,
    };
  }
};

/**
 * Get current order ID
 *
 * @returns Order ID or null if no active order
 *
 * @example
 * const orderId = getCurrentOrderId(); // 12345
 */
export const getCurrentOrderId = (): number | null => {
  return currentOrder.value?.id ?? null;
};

/**
 * Check if a specific order ID matches current order
 *
 * @param orderId The ID to check
 * @returns true if matches current order, false otherwise
 *
 * @example
 * if (isCurrentOrder(12345)) {
 *   // Show tracking info for this order
 * }
 */
export const isCurrentOrder = (orderId: number): boolean => {
  return currentOrder.value?.id === orderId;
};

// ============================================================================
// Error Handling
// ============================================================================

/**
 * Set error message
 *
 * Called when order creation or status update fails
 *
 * @param error Error message or null to clear error
 *
 * @example
 * setOrderError('Failed to create order. Please try again.');
 */
export const setOrderError = (error: string | null): void => {
  orderError.value = error;
};

/**
 * Clear error message
 *
 * Call after user acknowledges error
 *
 * @example
 * clearOrderError();
 */
export const clearOrderError = (): void => {
  orderError.value = null;
};

/**
 * Check if there's an active error
 *
 * @returns true if error exists, false otherwise
 *
 * @example
 * if (hasOrderError()) {
 *   // Show error alert
 * }
 */
export const hasOrderError = (): boolean => {
  return orderError.value !== null;
};

// ============================================================================
// Loading State
// ============================================================================

/**
 * Set loading state during order operations
 *
 * Set to true before API call, false when complete
 *
 * @param loading Whether order operation is in progress
 *
 * @example
 * setOrderLoading(true);
 * const order = await createOrder();
 * setOrderLoading(false);
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
 *
 * Stores minimal order info to retrieve full order from API
 *
 * @param order The order to save
 * @param customerName The customer name to include
 *
 * @internal Called by setCurrentOrder automatically
 */
export const saveOrderToCookie = (order: Order, customerName?: string): void => {
  try {
    const cookieValue = JSON.stringify({
      id: order.id,
      customeName: customerName || order.customeName || '',
      createdAt: order.createdAt,
    } satisfies OrderCookieData);

    const encodedValue = encodeURIComponent(cookieValue);
    document.cookie = `${ORDER_COOKIE_NAME}=${encodedValue}; max-age=${COOKIE_MAX_AGE}; path=/`;
  } catch (error) {
    console.error('Failed to save order to cookie:', error);
  }
};

/**
 * Load order from cookie
 *
 * Used on app startup to recover previous order
 *
 * @returns Order data from cookie or null if not found
 *
 * @example
 * const orderFromCookie = loadOrderFromCookie();
 * if (orderFromCookie) {
 *   // Fetch full order details from API
 * }
 */
export const loadOrderFromCookie = (): OrderCookieData | null => {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${ORDER_COOKIE_NAME}=([^;]*)`));
    if (match?.[1]) {
      return JSON.parse(decodeURIComponent(match[1]));
    }
  } catch (error) {
    console.error('Failed to load order from cookie:', error);
  }
  return null;
};

/**
 * Clear order from cookie
 *
 * Call after order is completed
 *
 * @example
 * clearOrderFromCookie();
 */
export const clearOrderFromCookie = (): void => {
  document.cookie = `${ORDER_COOKIE_NAME}=; max-age=0; path=/`;
};
