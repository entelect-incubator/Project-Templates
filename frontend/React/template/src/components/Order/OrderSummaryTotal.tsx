/**
 * OrderSummaryTotal Component
 * Displays the total price row
 */

import styles from './OrderSummary.module.scss';

/**
 * Typed CSS class names - ensures autocomplete and type safety
 */
type OrderSummaryTotalStyles = {
  total: string;
  totalLabel: string;
  totalAmount: string;
};

interface OrderSummaryTotalProps {
  total: number;
}

/**
 * OrderSummaryTotal
 * Renders the total price row with formatted currency display
 */
export function OrderSummaryTotal({ total }: OrderSummaryTotalProps) {
  const typedStyles = styles as OrderSummaryTotalStyles;

  return (
    <div className={typedStyles.total}>
      <span className={typedStyles.totalLabel}>Total:</span>
      <span className={typedStyles.totalAmount}>${total.toFixed(2)}</span>
    </div>
  );
}
