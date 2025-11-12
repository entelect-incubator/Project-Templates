/**
 * Empty Cart Component
 * Displayed when cart is empty
 */

import { Button } from '@/components';

interface EmptyCartProps {
  onBrowse: () => void;
}

export function EmptyCart({ onBrowse }: EmptyCartProps) {
  return (
    <div className='checkout-page'>
      <div className='checkout-page__empty'>
        <h1>Your cart is empty</h1>
        <p>Add some delicious pizzas to your cart before checking out!</p>
        <Button variant='primary' onClick={onBrowse}>
          Browse Pizzas
        </Button>
      </div>
    </div>
  );
}
