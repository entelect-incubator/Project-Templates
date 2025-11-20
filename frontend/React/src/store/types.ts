/**
 * Shared Type Definitions
 *
 * All types used across stores are defined here to avoid circular dependencies
 * and provide a single source of truth for type definitions.
 */

// ============================================================================
// Cart Types
// ============================================================================

export interface CartItem {
  pizzaId: string;
  pizzaName: string;
  price: number;
  quantity: number;
}

// ============================================================================
// Customer Types
// ============================================================================

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

// ============================================================================
// Order Types
// ============================================================================

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';

export interface Order {
  id: number;
  status: OrderStatus;
  createdAt: string;
  customeName?: string;
}

export interface OrderCookieData {
  id: number;
  customeName: string;
  createdAt: string;
}
