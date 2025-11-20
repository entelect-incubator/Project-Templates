/**
 * Pizza Domain Types
 * Core pizza-related type definitions
 */

/**
 * Pizza Menu Item
 * Represents a pizza available for ordering
 */
export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  toppings: string[];
  vegetarian?: boolean;
  spicy?: boolean;
  bestseller?: boolean;
}

/**
 * Pizza Category for menu organization
 */
export interface PizzaCategory {
  id: string;
  name: string;
  description?: string;
  pizzas: Pizza[];
}

/**
 * Pizza Filter Options
 */
export interface PizzaFilters {
  vegetarian?: boolean;
  spicy?: boolean;
  bestseller?: boolean;
  priceRange?: {
    min: number;
    max: number;
  };
}

/**
 * Pizza Search/Sort Options
 */
export interface PizzaSortOptions {
  field: 'name' | 'price' | 'popularity';
  direction: 'asc' | 'desc';
}
