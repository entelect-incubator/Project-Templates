/**
 * Pizza Menu Page Component
 * Main page for browsing and selecting pizzas
 */

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PizzaService } from '../../services/pizza.service';
import { CartService } from '../../../order/services/cart.service';
import { PizzaGridComponent } from '../../components/pizza-grid/pizza-grid.component';
import { Pizza, PizzaFilter, PIZZA_CATEGORIES, PIZZA_SORT_OPTIONS } from '../../types';

@Component({
  selector: 'app-pizza-menu-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,

    MatCheckboxModule,
    MatBadgeModule,
    MatSidenavModule,
    PizzaGridComponent,
  ],
  template: `
    <div class="pizza-menu-page">
      <header class="page-header">
        <mat-toolbar color="primary">
          <span class="page-title">Pizza Menu</span>
          <span class="spacer"></span>

          <!-- Cart Badge -->
          <button
            mat-icon-button
            (click)="openCart()"
            [matBadge]="cartService.itemCount()"
            [matBadgeHidden]="cartService.isEmpty()"
            matBadgeColor="accent"
          >
            <mat-icon>shopping_cart</mat-icon>
          </button>

          <!-- Filter Toggle -->
          <button mat-icon-button (click)="toggleFilters()" [class.active]="showFilters()">
            <mat-icon>filter_list</mat-icon>
          </button>
        </mat-toolbar>
      </header>

      <div class="page-content">
        <mat-sidenav-container class="sidenav-container">
          <!-- Filters Sidebar -->
          <mat-sidenav
            #filterSidenav
            mode="side"
            [opened]="showFilters()"
            position="start"
            class="filters-sidenav"
          >
            <div class="filters-panel">
              <h3 class="filters-title">
                <mat-icon>tune</mat-icon>
                Filters
              </h3>

              <!-- Search -->
              <div class="filter-group">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Search pizzas</mat-label>
                  <input
                    matInput
                    [formControl]="searchControl"
                    placeholder="Name, ingredients..."
                  />
                  <mat-icon matPrefix>search</mat-icon>
                </mat-form-field>
              </div>

              <!-- Category Filter -->
              <div class="filter-group">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Category</mat-label>
                  <mat-select
                    [value]="currentFilter().category || ''"
                    (selectionChange)="onCategoryChange($event.value)"
                  >
                    <mat-option value="">All Categories</mat-option>
                    @for (category of pizzaCategories; track category) {
                    <mat-option [value]="category">
                      {{ category | titlecase }}
                    </mat-option>
                    }
                  </mat-select>
                </mat-form-field>
              </div>

              <!-- Price Range -->
              <div class="filter-group">
                <label class="filter-label"
                  >Max Price: $<span>{{ maxPrice() }}</span></label
                >
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  [value]="maxPrice()"
                  (input)="onMaxPriceChange(+$any($event.target).value)"
                  class="full-width price-slider"
                />
              </div>

              <!-- Dietary Preferences -->
              <div class="filter-group">
                <h4 class="filter-subtitle">Dietary Preferences</h4>
                <mat-checkbox
                  [checked]="currentFilter().vegetarian || false"
                  (change)="onVegetarianChange($event.checked)"
                >
                  Vegetarian
                </mat-checkbox>
                <mat-checkbox
                  [checked]="currentFilter().vegan || false"
                  (change)="onVeganChange($event.checked)"
                >
                  Vegan
                </mat-checkbox>
              </div>

              <!-- Availability -->
              <div class="filter-group">
                <mat-checkbox
                  [checked]="currentFilter().available !== false"
                  (change)="onAvailabilityChange($event.checked)"
                >
                  Available only
                </mat-checkbox>
              </div>

              <!-- Filter Actions -->
              <div class="filter-actions">
                <button mat-button color="primary" (click)="clearAllFilters()">Clear All</button>
                <button mat-raised-button color="primary" (click)="applyFilters()">
                  Apply Filters
                </button>
              </div>
            </div>
          </mat-sidenav>

          <!-- Main Content -->
          <mat-sidenav-content class="main-content">
            <!-- Results Header -->
            <div class="results-header">
              <div class="results-info">
                @if (!pizzaService.loading()) {
                <span class="results-count"> {{ pizzaService.totalCount() }} pizzas found </span>
                }
              </div>

              <!-- Sort Options -->
              <div class="sort-controls">
                <mat-form-field appearance="outline" class="sort-field">
                  <mat-label>Sort by</mat-label>
                  <mat-select
                    [value]="currentSort()"
                    (selectionChange)="onSortChange($event.value)"
                  >
                    @for (option of sortOptions; track option.value) {
                    <mat-option [value]="option.value">
                      {{ option.label }}
                    </mat-option>
                    }
                  </mat-select>
                </mat-form-field>
              </div>
            </div>

            <!-- Error State -->
            @if (pizzaService.error()) {
            <div class="error-state">
              <mat-icon color="warn">error</mat-icon>
              <p>{{ pizzaService.error() }}</p>
              <button mat-raised-button color="primary" (click)="retry()">Try Again</button>
            </div>
            }

            <!-- Pizza Grid -->
            <app-pizza-grid
              [pizzas]="pizzaService.filteredPizzas()"
              [loading]="pizzaService.loading()"
              [showLoadMore]="hasMorePizzas()"
              [showResetButton]="hasActiveFilters()"
              (selectPizza)="onPizzaSelect($event)"
              (loadMore)="loadMorePizzas()"
              (resetFilters)="clearAllFilters()"
            />
          </mat-sidenav-content>
        </mat-sidenav-container>
      </div>
    </div>
  `,
  styleUrl: './pizza-menu-page.component.scss',
})
export class PizzaMenuPageComponent implements OnInit {
  protected readonly pizzaService = inject(PizzaService);
  protected readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  // Component state
  protected readonly showFilters = signal(false);
  protected readonly maxPrice = signal(50);
  protected readonly currentSort = signal<string>('name');

