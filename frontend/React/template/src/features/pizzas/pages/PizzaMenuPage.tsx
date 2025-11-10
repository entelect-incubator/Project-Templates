/**
 * Pizza Menu Page
 * Display pizzas and allow adding to cart
 */

import { useState } from 'react';
import { usePizzas } from '../hooks/usePizzas';
import { Alert, Button, Card, Badge, Spinner } from '@/components';
import { OrderForm } from '../components/OrderForm';
import { cartActions, cartItems, cartTotal } from '@/stores/cart';
import type { Pizza } from '../types';
import './PizzaMenuPage.scss';

export default function PizzaMenuPage() {
  const { data: pizzas, isLoading, error } = usePizzas();
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

  if (error) {
    return (
      <div className="pizza-menu-page">
        <Alert variant="error">
          <h2>Failed to load pizzas</h2>
          <p>{error instanceof Error ? error.message : 'An error occurred'}</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="pizza-menu-page">
      {/* Header with Cart Button */}
      <header className="pizza-header">
        <div className="pizza-header__content">
          <h1 className="pizza-header__title">🍕 Pezza Pizzeria</h1>
          <p className="pizza-header__subtitle">Fresh, delicious pizzas made to order</p>
        </div>
        <div className="pizza-header__actions">
          <Button
            variant="secondary"
            onClick={() => setShowCart(!showCart)}
            className="pizza-cart-btn"
          >
            🛒 Cart ({cartItems.value.length})
          </Button>
        </div>
      </header>

      <div className="pizza-container">
        {/* Pizza Grid */}
        <section className="pizza-grid-section">
          <h2 className="section-title">Our Pizzas</h2>

          {isLoading ? (
            <div className="loading-state">
              <Spinner size="lg" />
              <p>Loading delicious pizzas...</p>
            </div>
          ) : (
            <div className="pizza-grid">
              {pizzas?.map((pizza) => (
                <Card key={pizza.id} className="pizza-card">
                  <div
                    className="pizza-card__image"
                    style={{ backgroundImage: `url(${pizza.image})` }}
                  />
                  <div className="pizza-card__content">
                    <div className="pizza-card__header">
                      <h3 className="pizza-card__name">{pizza.name}</h3>
                      {pizza.bestseller && (
                        <Badge variant="primary" size="sm">
                          ⭐ Bestseller
                        </Badge>
                      )}
                    </div>
                    <p className="pizza-card__description">{pizza.description}</p>

                    {pizza.toppings.length > 0 && (
                      <div className="pizza-card__toppings">
                        {pizza.toppings.slice(0, 3).map((topping) => (
                          <Badge key={topping} variant="default" size="sm">
                            {topping}
                          </Badge>
                        ))}
                        {pizza.toppings.length > 3 && (
                          <Badge variant="default" size="sm">
                            +{pizza.toppings.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="pizza-card__footer">
                      <div className="pizza-card__price">${pizza.price.toFixed(2)}</div>
                      <Button
                        variant="primary"
                        onClick={() => addToCart(pizza)}
                        className="pizza-card__action"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Shopping Cart Sidebar */}
        {showCart && (
          <aside className="pizza-sidebar">
            <Card className="pizza-cart-card">
              <div className="pizza-cart__header">
                <h3 className="pizza-cart__title">Shopping Cart</h3>
                <Button variant="secondary" onClick={() => setShowCart(false)} size="sm">
                  ✕
                </Button>
              </div>

              {cartItems.value.length === 0 ? (
                <p className="pizza-cart__empty">Your cart is empty</p>
              ) : (
                <>
                  <div className="pizza-cart__items">
                    {cartItems.value.map((item) => (
                      <div key={item.pizzaId} className="pizza-cart-item">
                        <div className="pizza-cart-item__info">
                          <p className="pizza-cart-item__name">{item.pizza.name}</p>
                          <p className="pizza-cart-item__price">${item.pizza.price.toFixed(2)}</p>
                        </div>
                        <div className="pizza-cart-item__controls">
                          <Button
                            variant="secondary"
                            onClick={() => updateQuantity(item.pizzaId, item.quantity - 1)}
                            size="sm"
                          >
                            −
                          </Button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.pizzaId, parseInt(e.target.value) || 1)
                            }
                            className="pizza-cart-item__qty"
                          />
                          <Button
                            variant="secondary"
                            onClick={() => updateQuantity(item.pizzaId, item.quantity + 1)}
                            size="sm"
                          >
                            +
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => removeFromCart(item.pizzaId)}
                            size="sm"
                          >
                            🗑
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pizza-cart__divider" />

                  <div className="pizza-cart__summary">
                    <div className="pizza-cart__total">
                      <span>Subtotal:</span>
                      <strong>${cartTotal.value.toFixed(2)}</strong>
                    </div>
                  </div>

                  {/* Replace the old checkout form with the new OrderForm */}
                  <div className="pizza-cart__checkout">
                    <OrderForm onSuccess={() => setShowCart(false)} />
                  </div>
                </>
              )}
            </Card>
          </aside>
        )}
      </div>
    </div>
  );
}
