/**
 * Order Summary Component
 * Displays order items and pricing calculations
 */

import type { CartItem } from '../../../store/cartStore';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
}

const TAX_RATE = 0.1; // 10% tax

export function OrderSummary({ items, subtotal }: OrderSummaryProps) {
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className='order-summary'>
      <h2>Order Summary</h2>
      <div className='order-items'>
        {items.map((item: CartItem) => (
          <div key={item.pizzaId} className='order-item'>
            <div className='item-info'>
              <h3>{item.pizzaName}</h3>
              <p className='item-quantity'>Quantity: {item.quantity}</p>
            </div>
            <div className='item-price'>
              <span className='price'>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className='order-total'>
        <div className='total-row'>
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className='total-row'>
          <span>Tax ({(TAX_RATE * 100).toFixed(0)}%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className='total-row total-final'>
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
