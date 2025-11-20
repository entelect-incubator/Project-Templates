/**
 * Pizza Card Component
 * Displays individual pizza with add to cart functionality
 */

import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Pizza } from '../../types';
import { CartService } from '../../../order/services/cart.service';

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <article class="pizza-card" [class.unavailable]="!pizza.available">
      <div class="pizza-card__image">
        <img
          [src]="pizza.imageUrl"
          [alt]="pizza.name"
          (error)="onImageError($event)"
          loading="lazy"
        />
        @if (!pizza.available) {
        <div class="pizza-card__unavailable-overlay">
          <span>Currently Unavailable</span>
        </div>
        }
      </div>

      <div class="pizza-card__content">
        <header class="pizza-card__header">
          <h3 class="pizza-card__name">{{ pizza.name }}</h3>
          <mat-chip-set class="pizza-card__category">
            <mat-chip>{{ pizza.category | titlecase }}</mat-chip>
          </mat-chip-set>
        </header>

        <p class="pizza-card__description">{{ pizza.description }}</p>

        <div class="pizza-card__ingredients">
          <span class="pizza-card__ingredients-label">Ingredients:</span>
          <div class="pizza-card__ingredient-tags">
            @for (ingredient of pizza.ingredients; track ingredient.id) {
            <mat-chip
              class="ingredient-tag"
              [class.vegetarian]="ingredient.vegetarian"
              [class.vegan]="ingredient.vegan"
            >
              {{ ingredient.name }}
            </mat-chip>
            }
          </div>
        </div>

        <div class="pizza-card__meta">
          <div class="pizza-card__timing">
            <span class="prep-time">
              <mat-icon>schedule</mat-icon>
              {{ pizza.preparationTime }}min
            </span>
            <span class="size">
              <mat-icon>straighten</mat-icon>
              {{ pizza.size | titlecase }}
            </span>
          </div>

          @if (pizza.nutritionalInfo) {
          <div class="pizza-card__nutrition">
            <span>{{ pizza.nutritionalInfo.calories }} cal</span>
          </div>
          }
        </div>

        <footer class="pizza-card__footer">
          <div class="pizza-card__price">
            <span class="currency">$</span>
            <span class="amount">{{ pizza.price | currency : 'USD' : 'symbol' : '1.2-2' }}</span>
          </div>

          <div class="pizza-card__actions">
            @if (isInCart()) {
            <div class="quantity-controls">
              <button
                mat-icon-button
                size="small"
                (click)="decrementQuantity()"
                [disabled]="!pizza.available"
              >
                <mat-icon>remove</mat-icon>
              </button>
              <span class="quantity">{{ getQuantityInCart() }}</span>
              <button
                mat-icon-button
                size="small"
                (click)="incrementQuantity()"
                [disabled]="!pizza.available"
              >
                <mat-icon>add</mat-icon>
              </button>
            </div>
            } @else {
            <button
              mat-raised-button
              color="primary"
              class="pizza-card__add-btn"
              [disabled]="!pizza.available"
              (click)="onAddToCart()"
            >
              <ng-container>
                @if (pizza.available) {
                <mat-icon>add_shopping_cart</mat-icon>
                }
              </ng-container>
              @if (pizza.available) { Add to Cart } @else { Out of Stock }
            </button>
            }
          </div>
        </footer>
      </div>
    </article>
  `,
  styleUrl: './pizza-card.component.scss',
})
export class PizzaCardComponent {
  @Input({ required: true }) pizza!: Pizza;
  @Output() selectPizza = new EventEmitter<Pizza>();

  private readonly cartService = inject(CartService);

  onAddToCart(): void {
    if (this.pizza.available) {
      this.cartService.addToCart(this.pizza, 1);
    }
  }

  onSelectPizza(): void {
    this.selectPizza.emit(this.pizza);
  }

  incrementQuantity(): void {
    const currentQuantity = this.getQuantityInCart();
    this.cartService.updateQuantity(this.pizza.id, currentQuantity + 1);
  }

  decrementQuantity(): void {
    const currentQuantity = this.getQuantityInCart();
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(this.pizza.id, currentQuantity - 1);
    } else {
      this.cartService.removeItem(this.pizza.id);
    }
  }

  isInCart(): boolean {
    return this.cartService.isInCart(this.pizza.id);
  }

  getQuantityInCart(): number {
    const item = this.cartService.getItem(this.pizza.id);
    return item ? item.quantity : 0;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = '/images/pizza-placeholder.jpg'; // Fallback image
  }
}
