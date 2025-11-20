/**
 * Pizza Grid Component
 * Grid layout for displaying multiple pizzas with loading states
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PizzaCardComponent } from '../pizza-card/pizza-card.component';
import { Pizza } from '../../types';

@Component({
  selector: 'app-pizza-grid',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule, PizzaCardComponent],
  template: `
    <section class="pizza-grid" [attr.data-count]="pizzas.length">
      @if (loading) {
      <div class="pizza-grid__loading">
        <div class="loading-state">
          <mat-spinner diameter="40"></mat-spinner>
          <p>Loading delicious pizzas...</p>
        </div>

        <!-- Skeleton loading cards -->
        <div class="skeleton-grid">
          @for (i of loadingArray; track i) {
          <div class="pizza-card-skeleton">
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
              <div class="skeleton-title"></div>
              <div class="skeleton-description"></div>
              <div class="skeleton-ingredients">
                <div class="skeleton-tag"></div>
                <div class="skeleton-tag"></div>
                <div class="skeleton-tag"></div>
              </div>
              <div class="skeleton-footer">
                <div class="skeleton-price"></div>
                <div class="skeleton-button"></div>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
      } @else if (pizzas.length === 0) {
      <div class="pizza-grid__empty">
        <div class="empty-state">
          <div class="empty-state__icon">🍕</div>
          <h3 class="empty-state__title">No Pizzas Found</h3>
          <p class="empty-state__message">
            {{ emptyMessage || 'Try adjusting your search filters or check back later.' }}
          </p>
          @if (showResetButton) {
          <button mat-raised-button color="primary" (click)="onResetFilters()">
            Reset Filters
          </button>
          }
        </div>
      </div>
      } @else {
      <div class="pizza-grid__container">
        @for (pizza of pizzas; track pizza.id) {
        <app-pizza-card [pizza]="pizza" (selectPizza)="onSelectPizza($event)" />
        }
      </div>
      } @if (showLoadMore && !loading) {
      <div class="pizza-grid__load-more">
        <button mat-stroked-button color="primary" (click)="onLoadMore()" [disabled]="loadingMore">
          @if (loadingMore) {
          <mat-spinner diameter="20"></mat-spinner>
          Loading... } @else { Load More Pizzas }
        </button>
      </div>
      }
    </section>
  `,
  styleUrl: './pizza-grid.component.scss',
})
export class PizzaGridComponent {
  @Input({ required: true }) pizzas: Pizza[] = [];
  @Input() loading = false;
  @Input() loadingMore = false;
  @Input() showLoadMore = false;
  @Input() showResetButton = false;
  @Input() emptyMessage?: string;

  @Output() selectPizza = new EventEmitter<Pizza>();
  @Output() loadMore = new EventEmitter<void>();
  @Output() resetFilters = new EventEmitter<void>();

  // Create array for skeleton loading animation
  loadingArray = Array(6)
    .fill(0)
    .map((_, i) => i);

  onSelectPizza(pizza: Pizza): void {
    this.selectPizza.emit(pizza);
  }

  onLoadMore(): void {
    this.loadMore.emit();
  }

  onResetFilters(): void {
    this.resetFilters.emit();
  }
}
