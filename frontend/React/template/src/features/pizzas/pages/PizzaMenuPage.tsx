/**
 * Pizza Menu Page
 * Display pizzas and allow adding to cart with React 19.2 SSR support
 */

import { Suspense, useState } from 'react';
import { usePizzas } from '@/api/hooks';
import { cartActions, cartItems, cartTotal } from '@/stores/cart';
import { PizzaGrid } from '../components/PizzaGrid';
import { PizzaHeader } from '../components/PizzaHeader';
import { PizzaMenuLoading } from '../components/PizzaMenuLoading';
import { ShoppingCartSidebar } from '../components/ShoppingCartSidebar';
import type { Pizza } from '../types';
import './PizzaMenuPage.scss';

/**
 * Pizza Menu Content Component (wrapped with Suspense)
 */
function PizzaMenuContent() {
  const { data: pizzas } = usePizzas(); // Now uses useSuspenseQuery internally
  const [showCart, setShowCart] = useState(false);

  const addToCart = (pizza: Pizza) => {
    cartActions.addItem(pizza);
  };

  const removeFromCart = (pizzaId: string) => {
    cartActions.removeItem(pizzaId);
  };

  const updateQuantity = (pizzaId: string, quantity: number) => {
    cartActions.updateQuantity(pizzaId, quantity);
  };

  return (
    <div className='pizza-menu-page'>
      <PizzaHeader
        cartItemCount={cartItems.value.length}
        onCartToggle={() => setShowCart(!showCart)}
      />

      <div className='pizza-container'>
        <PizzaGrid pizzas={pizzas || []} onAddToCart={addToCart} />

        {showCart && (
          <ShoppingCartSidebar
            items={cartItems.value}
            total={cartTotal.value}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onClose={() => setShowCart(false)}
            onCheckoutSuccess={() => setShowCart(false)}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Main Pizza Menu Page with React 19.2 Suspense boundaries
 */
export default function PizzaMenuPage() {
  return (
    <Suspense fallback={<PizzaMenuLoading />}>
      <PizzaMenuContent />
    </Suspense>
  );
}
