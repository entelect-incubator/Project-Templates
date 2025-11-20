# Pizza Ordering App - Angular Frontend

A modern Angular application for ordering pizzas with a clean, feature-based architecture using standalone components and Angular signals.

## 🏗️ Architecture Overview

This Angular application follows a feature-based architecture with domain-driven design principles:

```
src/app/
├── core/                    # Core application functionality
│   ├── interceptors/        # HTTP interceptors (auth, error handling)
│   └── services/           # Core services and utilities
├── features/               # Feature modules
│   ├── pizza/             # Pizza catalog and menu
│   │   ├── components/    # Pizza-specific components
│   │   ├── pages/         # Pizza pages (menu, details)
│   │   ├── services/      # Pizza service (API, state)
│   │   └── types/         # Pizza domain types
│   └── order/             # Shopping cart and checkout
│       ├── components/    # Order-specific components
│       ├── pages/         # Order pages (cart, checkout)
│       ├── services/      # Cart service, order service
│       └── types/         # Order domain types
├── shared/                # Shared components and services
│   ├── components/        # Reusable UI components
│   └── services/          # Global services (theme, toast)
└── generated/             # Auto-generated API clients
```

## 🚀 Key Features

### Pizza Catalog
- **Browse Pizzas**: Grid layout with filtering and sorting
- **Search**: Real-time search by name, description, and ingredients
- **Filters**: Category, price range, dietary preferences (vegetarian/vegan)
- **Pizza Details**: Detailed view with ingredients and nutritional info

### Shopping Cart
- **Add to Cart**: Quick add with quantity controls
- **Cart Management**: Update quantities, remove items
- **Real-time Totals**: Subtotal, tax, delivery fee calculation
- **Persistent Cart**: Saved in localStorage

### Order Management
- **Checkout Flow**: Multi-step checkout process
- **Customer Info**: Forms with validation
- **Order Tracking**: Real-time order status updates

### User Experience
- **Dark/Light Mode**: Theme toggle with system preference support
- **Responsive Design**: Mobile-first responsive layout
- **Loading States**: Skeleton loading and spinners with @if/@defer
- **Error Handling**: Global error handling with toast notifications
- **Accessibility**: WCAG 2.1 compliant components

## 🔧 Technical Stack

- **Framework**: Angular 18+ with standalone components
- **State Management**: Angular signals for reactive state
- **UI Components**: Angular Material with custom theming
- **Styling**: SCSS with CSS custom properties
- **HTTP Client**: Angular HttpClient with interceptors
- **Forms**: Reactive forms with validation
- **Testing**: Jest + Angular Testing Library
- **Build Tool**: Angular CLI with Vite

## 📦 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Angular CLI 18+

### Installation & Development
```bash
# Install dependencies
npm install

# Start development server
ng serve
# or
npm start

# Open browser to http://localhost:4200
```

### Build & Deploy
```bash
# Build for production
ng build

# Test the build locally
npx http-server dist/pizza-ordering-app

# Run tests
ng test

# Run e2e tests
ng e2e
```

## 🎯 Core Concepts

### Standalone Components
All components are standalone for better tree-shaking:

```typescript
@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `...`,
  styleUrl: './pizza-card.component.scss'
})
export class PizzaCardComponent {
  @Input({ required: true }) pizza!: Pizza;
  @Output() addToCart = new EventEmitter<Pizza>();
}
```

### Signal-Based State Management
Using Angular signals for reactive state:

```typescript
@Injectable({ providedIn: 'root' })
export class PizzaService {
  // Private writable signal
  private readonly _state = signal<PizzaState>({
    pizzas: [],
    loading: false,
    error: null
  });

  // Public readonly computed signals
  readonly pizzas = computed(() => this._state().pizzas);
  readonly loading = computed(() => this._state().loading);
  readonly availablePizzas = computed(() => 
    this.pizzas().filter(pizza => pizza.available)
  );
}
```

### Modern Control Flow with @if/@defer
```html
<!-- Loading states -->
@if (loading()) {
  <div class="loading-state">
    <mat-spinner></mat-spinner>
    <p>Loading pizzas...</p>
  </div>
} @else if (pizzas().length === 0) {
  <div class="empty-state">
    <p>No pizzas found</p>
  </div>
} @else {
  @for (pizza of pizzas(); track pizza.id) {
    <app-pizza-card [pizza]="pizza" />
  }
}

<!-- Deferred loading for performance -->
@defer (on viewport) {
  <app-reviews-section />
} @placeholder {
  <div class="placeholder">Loading reviews...</div>
} @loading (minimum 500ms) {
  <mat-spinner />
}
```

## 🎨 Theming System

The app supports automatic theme switching with cookie persistence:

### Theme Service Usage
```typescript
import { ThemeService } from '@app/shared/services/theme.service';

constructor(private themeService: ThemeService) {}

// Set theme
this.themeService.setTheme('dark'); // 'light' | 'dark' | 'system'

// Toggle theme
this.themeService.toggleTheme();

// Get current theme
const currentTheme = this.themeService.theme();
```

### Theme Toggle Component
```html
<!-- Add to toolbar -->
<mat-toolbar>
  <span>Pizza App</span>
  <div class="spacer"></div>
  <app-theme-toggle />
</mat-toolbar>
```

