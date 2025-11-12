/**
 * Pizza Menu Loading Component
 * Fallback UI shown while loading pizzas with Suspense
 */

import { Button, Spinner } from '@/components';

export function PizzaMenuLoading() {
  return (
    <div className='pizza-menu-page'>
      <header className='pizza-header'>
        <div className='pizza-header__content'>
          <h1 className='pizza-header__title'>🍕 Pezza Pizzeria</h1>
          <p className='pizza-header__subtitle'>Fresh, delicious pizzas made to order</p>
        </div>
        <div className='pizza-header__actions'>
          <Button variant='secondary' className='pizza-cart-btn' disabled>
            🛒 Cart (0)
          </Button>
        </div>
      </header>
      <div className='loading-state'>
        <Spinner size='lg' />
        <p>Loading delicious pizzas...</p>
      </div>
    </div>
  );
}
