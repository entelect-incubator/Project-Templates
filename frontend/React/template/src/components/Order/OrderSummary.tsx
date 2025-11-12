/**
 * OrderSummary Component
 * Displays order items with pricing breakdown
 * Uses typed CSS Modules for better DX and type safety
 * Orchestrates sub-components for better separation of concerns
 */

import type { CartItem } from '@/features/pizzas/types';
import styles from './OrderSummary.module.scss';
import { OrderSummaryItem } from './OrderSummaryItem';
import { OrderSummaryTotal } from './OrderSummaryTotal';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

/**
 * Typed CSS class names - ensures autocomplete and type safety
 */
type OrderSummaryStyles = {
  summary: string;
  title: string;
  items: string;
};

// Type assertion for CSS Modules
const typedStyles = styles as OrderSummaryStyles;

/**
 * OrderSummary
 * Main orchestrator component that renders order items and total
 * Delegates rendering of individual items and total to specialized sub-components
 */
export function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <div className={typedStyles.summary}>
      <h3 className={typedStyles.title}>Order Summary</h3>
      <div className={typedStyles.items}>
        {items.map((item) => (
          <OrderSummaryItem
            key={item.pizzaId}
            name={item.pizza.name}
            quantity={item.quantity}
            price={item.subtotal}
          />
        ))}
      </div>
      <OrderSummaryTotal total={total} />
    </div>
  );
}
