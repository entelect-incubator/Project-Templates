/**
 * Store Index - Central export point for all stores
 *
 * Import stores and types from here for convenience
 *
 * @example
 * // ✅ Good - single import
 * import { cartItems, addToCart } from '@/store';
 *
 * // ❌ Avoid - scattered imports
 * import { cartItems } from '@/store/cartStore';
 * import { customerInfo } from '@/store/customerStore';
 * import { currentOrder } from '@/store/orderStore';
 */

// ============================================================================
// Cart Store Exports
// ============================================================================

export {
  // Signals
  cartItems,
  cartTotal,
  cartItemCount,
  isCartEmpty,
  // Operations
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  // Utilities
  getCartItem,
  isInCart,
} from './cartStore';

// ============================================================================
// Customer Store Exports
// ============================================================================

export {
  // Signals
  customerInfo,
  // Operations
  setCustomerInfo,
  clearCustomerInfo,
  getCustomerName,
  getCustomerEmail,
  getCustomerPhone,
  isCustomerInfoComplete,
  updateCustomerField,
} from './customerStore';

// ============================================================================
// Order Store Exports
// ============================================================================

export {
  // Signals
  currentOrder,
  isOrderLoading,
  orderError,
  // Computed
  isOrderCompleted,
  isOrderPreparing,
  isOrderReady,
  orderStatusText,
  // Operations
  setCurrentOrder,
  clearCurrentOrder,
  updateOrderStatus,
  getCurrentOrderId,
  isCurrentOrder,
  // Error Handling
  setOrderError,
  clearOrderError,
  hasOrderError,
  // Loading State
  setOrderLoading,
  // Cookie Operations
  saveOrderToCookie,
  loadOrderFromCookie,
  clearOrderFromCookie,
} from './orderStore';

// ============================================================================
// Type Exports
// ============================================================================

export type { CartItem, CustomerInfo, Order, OrderStatus, OrderCookieData } from './types';

// ============================================================================
// Store Reset (for testing or logout)
// ============================================================================

import { clearCart } from './cartStore';
import { clearCustomerInfo } from './customerStore';
import { clearCurrentOrder, clearOrderError, setOrderLoading } from './orderStore';

/**
 * Reset all stores to initial state
 *
 * Use after successful order, logout, or in tests
 *
 * @example
 * // After order successful
 * resetAllStores();
 *
 * // After logout
 * resetAllStores();
 */
export const resetAllStores = (): void => {
  clearCart();
  clearCustomerInfo();
  clearCurrentOrder();
  clearOrderError();
  setOrderLoading(false);
};
