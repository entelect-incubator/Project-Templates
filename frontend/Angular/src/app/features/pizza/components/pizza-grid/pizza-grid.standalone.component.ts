/**
 * Pizza Grid Component
 *
 * Single Responsibility: Display grid of pizzas from API
 *
 * @see https://angular.dev/style-guide
 */
import {
  Component,
  inject,
  signal,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PizzaCardComponent } from '../pizza-card/pizza-card.standalone.component';
import { PizzaService, PizzaModel } from '../../../../generated/api';
import { ToastBannerService } from '../../../../shared/components/toast-banner/toast-banner.service';
import { Subject, takeUntil, catchError, of } from 'rxjs';

@Component({
  selector: 'app-pizza-grid',
  standalone: true,
  imports: [PizzaCardComponent],
  template: `
    <!-- Loading State -->
    @if (loading()) {
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      @for (i of [1,2,3,4]; track i) {
      <div class="card animate-pulse">
        <div class="skeleton-image rounded-lg mb-4"></div>
        <div class="skeleton-title mb-2"></div>
        <div class="skeleton-text mb-4"></div>
        <div class="skeleton h-8 w-24"></div>
      </div>
      }
    </div>
    }

    <!-- Error State -->
    @if (error()) {
    <div class="text-center py-12">
      <div class="text-6xl mb-4">😕</div>
      <h3 class="text-xl font-bold mb-2" style="color: var(--color-text);">
        Oops! Something went wrong
      </h3>
      <p class="mb-6" style="color: var(--color-text-muted);">
        {{ error() }}
      </p>
      <button (click)="loadPizzas()" class="btn-primary">Try Again</button>
    </div>
    }

    <!-- Pizza Grid -->
    @if (!loading() && !error() && pizzas().length > 0) {
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      @for (pizza of pizzas(); track pizza.id) {
      <app-pizza-card [pizza]="pizza" [apiBaseUrl]="apiBaseUrl" (added)="onPizzaAdded($event)" />
      }
    </div>
    }

    <!-- Empty State -->
    @if (!loading() && !error() && pizzas().length === 0) {
    <div class="text-center py-12">
      <div class="text-6xl mb-4">🍕</div>
      <h3 class="text-xl font-bold mb-2" style="color: var(--color-text);">No pizzas available</h3>
      <p style="color: var(--color-text-muted);">Check back later for our delicious menu!</p>
    </div>
    }
  `,
})
export class PizzaGridComponent implements OnInit, OnDestroy {
  private readonly pizzaService = inject(PizzaService);
  private readonly toastService = inject(ToastBannerService);
  private readonly destroy$ = new Subject<void>();

  readonly pizzas = signal<PizzaModel[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  // API base URL for image loading
  readonly apiBaseUrl = '/api'; // Proxied in development

  ngOnInit(): void {
    this.loadPizzas();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPizzas(): void {
    this.loading.set(true);
    this.error.set(null);

    this.pizzaService
      .searchPizzas({})
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          console.error('Failed to load pizzas:', err);
          this.error.set('Failed to load pizzas. Please try again.');
          return of({ data: [], succeeded: false });
        })
      )
      .subscribe((result) => {
        this.loading.set(false);
        if (result.data) {
          this.pizzas.set(result.data);
        }
      });
  }

  onPizzaAdded(event: { pizza: PizzaModel; quantity: number }): void {
    this.toastService.success(`Added ${event.quantity}x ${event.pizza.name} to cart! 🍕`);
  }
}