  // Form controls
  protected readonly searchControl = new FormControl('');

  // Constants
  protected readonly pizzaCategories = PIZZA_CATEGORIES;
  protected readonly sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price', label: 'Price (Low to High)' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'preparation-time', label: 'Prep Time' },
  ];

  // Computed properties
  protected readonly currentFilter = () => this.pizzaService.state().filter;
  protected readonly hasActiveFilters = () => {
    const filter = this.currentFilter();
    return !!(
      filter.category ||
      filter.maxPrice ||
      filter.vegetarian ||
      filter.vegan ||
      filter.search
    );
  };
  protected readonly hasMorePizzas = () => {
    return this.pizzaService.currentPage() * 20 < this.pizzaService.totalCount();
  };

  constructor() {
    // Set up search debouncing
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((searchTerm) => {
        this.pizzaService.setFilter({ search: searchTerm || undefined });
        this.loadPizzas();
      });
  }

  ngOnInit(): void {
    // Load cart from localStorage
    this.cartService.loadFromLocalStorage();

    // Load initial pizzas
    this.loadPizzas();
  }

  toggleFilters(): void {
    this.showFilters.update((show) => !show);
  }

  openCart(): void {
    this.router.navigate(['/cart']);
  }

  onCategoryChange(category: string): void {
    this.pizzaService.setFilter({ category: (category as any) || undefined });
    this.loadPizzas();
  }

  onMaxPriceChange(price: number | null): void {
    if (price !== null) {
      this.maxPrice.set(price);
      this.pizzaService.setFilter({ maxPrice: price });
      this.loadPizzas();
    }
  }

  onVegetarianChange(vegetarian: boolean): void {
    this.pizzaService.setFilter({ vegetarian: vegetarian || undefined });
    this.loadPizzas();
  }

  onVeganChange(vegan: boolean): void {
    this.pizzaService.setFilter({ vegan: vegan || undefined });
    this.loadPizzas();
  }

  onAvailabilityChange(available: boolean): void {
    this.pizzaService.setFilter({ available: available || undefined });
    this.loadPizzas();
  }

  onSortChange(sortBy: string): void {
    this.currentSort.set(sortBy);
    this.loadPizzas();
  }

  clearAllFilters(): void {
    this.searchControl.setValue('', { emitEvent: false });
    this.maxPrice.set(50);
    this.currentSort.set('name');
    this.pizzaService.clearFilters();
    this.loadPizzas();
  }

  applyFilters(): void {
    this.loadPizzas();
    this.showFilters.set(false);
  }

  onPizzaSelect(pizza: Pizza): void {
    this.pizzaService.selectPizza(pizza);
    this.router.navigate(['/pizza', pizza.id]);
  }

  loadMorePizzas(): void {
    // Implement pagination logic here
    const currentPage = this.pizzaService.currentPage();
    this.loadPizzas(currentPage + 1, true);
  }

  retry(): void {
    this.loadPizzas();
  }

  private loadPizzas(page: number = 1, append: boolean = false): void {
    const filter = this.currentFilter();
    const sortBy = this.currentSort();

    this.pizzaService
      .loadPizzas({
        filters: filter,
        sortBy: sortBy as any,
        sortOrder: 'asc',
        page,
        limit: 20,
      })
      .subscribe();
  }
}