## 🌐 API Integration

### HTTP Service Pattern
```typescript
@Injectable({ providedIn: 'root' })
export class PizzaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/v1';

  loadPizzas(request: PizzaSearchRequest): Observable<PizzaSearchResponse> {
    return this.http.post<PizzaSearchResponse>(`${this.apiUrl}/search`, request)
      .pipe(
        tap(response => this.updateState(response)),
        catchError(this.handleError)
      );
  }

  private handleError = (error: any) => {
    this.toastService.handleHttpError(error);
    return of(this.getEmptyResponse());
  };
}
```

## 🔔 Global Error Handling

Automatic error handling with toast notifications:

```typescript
// HTTP errors are automatically caught and displayed
this.pizzaService.loadPizzas().subscribe({
  next: (pizzas) => {
    // Success handling
  },
  error: (error) => {
    // Error already handled by interceptor
    // Optional: component-specific error handling
  }
});
```

## 🧪 Testing

### Unit Testing
```typescript
describe('PizzaCardComponent', () => {
  let component: PizzaCardComponent;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    const cartSpy = jasmine.createSpyObj('CartService', ['addToCart']);
    TestBed.configureTestingModule({
      imports: [PizzaCardComponent],
      providers: [{ provide: CartService, useValue: cartSpy }]
    });
  });

  it('should add pizza to cart', () => {
    component.onAddToCart();
    expect(cartService.addToCart).toHaveBeenCalled();
  });
});
```

### E2E Testing
```typescript
test('should complete pizza ordering flow', async ({ page }) => {
  await page.goto('/pizzas');
  
  // Add pizza to cart
  await page.click('[data-testid="add-to-cart"]:first');
  
  // Verify cart badge
  await expect(page.locator('[data-testid="cart-badge"]')).toHaveText('1');
  
  // Complete checkout
  await page.click('[data-testid="cart-button"]');
  await page.fill('[data-testid="customer-email"]', 'test@example.com');
  await page.click('[data-testid="place-order"]');
  
  await expect(page).toHaveURL('/order-confirmation');
});
```

## 📁 Project Structure

```
src/
├── app/
│   ├── app.config.ts              # App configuration
│   ├── app.routes.ts              # Route configuration
│   ├── core/                      # Core functionality
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   └── error.interceptor.ts
│   │   └── services/
│   ├── features/                  # Feature modules
│   │   ├── pizza/
│   │   │   ├── components/
│   │   │   │   ├── pizza-card/
│   │   │   │   └── pizza-grid/
│   │   │   ├── pages/
│   │   │   │   └── pizza-menu-page/
│   │   │   ├── services/
│   │   │   │   └── pizza.service.ts
│   │   │   └── types/
│   │   │       └── pizza.interface.ts
│   │   └── order/
│   │       ├── components/
│   │       ├── pages/
│   │       ├── services/
│   │       │   └── cart.service.ts
│   │       └── types/
│   │           └── order.interface.ts
│   ├── shared/                    # Shared resources
│   │   ├── components/
│   │   │   └── theme-toggle/
│   │   └── services/
│   │       ├── theme.service.ts
│   │       └── toast.service.ts
│   └── generated/                 # Generated API client
├── assets/                        # Static assets
├── environments/                  # Environment configs
└── styles/                        # Global styles
```

## 🚀 Performance Features

- **Lazy Loading**: Route-based code splitting
- **OnPush Strategy**: Optimized change detection
- **TrackBy Functions**: Efficient list rendering
- **Image Lazy Loading**: Deferred image loading
- **Service Workers**: Caching and offline support
- **Bundle Analysis**: Webpack bundle analyzer

## 🔒 Security

- **CSRF Protection**: Built-in Angular protection
- **XSS Prevention**: Sanitized templates
- **JWT Handling**: Secure token management
- **Input Validation**: Form and API validation
- **HTTPS Enforcement**: Production security

## 🌍 Internationalization

Ready for i18n with Angular's built-in support:

```typescript
// Future i18n setup
ng add @angular/localize
ng generate @angular/localize:locale es
ng build --localize
```

## 📊 Development Tools

- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **Conventional Commits**: Commit standards
- **Angular DevTools**: Browser extension

## 🚢 Deployment

### Docker
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/pizza-ordering-app /usr/share/nginx/html
EXPOSE 80
```

### Environment Variables
```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.pizzaapp.com/v1',
  enableAnalytics: true
};
```

## 📚 Related Documentation

- [Backend API Documentation](../backend/.NET/README.md)
- [React Implementation](../React/README.md)
- [Design System](../../Theme/README.md)
- [Deployment Guide](../../docs/DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/pizza-filters`
3. Make your changes following the coding standards
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

---

## Commands Reference

```bash
# Development
ng serve                    # Start dev server
ng build                    # Build for production
ng test                     # Run unit tests
ng e2e                      # Run e2e tests

# Code Quality
ng lint                     # Run ESLint
ng lint --fix              # Fix ESLint issues
npm run format             # Format with Prettier

# Analysis
ng build --stats-json      # Generate bundle stats
npx webpack-bundle-analyzer dist/stats.json

# Generators
ng generate component pizza-card --standalone
ng generate service pizza --skip-tests
ng generate guard auth --functional
```

Built with ❤️ using Angular 18+ and Modern Web Standards