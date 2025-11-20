/**
 * Order Domain Types
 * Order, cart, and customer-related type definitions
 */

import type { CartItem as StoreCartItem } from '@/store/types';

/**
 * Shopping Cart Item (Re-export from store for consistency)
 */
export type CartItem = StoreCartItem;

/**
 * Shopping Cart
 * Complete cart state and totals
 */
export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
}

/**
 * Customer Information
 * Customer details for order processing
 */
export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

/**
 * Order Status Types
 */
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled';

/**
 * Pizza Order
 * Complete order information
 */
export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  customer: CustomerInfo;
  status: OrderStatus;
  createdAt: Date;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  notes?: string;
}

/**
 * Create Order Command
 * Data required to create a new order
 */
export interface CreateOrderCommand {
  items: Array<{
    pizzaId: string;
    quantity: number;
  }>;
  customer: CustomerInfo;
}

/**
 * Order Timeline Event
 * Represents status changes in order history
 */
export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: Date;
  description: string;
  location?: string;
}

/**
 * Checkout Step Types
 */
export type CheckoutStep = 'review' | 'customer-info' | 'confirmation';

/**
 * Order Mode Types
 */
export type OrderMode = 'pickup' | 'delivery';
