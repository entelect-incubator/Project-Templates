/**
 * Pizza Types
 * Data models for pizza ordering application
 */

export interface Pizza {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isSpecial?: boolean;
  category?: string;
  toppings?: string[];
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  pizza: Pizza;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryTime?: string;
  deliveredAt?: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'credit_card' | 'debit_card' | 'cash' | 'mobile_payment';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  defaultAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PizzaSearchQuery {
  name?: string;
  category?: string;
  maxPrice?: number;
  isAvailable?: boolean;
  orderBy?: string;
  sortDirection?: 'asc' | 'desc';
  skip?: number;
  take?: number;
}

export interface ApiResponse<T> {
  data: T;
  hasError: boolean;
  errorResult?: number;
  message?: string;
  errors?: string[] | Record<string, string[]>;
}
