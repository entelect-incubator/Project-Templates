/**
 * Cart Context
 * Manages shopping cart state across the application
 * Provides add, remove, update quantity, and clear cart operations
 */

import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { Cart, CartItem, Pizza } from '@/types/pizza';

interface CartContextType {
  cart: Cart;
  addToCart: (pizza: Pizza, quantity: number) => void;
  removeFromCart: (pizzaId: string) => void;
  updateQuantity: (pizzaId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const TAX_RATE = 0.15; // 15% tax

/**
 * Calculate cart totals
 */
function calculateTotals(items: CartItem[]): { subtotal: number; tax: number; total: number } {
  const subtotal = items.reduce((sum, item) => sum + (item.pizza.price ?? 0) * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return { subtotal, tax, total };
}

/**
 * Cart Provider Component
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const { subtotal, tax, total } = calculateTotals(items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const cart: Cart = {
    items,
    subtotal,
    tax,
    total,
    itemCount,
  };

  const addToCart = useCallback((pizza: Pizza, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.pizza.id === pizza.id);

      if (existingItem) {
        // Update quantity if pizza already in cart
        return prevItems.map((item) =>
          item.pizza.id === pizza.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      // Add new item to cart
      return [
        ...prevItems,
        {
          pizza,
          quantity,
          addedAt: new Date().toISOString(),
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((pizzaId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.pizza.id !== pizzaId));
  }, []);

  const updateQuantity = useCallback(
    (pizzaId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(pizzaId);
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) => (item.pizza.id === pizzaId ? { ...item, quantity } : item))
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotalItems = useCallback(() => itemCount, [itemCount]);

  const getTotalPrice = useCallback(() => total, [total]);

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Hook to use Cart Context
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
