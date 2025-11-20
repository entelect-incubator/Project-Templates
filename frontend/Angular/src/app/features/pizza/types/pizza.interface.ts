/**
 * Pizza Domain Types
 * Interface definitions for pizza-related entities
 */

export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  category: PizzaCategory;
  ingredients: Ingredient[];
  imageUrl: string;
  available: boolean;
  preparationTime: number;
  size: PizzaSize;
  nutritionalInfo?: NutritionalInfo;
}

export interface Ingredient {
  id: string;
  name: string;
  allergens?: string[];
  vegetarian: boolean;
  vegan: boolean;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sodium: number;
}

export interface PizzaFilter {
  category?: PizzaCategory;
  maxPrice?: number;
  vegetarian?: boolean;
  vegan?: boolean;
  available?: boolean;
  search?: string;
}

export interface PizzaSearchRequest {
  filters?: PizzaFilter;
  sortBy?: PizzaSortOption;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PizzaSearchResponse {
  pizzas: Pizza[];
  totalCount: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
}

// Enums as const assertions for better type safety
export const PIZZA_CATEGORIES = [
  'margherita',
  'pepperoni',
  'vegetarian',
  'vegan',
  'specialty',
  'custom',
] as const;
export type PizzaCategory = (typeof PIZZA_CATEGORIES)[number];

export const PIZZA_SIZES = ['small', 'medium', 'large', 'extra-large'] as const;
export type PizzaSize = (typeof PIZZA_SIZES)[number];

export const PIZZA_SORT_OPTIONS = ['name', 'price', 'popularity', 'preparation-time'] as const;
export type PizzaSortOption = (typeof PIZZA_SORT_OPTIONS)[number];

// State management interfaces
export interface PizzaState {
  pizzas: Pizza[];
  loading: boolean;
  error: string | null;
  filter: PizzaFilter;
  selectedPizza: Pizza | null;
  totalCount: number;
  currentPage: number;
}
