/**
 * Pizza Domain Types
 * Type definitions for pizzas, cart items, and orders
 */

/**
 * Pizza Menu Item
 */
export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  toppings: string[];
  vegetarian?: boolean;
  spicy?: boolean;
  bestseller?: boolean;
}

/**
 * Shopping Cart Item
 */
export interface CartItem {
  pizzaId: string;
  pizza: Pizza;
  quantity: number;
  subtotal: number;
}

/**
 * Shopping Cart
 */
export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

/**
 * Customer Info
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
 * Pizza Order
 */
export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  customer: CustomerInfo;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: Date;
  estimatedDelivery?: Date;
}

/**
 * Create Order Command
 */
export interface CreateOrderCommand {
  items: Array<{
    pizzaId: string;
    quantity: number;
  }>;
  customer: CustomerInfo;
}
