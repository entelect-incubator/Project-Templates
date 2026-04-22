import { useState } from 'react';
import { API_ENDPOINTS } from '@/config/environment';
import { Pizza } from '@/types/pizza';
import styles from './PizzaCard.module.scss';

interface PizzaCardProps {
  pizza: Pizza;
  onAddToCart: (pizza: Pizza, quantity: number) => void;
  isLoading?: boolean;
}

/**
 * Pizza Card Component
 * Displays individual pizza with image, description, price, and add to cart
 */
export function PizzaCard({ pizza, onAddToCart, isLoading = false }: PizzaCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(pizza, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  const imageUrl = pizza.imageUrl || API_ENDPOINTS.pizzaImage(pizza.id);

  return (
    <div className={styles['card']}>
      {/* Image Container */}
      <div className={styles['imageContainer']}>
        <img src={imageUrl} alt={pizza.name} className={styles['image']} loading="lazy" />
        {pizza.isSpecial && <span className={styles['badge']}>Special</span>}
      </div>

      {/* Content */}
      <div className={styles['content']}>
        <h3 className={styles['name']}>{pizza.name}</h3>
        <p className={styles['description']}>{pizza.description || 'Delicious pizza'}</p>

        <div className={styles['price']}>ZA {(pizza.price ?? 0).toFixed(2)}</div>

        {/* Footer with quantity and add button */}
        <div className={styles['footer']}>
          <div className={styles['quantity']}>
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min="1"
              max="99"
              aria-label="Pizza quantity"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= 99}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            className={styles['addButton']}
            onClick={handleAddToCart}
            disabled={isLoading}
            aria-label={`Add ${quantity} ${pizza.name} to cart`}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
