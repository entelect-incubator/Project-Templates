/**
 * Pizza feature domain types
 * Shared across UI layers that still reference @/features/pizzas
 */

import type { Pizza as SharedPizza } from '@/types/pizza';

export type Pizza = SharedPizza;

export interface CartItem {
  pizzaId: string;
  pizza: Pizza;
  quantity: number;
  subtotal: number;
  addedAt: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface CreateOrderCommand {
  items: Array<{
    pizzaId: string;
    quantity: number;
  }>;
  customer: CustomerInfo;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  customer: CustomerInfo;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
}
