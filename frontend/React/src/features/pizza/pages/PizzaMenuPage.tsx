/**
 * Pizza Menu Page
 * Display pizzas from API and allow adding to cart
 * Features theme-based card layout and floating cart integration
 */

import { Suspense, useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { API_ENDPOINTS } from '@/config/environment';
import { PizzaCard } from '@/components/PizzaCard/PizzaCard';
import { Pizza, ApiResponse } from '@/types/pizza';
import './PizzaMenuPage.scss';

/**
 * Pizza Grid Layout Component
 */
function PizzaGridLayout({
  pizzas,
  onAddToCart,
  isLoading,
}: {
  pizzas: Pizza[];
  onAddToCart: (pizza: Pizza, quantity: number) => void;
  isLoading: boolean;
}) {
  return (
    <div className="pizza-grid">
      {pizzas.map((pizza) => (
        <PizzaCard key={pizza.id} pizza={pizza} onAddToCart={onAddToCart} isLoading={isLoading} />
      ))}
    </div>
  );
}

/**
 * Pizza Menu Content Component
 */
function PizzaMenuContent() {
  const { addToCart } = useCart();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(API_ENDPOINTS.pizzas, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}), // Empty query to get all pizzas
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch pizzas: ${response.status}`);
        }

        const data: ApiResponse<Pizza[]> = await response.json();

        if (data.hasError) {
          throw new Error(data.message || 'Failed to load pizzas');
        }

        setPizzas(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching pizzas:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const handleAddToCart = (pizza: Pizza, quantity: number) => {
    addToCart(pizza, quantity);
  };

  if (error) {
    return (
      <div className="pizza-menu-error">
        <p>⚠️ {error}</p>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Make sure the API server is running on https://localhost:7160
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pizza-menu-loading">
        <div className="spinner">🍕</div>
        <p>Loading pizzas...</p>
      </div>
    );
  }

  if (pizzas.length === 0) {
    return (
      <div className="pizza-menu-empty">
        <p>No pizzas available</p>
      </div>
    );
  }

  return <PizzaGridLayout pizzas={pizzas} onAddToCart={handleAddToCart} isLoading={isLoading} />;
}

/**
 * Main Pizza Menu Page with Suspense boundaries
 */
export default function PizzaMenuPage() {
  return (
    <Suspense
      fallback={
        <div className="pizza-menu-loading">
          <div className="spinner">🍕</div>
          <p>Loading menu...</p>
        </div>
      }
    >
      <PizzaMenuContent />
    </Suspense>
  );
}
