# Angular 20 Pizza Ordering Template 🍕

A modern Angular application built with the latest features including zoneless architecture, standalone components, and Server-Side Rendering.

## Features

- **Angular 20.3.9** with zoneless architecture
- **Standalone Components** - No NgModule required  
- **Server-Side Rendering (SSR)** - Fast initial page loads
- **TypeScript Client Generation** - Auto-generated from OpenAPI
- **Angular Material Design** - Modern UI components
- **Reactive Signals** - Built-in state management
- **OpenTelemetry Integration** - Observability and monitoring
- **Functional Interceptors** - HTTP request/response handling
- **Global Error Handling** - User-friendly error notifications
- **Loading States** - Visual feedback for async operations

## Quick Start

### Prerequisites

- Node.js 18+ 
- Angular CLI 20+
- .NET 9 backend running on https://localhost:7160

### Installation

```bash
cd frontend/Angular/template/pizza-ordering-app
npm install
npm start
```

The application will be available at `http://localhost:4200`

## Architecture

### Core Services

- **NotificationService** - Toast notifications using ngx-toastr
- **LoadingService** - Signal-based loading state management  
- **OpenTelemetryService** - Basic performance monitoring and telemetry

### HTTP Interceptors

- **AuthInterceptor** - Authentication token management
- **ErrorInterceptor** - Global error handling with notifications
- **LoadingInterceptor** - Automatic loading state management

### Generated API Client

The TypeScript client is auto-generated from the backend's OpenAPI specification:

- **PizzaService** - CRUD operations for pizzas
- **OrderService** - Order management and tracking
- **Type-safe models** - Full TypeScript support

### Component Structure

```
src/app/
├── core/
│   ├── interceptors/     # HTTP interceptors
│   ├── services/         # Core services
│   └── observability/    # Telemetry and monitoring
├── features/
│   └── pizza-menu/       # Pizza menu component
├── generated/
│   └── api/             # Auto-generated API client
└── shared/              # Shared components and utilities
```

## Modern Angular Features

### Zoneless Architecture

```typescript
bootstrapApplication(App, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    // other providers...
  ]
});
```

### Standalone Components

```typescript
@Component({
  selector: 'app-pizza-menu',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  // component implementation
})
export class PizzaMenuComponent { }
```

### Angular Signals

```typescript
pizzas = signal<PizzaModel[]>([]);
isLoading = signal(true);

// Reactive updates
this.pizzas.set(newPizzas);
```

### Functional Interceptors

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getAuthToken();
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};
```

## SSR-Safe Implementation

### OpenTelemetry Integration

```typescript
async initializeTelemetry(): Promise<void> {
  if (!isPlatformBrowser(this.platformId)) {
    return; // Skip on server
  }
  
  // Browser-only telemetry setup
  this.setupBasicPerformanceMonitoring();
}
```

### Platform Detection

```typescript
private platformId = inject(PLATFORM_ID);

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    this.telemetryService.initializeTelemetry();
  }
}
```

## API Integration

### Client Generation

```bash
npm run generate:api
```

This generates a full TypeScript client from the backend's OpenAPI specification.

### Service Usage

```typescript
async loadPizzas(): Promise<void> {
  await this.telemetryService.createSpan('load-pizzas', async () => {
    try {
      const query: GetAllPizzasQuery = {};
      const result = await this.pizzaService.searchPizzas(query).toPromise();
      this.pizzas.set(result?.data || []);
      
      this.notificationService.showSuccess(
        `Loaded ${result?.data?.length || 0} delicious pizzas!`
      );
    } catch (error) {
      this.notificationService.showError(
        'Failed to load our pizza menu. Please try again later.'
      );
    }
  });
}
```

## Development Scripts

```json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "serve:ssr": "node dist/pizza-ordering-app/server/server.mjs",
    "generate:api": "openapi-generator-cli generate -i ../../../../clients/generated/spec/swagger.json -g typescript-angular -o src/app/generated/api --additional-properties=ngVersion=20,providedInSingleton=true,withInterfaces=true"
  }
}
```

## Build and Deployment

### Development Build

```bash
npm run build
```

### Production Build with SSR

```bash
npm run build
npm run serve:ssr
```

## Technology Stack

- **Angular 20.3.9** - Latest Angular framework
- **TypeScript 5.7** - Type-safe development
- **Angular Material** - UI component library
- **RxJS** - Reactive programming
- **ngx-toastr** - Toast notifications
- **SCSS** - Styling and theming
- **OpenAPI Generator** - API client generation
- **Vite** - Fast development server and build tool

## Browser Support

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow Angular style guide
2. Use standalone components
3. Implement proper error handling
4. Add loading states for async operations
5. Write unit tests for components
6. Update documentation

## License

MIT License - see LICENSE file for details.