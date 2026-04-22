import { Component, inject, signal, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PizzaService, type PizzaModel, type GetAllPizzasQuery } from '../../generated/api';
import { NotificationService } from '../../core/services/notification.service';
import { CartService } from '../order/services/cart.service';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-pizza-menu',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './pizza-menu.component.html',
  styles: [
    `
      .pizza-menu {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      h1 {
        text-align: center;
        margin-bottom: 30px;
        color: #333;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px;

        p {
          margin-top: 16px;
          color: #666;
        }
      }

      .pizza-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      .pizza-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        transition: transform 0.2s ease-in-out;

        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
      }

      .pizza-image {
        height: 200px;
        object-fit: cover;
        transition: opacity 0.3s ease-in-out, filter 0.3s ease-in-out;

        &.loading {
          filter: blur(10px);
          opacity: 0.6;
        }

        &.loaded {
          filter: blur(0);
          opacity: 1;
        }
      }

      mat-card-content {
        flex: 1;

        .pizza-info {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;

          .status {
            font-weight: 500;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.9em;

            &.available {
              background-color: #e8f5e8;
              color: #2e7d32;
            }

            &.unavailable {
              background-color: #ffeaa7;
              color: #d68910;
            }
          }

          .date-added {
            color: #666;
            font-size: 0.8em;
          }
        }
      }

      mat-card-actions {
        padding: 16px;

        button {
          mat-icon {
            margin-right: 8px;
          }
        }
      }

      .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #666;

        mat-icon {
          font-size: 64px;
          width: 64px;
          height: 64px;
          margin-bottom: 16px;
          color: #ddd;
        }

        h2 {
          margin: 16px 0 8px 0;
        }
      }
    `,
  ],
})
export class PizzaMenuComponent implements OnInit {
  private pizzaService = inject(PizzaService);
  private notificationService = inject(NotificationService);
  private readonly cartService = inject(CartService);
  private loggingService = inject(LoggingService);

  pizzas = signal<PizzaModel[]>([]);
  isLoading = signal(true);
  imageLoadingStates = signal<Map<number, boolean>>(new Map());

  ngOnInit() {
    this.loadPizzas();
  }

  /**
   * Get pizza image URL from API
   */
  getPizzaImageUrl(pizzaId?: number): string {
    if (!pizzaId) return 'https://via.placeholder.com/300x200/FF6B35/FFFFFF?text=Pizza';
    // API endpoint for pizza images
    return `https://localhost:7160/v1/pizzas/${pizzaId}/image`;
  }

  /**
   * Handle image load completion
   */
  onImageLoad(pizzaId?: number): void {
    if (pizzaId) {
      this.imageLoadingStates.update((states) => {
        const newStates = new Map(states);
        newStates.set(pizzaId, true);
        return newStates;
      });
    }
  }

  /**
   * Check if image has loaded
   */
  isImageLoaded(pizzaId?: number): boolean {
    if (!pizzaId) return false;
    return this.imageLoadingStates().get(pizzaId) ?? false;
  }

  private async loadPizzas(): Promise<void> {
    await this.loggingService.trackOperation('load-pizzas', async () => {
      try {
        this.isLoading.set(true);

        // Create empty query to get all pizzas
        const query: GetAllPizzasQuery = {};
        const result = await this.pizzaService.searchPizzas(query).toPromise();

        this.pizzas.set(result?.data || []);

        this.notificationService.showSuccess(
          `Loaded ${result?.data?.length || 0} delicious pizzas!`
        );
      } catch (error) {
        console.error('Failed to load pizzas:', error);
        this.notificationService.showError(
          'Failed to load our pizza menu. Please try again later.'
        );

        // Add some mock data for demonstration
        this.addMockPizzas();
      } finally {
        this.isLoading.set(false);
      }
    });
  }

  private addMockPizzas(): void {
    const mockPizzas: PizzaModel[] = [
      {
        id: 1,
        name: 'Margherita',
        disabled: false,
        dateCreated: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'Pepperoni',
        disabled: false,
        dateCreated: new Date().toISOString(),
      },
      {
        id: 3,
        name: 'Hawaiian',
        disabled: false,
        dateCreated: new Date().toISOString(),
      },
      {
        id: 4,
        name: 'Meat Lovers',
        disabled: true,
        dateCreated: new Date().toISOString(),
      },
    ];

    this.pizzas.set(mockPizzas);
  }

  async addToCart(pizza: PizzaModel): Promise<void> {
    await this.loggingService.trackOperation('add-to-cart', async () => {
      try {
        // Add pizza to the cart using CartService
        this.cartService.addToCart({
          id: pizza.id?.toString() ?? '',
          name: pizza.name ?? 'Pizza',
          price: 12.99,
          description: pizza.name ?? 'Pizza',
          category: 'specialty',
          ingredients: [],
          imageUrl: '/images/pizza-placeholder.jpg',
          available: !pizza.disabled,
          preparationTime: 15,
          size: 'medium',
        });

        this.notificationService.showSuccess(`${pizza.name} added to your cart!`);
      } catch (error) {
        console.error('Failed to add pizza to cart:', error);
        this.notificationService.showError('Failed to add pizza to cart. Please try again.');
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
