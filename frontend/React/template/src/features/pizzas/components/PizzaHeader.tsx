/**
 * Pizza Header Component
 * Reusable header with title, subtitle, and cart button
 */

import { Button } from '@/components';

interface PizzaHeaderProps {
  cartItemCount: number;
  onCartToggle: () => void;
}

export function PizzaHeader({ cartItemCount, onCartToggle }: PizzaHeaderProps) {
  return (
    <header className='pizza-header'>
      <div className='pizza-header__content'>
        <h1 className='pizza-header__title'>🍕 Pezza Pizzeria</h1>
        <p className='pizza-header__subtitle'>Fresh, delicious pizzas made to order</p>
      </div>
      <div className='pizza-header__actions'>
        <Button variant='secondary' onClick={onCartToggle} className='pizza-cart-btn'>
          🛒 Cart ({cartItemCount})
        </Button>
      </div>
    </header>
  );
}
