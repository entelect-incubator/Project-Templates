/**
 * OrderSummaryItem Component
 * Displays a single order item row with name, quantity, and price
 */

import styles from './OrderSummary.module.scss';

/**
 * Typed CSS class names - ensures autocomplete and type safety
 */
type OrderSummaryItemStyles = {
  item: string;
  name: string;
  quantity: string;
  price: string;
};

interface OrderSummaryItemProps {
  name: string;
  quantity: number;
  price: number;
}

/**
 * OrderSummaryItem
 * Renders a single order item row with product name, quantity, and subtotal price
 */
export function OrderSummaryItem({ name, quantity, price }: OrderSummaryItemProps) {
  const typedStyles = styles as OrderSummaryItemStyles;

  return (
    <div className={typedStyles.item}>
      <span className={typedStyles.name}>{name}</span>
      <span className={typedStyles.quantity}>×{quantity}</span>
      <span className={typedStyles.price}>${price.toFixed(2)}</span>
    </div>
  );
}
