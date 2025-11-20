/**
 * Pizza Service
 * Service for pizza-related API operations and state management using Angular signals
 */

import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, finalize, of } from 'rxjs';
import {
  Pizza,
  PizzaSearchRequest,
  PizzaSearchResponse,
  PizzaFilter,
  PizzaState,
  PIZZA_CATEGORIES,
  PIZZA_SIZES,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  private readonly http = inject(HttpClient);

  // API Base URL - should come from environment
  private readonly apiUrl = '/api/v1';

  // Reactive state using Angular signals
  private readonly _state = signal<PizzaState>({
    pizzas: [],
    loading: false,
    error: null,
    filter: {},
    selectedPizza: null,
    totalCount: 0,
    currentPage: 1,
  });

  // Public read-only computed state
  readonly state = this._state.asReadonly();
  readonly pizzas = computed(() => this._state().pizzas);
  readonly loading = computed(() => this._state().loading);
  readonly error = computed(() => this._state().error);
  readonly selectedPizza = computed(() => this._state().selectedPizza);
  readonly totalCount = computed(() => this._state().totalCount);
  readonly currentPage = computed(() => this._state().currentPage);

  // Computed derived state
  readonly availablePizzas = computed(() => this.pizzas().filter((pizza) => pizza.available));

  readonly filteredPizzas = computed(() => {
    const filter = this._state().filter;
    let filtered = this.pizzas();

    if (filter.category) {
      filtered = filtered.filter((p) => p.category === filter.category);
    }
    if (filter.maxPrice) {
      filtered = filtered.filter((p) => p.price <= filter.maxPrice!);
    }
    if (filter.vegetarian) {
      filtered = filtered.filter((p) => p.ingredients.every((ingredient) => ingredient.vegetarian));
    }
    if (filter.vegan) {
      filtered = filtered.filter((p) => p.ingredients.every((ingredient) => ingredient.vegan));
    }
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.ingredients.some((ingredient) => ingredient.name.toLowerCase().includes(searchLower))
      );
    }
    if (filter.available !== undefined) {
      filtered = filtered.filter((p) => p.available === filter.available);
    }

    return filtered;
  });

  /**
   * Load pizzas with optional search criteria
   */
  loadPizzas(searchRequest: PizzaSearchRequest = {}): Observable<PizzaSearchResponse> {
    this.setLoading(true);
    this.clearError();

    let params = new HttpParams();

    if (searchRequest.filters?.category) {
      params = params.set('category', searchRequest.filters.category);
    }
    if (searchRequest.filters?.maxPrice) {
      params = params.set('maxPrice', searchRequest.filters.maxPrice.toString());
    }
    if (searchRequest.filters?.vegetarian) {
      params = params.set('vegetarian', 'true');
    }
    if (searchRequest.filters?.vegan) {
      params = params.set('vegan', 'true');
    }
    if (searchRequest.filters?.available !== undefined) {
      params = params.set('available', searchRequest.filters.available.toString());
    }
    if (searchRequest.filters?.search) {
      params = params.set('search', searchRequest.filters.search);
    }
    if (searchRequest.sortBy) {
      params = params.set('sortBy', searchRequest.sortBy);
    }
    if (searchRequest.sortOrder) {
      params = params.set('sortOrder', searchRequest.sortOrder);
    }
    if (searchRequest.page) {
      params = params.set('page', searchRequest.page.toString());
    }
    if (searchRequest.limit) {
      params = params.set('limit', searchRequest.limit.toString());
    }

    return this.http.post<PizzaSearchResponse>(`${this.apiUrl}/search`, {}, { params }).pipe(
      tap((response) => {
        this._state.update((state) => ({
          ...state,
          pizzas: response.pizzas,
          totalCount: response.totalCount,
          currentPage: response.page,
          filter: searchRequest.filters || {},
        }));
      }),
      catchError((error) => {
        this.setError('Failed to load pizzas. Please try again.');
        console.error('Pizza loading error:', error);
        return of({
          pizzas: [],
          totalCount: 0,
          page: 1,
          limit: 10,
          hasNextPage: false,
        });
      }),
      finalize(() => this.setLoading(false))
    );
  }

  /**
   * Get specific pizza by ID
   */
  getPizzaById(id: string): Observable<Pizza | null> {
    this.setLoading(true);
    this.clearError();

    return this.http.get<Pizza>(`${this.apiUrl}/pizzas/${id}`).pipe(
      tap((pizza) => {
        this._state.update((state) => ({
          ...state,
          selectedPizza: pizza,
        }));
      }),
      catchError((error) => {
        this.setError('Pizza not found.');
        console.error('Pizza fetch error:', error);
        return of(null);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  /**
   * Set active filter
   */
  setFilter(filter: PizzaFilter): void {
    this._state.update((state) => ({
      ...state,
      filter: { ...state.filter, ...filter },
    }));
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this._state.update((state) => ({
      ...state,
      filter: {},
    }));
  }

  /**
   * Select a pizza
   */
  selectPizza(pizza: Pizza | null): void {
    this._state.update((state) => ({
      ...state,
      selectedPizza: pizza,
    }));
  }

  // Private helper methods
  private setLoading(loading: boolean): void {
    this._state.update((state) => ({ ...state, loading }));
  }

  private setError(error: string): void {
    this._state.update((state) => ({ ...state, error }));
  }

  private clearError(): void {
    this._state.update((state) => ({ ...state, error: null }));
  }

  // Mock data helper - remove when backend is ready
  getMockPizzas(): Pizza[] {
    return [
      {
        id: '1',
        name: 'Margherita Classic',
        description: 'Fresh tomato sauce, mozzarella, fresh basil',
        price: 18.99,
        category: 'margherita',
        ingredients: [
          { id: '1', name: 'Tomato Sauce', vegetarian: true, vegan: true },
          { id: '2', name: 'Mozzarella', vegetarian: true, vegan: false },
          { id: '3', name: 'Fresh Basil', vegetarian: true, vegan: true },
        ],
        imageUrl: '/images/margherita-classic.jpg',
        available: true,
        preparationTime: 12,
        size: 'medium',
      },
      {
        id: '2',
        name: 'Pepperoni Supreme',
        description: 'Pepperoni, mozzarella, marinara sauce',
        price: 22.99,
        category: 'pepperoni',
        ingredients: [
          { id: '1', name: 'Marinara Sauce', vegetarian: true, vegan: true },
          { id: '2', name: 'Mozzarella', vegetarian: true, vegan: false },
          { id: '4', name: 'Pepperoni', vegetarian: false, vegan: false },
        ],
        imageUrl: '/images/pepperoni-supreme.jpg',
        available: true,
        preparationTime: 15,
        size: 'large',
      },
    ];
  }
}
