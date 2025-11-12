/**
 * Shopping Cart Sidebar Component
 * Reusable sidebar showing cart contents and checkout form
 */

import { Button, Card } from '@/components';
import type { CartItem } from '@/features/pizzas/types';
import { OrderForm } from './OrderForm';
import { ShoppingCartItem } from './ShoppingCartItem';

interface ShoppingCartSidebarProps {
  items: CartItem[];
  total: number;
  onUpdateQuantity: (pizzaId: string, quantity: number) => void;
  onRemoveItem: (pizzaId: string) => void;
  onClose: () => void;
  onCheckoutSuccess?: () => void;
}

export function ShoppingCartSidebar({
  items,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onClose,
  onCheckoutSuccess,
}: ShoppingCartSidebarProps) {
  return (
    <aside className='pizza-sidebar'>
      <Card className='pizza-cart-card'>
        <div className='pizza-cart__header'>
          <h3 className='pizza-cart__title'>Shopping Cart</h3>
          <Button variant='secondary' onClick={onClose} size='sm'>
            ✕
          </Button>
        </div>

        {items.length === 0 ? (
          <p className='pizza-cart__empty'>Your cart is empty</p>
        ) : (
          <>
            <div className='pizza-cart__items'>
              {items.map((item) => (
                <ShoppingCartItem
                  key={item.pizzaId}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                />
              ))}
            </div>

            <div className='pizza-cart__divider' />

            <div className='pizza-cart__summary'>
              <div className='pizza-cart__total'>
                <span>Subtotal:</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>

            <div className='pizza-cart__checkout'>
              <OrderForm onSuccess={onCheckoutSuccess ?? (() => {})} />
            </div>
          </>
        )}
      </Card>
    </aside>
  );
}
