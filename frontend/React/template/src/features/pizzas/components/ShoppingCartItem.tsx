/**
 * Shopping Cart Item Component
 * Reusable cart item with quantity controls and remove button
 */

import { Button } from '@/components';
import type { CartItem } from '@/features/pizzas/types';

interface ShoppingCartItemProps {
  item: CartItem;
  onUpdateQuantity: (pizzaId: string, quantity: number) => void;
  onRemove: (pizzaId: string) => void;
}

export function ShoppingCartItem({ item, onUpdateQuantity, onRemove }: ShoppingCartItemProps) {
  return (
    <div className='pizza-cart-item'>
      <div className='pizza-cart-item__info'>
        <p className='pizza-cart-item__name'>{item.pizza.name}</p>
        <p className='pizza-cart-item__price'>${item.pizza.price.toFixed(2)}</p>
      </div>
      <div className='pizza-cart-item__controls'>
        <Button
          variant='secondary'
          onClick={() => onUpdateQuantity(item.pizzaId, item.quantity - 1)}
          size='sm'
        >
          −
        </Button>
        <input
          type='number'
          min='1'
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.pizzaId, parseInt(e.target.value, 10) || 1)}
          className='pizza-cart-item__qty'
        />
        <Button
          variant='secondary'
          onClick={() => onUpdateQuantity(item.pizzaId, item.quantity + 1)}
          size='sm'
        >
          +
        </Button>
        <Button variant='danger' onClick={() => onRemove(item.pizzaId)} size='sm'>
          🗑
        </Button>
      </div>
    </div>
  );
}
