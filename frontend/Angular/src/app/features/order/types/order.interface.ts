/**
 * Order Domain Types
 * Order, cart, and customer-related type definitions
 */

export interface CartItem {
  pizzaId: string;
  pizzaName: string;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: DeliveryAddress;
  paymentMethod: PaymentMethod;
  specialInstructions?: string;
}

export interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  apartmentUnit?: string;
  deliveryInstructions?: string;
}

export interface PaymentMethod {
  type: PaymentType;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  nameOnCard?: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  status: OrderStatus;
  timestamps: OrderTimestamps;
  totals: OrderTotals;
  trackingNumber: string;
  estimatedDeliveryTime: Date;
  specialInstructions?: string;
}

export interface OrderTimestamps {
  placed: Date;
  confirmed?: Date;
  preparing?: Date;
  ready?: Date;
  outForDelivery?: Date;
  delivered?: Date;
  cancelled?: Date;
}

export interface OrderTotals {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount?: number;
  total: number;
}

// Enums as const assertions for better type safety
export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'out-for-delivery',
  'delivered',
  'cancelled',
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const PAYMENT_TYPES = ['credit-card', 'debit-card', 'paypal', 'cash-on-delivery'] as const;
export type PaymentType = (typeof PAYMENT_TYPES)[number];

// State management interfaces
export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export interface OrderState {
  currentOrder: Order | null;
  orderHistory: Order[];
  loading: boolean;
  error: string | null;
}
