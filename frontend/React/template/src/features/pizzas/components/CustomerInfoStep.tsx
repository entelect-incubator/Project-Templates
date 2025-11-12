/**
 * Customer Info Step Component
 * Step 2: Collect customer information
 */

import type { CartItem } from '../../../store/cartStore';
import { CheckoutActions } from './CheckoutActions';

interface CustomerInfoStepProps {
  items: CartItem[];
  onBack: () => void;
}

const TAX_RATE = 0.1; // 10% tax

export function CustomerInfoStep({ items, onBack }: CustomerInfoStepProps) {
  const subtotal = items.reduce(
    (total: number, item: CartItem) => total + item.price * item.quantity,
    0
  );
  const total = subtotal * (1 + TAX_RATE);

  return (
    <div className='checkout-page__content'>
      <div className='order-summary-sidebar'>
        <h3>Order Summary</h3>
        <div className='summary-items'>
          {items.map((item: CartItem) => (
            <div key={item.pizzaId} className='summary-item'>
              <span>
                {item.pizzaName} x{item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className='summary-total'>
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>
      </div>

      <CheckoutActions onBack={onBack} backLabel='Back to Review' showContinue={false} />
    </div>
  );
}
