/**
 * Pizza Grid Component
 * Reusable grid of pizza cards with add to cart functionality
 */

import { Badge, Card } from '@/components';
import type { Pizza } from '../types';
import { PizzaCardFooter } from './PizzaCardFooter';

interface PizzaGridProps {
  pizzas: Pizza[];
  onAddToCart: (pizza: Pizza) => void;
}

export function PizzaGrid({ pizzas, onAddToCart }: PizzaGridProps) {
  return (
    <section className='pizza-grid-section'>
      <h2 className='section-title'>Our Pizzas</h2>
      <div className='pizza-grid'>
        {pizzas?.map((pizza) => (
          <Card key={pizza.id} className='pizza-card'>
            <div className='pizza-card__image' style={{ backgroundImage: `url(${pizza.image})` }} />
            <div className='pizza-card__content'>
              <div className='pizza-card__header'>
                <h3 className='pizza-card__name'>{pizza.name}</h3>
                {pizza.bestseller && (
                  <Badge variant='primary' size='sm'>
                    ⭐ Bestseller
                  </Badge>
                )}
              </div>
              <p className='pizza-card__description'>{pizza.description}</p>

              {pizza.toppings.length > 0 && (
                <div className='pizza-card__toppings'>
                  {pizza.toppings.slice(0, 3).map((topping) => (
                    <Badge key={topping} variant='default' size='sm'>
                      {topping}
                    </Badge>
                  ))}
                  {pizza.toppings.length > 3 && (
                    <Badge variant='default' size='sm'>
                      +{pizza.toppings.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              <PizzaCardFooter pizza={pizza} onAddToCart={onAddToCart} />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
