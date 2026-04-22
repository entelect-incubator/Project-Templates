/**
 * Pizza Card Component
 *
 * Single Responsibility: Displays individual pizza with add to cart functionality
 * Works with the generated PizzaModel API type
 *
 * @see https://angular.dev/style-guide
 */
import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { LazyImageComponent } from '../../../../shared/components/lazy-image/lazy-image.component';
import { CartService } from '../../../order/services/cart.service';
import { PizzaModel } from '../../../../generated/api';

// Default price for pizzas (since API doesn't include it)
const DEFAULT_PIZZA_PRICE = 149.99;

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [LazyImageComponent, CurrencyPipe],
  templateUrl: './pizza-card.component.html',
  styleUrl: './pizza-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaCardComponent {
  @Input({ required: true }) pizza!: PizzaModel;
  @Input() apiBaseUrl = '';
  @Output() added = new EventEmitter<{ pizza: PizzaModel; quantity: number }>();

  private readonly cartService = inject(CartService);

  readonly quantity = signal(1);
  readonly price = DEFAULT_PIZZA_PRICE;

  // Static image mapping for pizza types
  private readonly pizzaImages: Record<string, string> = {
    hawaiian: '/images/hawaiian.png',
    pepperoni: '/images/pepperoni.png',
    regina: '/images/regina.png',
    margherita: '/images/margherita.png',
  };

  getImageUrl(): string {
    // Try to match pizza name to static image
    const pizzaName = this.pizza.name?.toLowerCase() || '';
    for (const [key, url] of Object.entries(this.pizzaImages)) {
      if (pizzaName.includes(key)) {
        return url;
      }
    }
    // Fallback to API if no static image matches
    if (this.pizza.id && this.apiBaseUrl) {
      return `${this.apiBaseUrl}/Pizza/${this.pizza.id}/image`;
    }
    return '/images/margherita.png'; // Default fallback
  }

  incrementQuantity(): void {
    if (this.quantity() < 10) {
      this.quantity.update((q) => q + 1);
    }
  }

  decrementQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  onQuantityChange(event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value, 10);
    if (value >= 1 && value <= 10) {
      this.quantity.set(value);
    }
  }

  quickAdd(): void {
    this.addToCart();
  }

  addToCart(): void {
    if (this.pizza.disabled) return;

    // Create a pizza object for the cart service
    const pizzaForCart = {
      id: String(this.pizza.id || 0),
      name: this.pizza.name || 'Unknown Pizza',
      description: 'Delicious pizza made with fresh ingredients',
      price: this.price,
      imageUrl: this.getImageUrl(),
      available: !this.pizza.disabled,
      category: 'specialty' as const,
      ingredients: [],
      preparationTime: 15,
      size: 'medium' as const,
    };

    this.cartService.addToCart(pizzaForCart, this.quantity());
    this.added.emit({ pizza: this.pizza, quantity: this.quantity() });

    // Reset quantity after adding
    this.quantity.set(1);
  }
}
