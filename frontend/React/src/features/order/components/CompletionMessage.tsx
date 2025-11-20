/**
 * Completion Message Component
 * Displays a celebration message when order is completed
 */

import { isOrderCompleted } from '../utils/orderStatus';

interface CompletionMessageProps {
  status?: string;
  className?: string;
}

export function CompletionMessage({ status, className = '' }: CompletionMessageProps) {
  if (!isOrderCompleted(status)) {
    return null;
  }

  return (
    <div className={`order-completion-message ${className}`}>
      <p>🎉 Your order has been completed!</p>
      <p>Thank you for your order. Enjoy your pizza!</p>
    </div>
  );
}
