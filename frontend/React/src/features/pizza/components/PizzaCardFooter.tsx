/**
 * Pizza Card Footer Component
 * Reusable footer for pizza cards with price and add to cart button
 */

import { Button } from '@/components';
import type { Pizza } from '../types';

interface PizzaCardFooterProps {
  pizza: Pizza;
  onAddToCart: (pizza: Pizza) => void;
}

export function PizzaCardFooter({ pizza, onAddToCart }: PizzaCardFooterProps) {
  return (
    <div className='pizza-card__footer'>
      <div className='pizza-card__price'>${pizza.price.toFixed(2)}</div>
      <Button variant='primary' onClick={() => onAddToCart(pizza)} className='pizza-card__action'>
        Add to Cart
      </Button>
    </div>
  );
}
