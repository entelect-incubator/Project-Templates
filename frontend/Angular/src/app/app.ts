import { Component, signal, inject, PLATFORM_ID, computed, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CartService } from './features/order/services/cart.service';
import { OpenTelemetryService } from './core/observability/opentelemetry.service';
import { ThemeService } from './shared/services/theme.service';

// Standalone Components
import { HeroComponent } from './shared/components/hero/hero.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PizzaGridComponent } from './features/pizza/components/pizza-grid/pizza-grid.standalone.component';
import { OrderModalComponent } from './features/order/components/order-modal/order-modal.component';
import { CartDropdownComponent } from './shared/components/cart-dropdown/cart-dropdown.component';
import { ToastBannerComponent } from './shared/components/toast-banner/toast-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeroComponent,
    HeaderComponent,
    FooterComponent,
    PizzaGridComponent,
    OrderModalComponent,
    CartDropdownComponent,
    ToastBannerComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('Pizza Paradise 🍕');
  protected readonly description = signal('Delicious pizzas delivered fresh to your door!');
  protected readonly showOrderModal = signal(false);
  protected readonly showCartDropdown = signal(false);

  private readonly telemetryService = inject(OpenTelemetryService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cartService = inject(CartService);
  protected readonly themeService = inject(ThemeService);

  protected readonly cartCount = computed(() => this.cartService.itemCount());
  protected readonly cartItems = computed(() => this.cartService.items());
  protected readonly cartTotal = computed(() => this.cartService.total());

  ngOnInit(): void {
    // Initialize telemetry only in browser
    if (isPlatformBrowser(this.platformId)) {
      this.telemetryService.initializeTelemetry();
    }
  }

  protected openOrderModal(): void {
    this.showOrderModal.set(true);
    this.showCartDropdown.set(false);
  }

  protected closeOrderModal(): void {
    this.showOrderModal.set(false);
  }

  protected toggleCartDropdown(): void {
    this.showCartDropdown.update((v) => !v);
  }

  protected closeCartDropdown(): void {
    this.showCartDropdown.set(false);
  }
}
