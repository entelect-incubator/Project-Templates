/**
 * Order Review Step Component
 * Step 1: Review order before proceeding
 */

import type { CartItem } from '../../../store/cartStore';
import { CheckoutActions } from './CheckoutActions';
import { OrderSummary } from './OrderSummaryCard';

interface OrderReviewStepProps {
  items: CartItem[];
  onBack: () => void;
  onContinue: () => void;
}

export function OrderReviewStep({ items, onBack, onContinue }: OrderReviewStepProps) {
  const subtotal = items.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );

  return (
    <div className='checkout-page__content'>
      <OrderSummary items={items} subtotal={subtotal} />
      <CheckoutActions
        onBack={onBack}
        onContinue={onContinue}
        backLabel='Back to Cart'
        continueLabel='Continue to Customer Info'
      />
    </div>
  );
}
