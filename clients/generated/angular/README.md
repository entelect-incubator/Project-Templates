# Angular OpenAPI Client

This directory contains the auto-generated TypeScript Angular client for the Pizza Ordering API.

## Generated Files

The client is generated using OpenAPI Generator from the API specification at `https://localhost:7160/swagger/v1/swagger.json`

## Generation

### Automatic Generation

From the Angular project:
```bash
cd frontend/Angular
npm run generate:api
```

### Manual Generation

From the clients/generation directory:

**Windows:**
```batch
cd clients/generation
.\generate-angular-client.bat
```

**macOS/Linux:**
```bash
cd clients/generation
chmod +x generate-angular-client.sh
./generate-angular-client.sh
```

## Usage in Angular

### 1. Import Services

```typescript
import { PizzaService, PizzaModel } from './generated/api';
```

### 2. Inject in Components

```typescript
import { Component, inject, signal } from '@angular/core';
import { PizzaService } from './generated/api';

@Component({
  selector: 'app-pizza-menu',
  standalone: true,
  // ...
})
export class PizzaMenuComponent {
  private pizzaService = inject(PizzaService);
  pizzas = signal<PizzaModel[]>([]);

  ngOnInit() {
    this.loadPizzas();
  }

  private loadPizzas() {
    this.pizzaService.searchPizzas({}).subscribe(result => {
      this.pizzas.set(result.data || []);
    });
  }
}
```

### 3. API Endpoints

- **Pizza Service**: CRUD operations for pizzas
- **Order Service**: Order creation and management
- **Images**: `/v1/pizzas/{pizzaId}/image` - Pizza images

## Features

- ✅ TypeScript interfaces for all API models
- ✅ Angular 21 compatible
- ✅ RxJS observables
- ✅ Singleton services with `providedInRoot`
- ✅ Type-safe API calls
- ✅ Automatic error handling

## Configuration

The client is configured with:
- **ngVersion**: 21
- **providedInSingleton**: true
- **withInterfaces**: true
- **useSingleRequestParameter**: true

## Lazy Loading Images

Pizza images can be loaded from the API:

```typescript
getPizzaImageUrl(pizzaId: number): string {
  return `https://localhost:7160/v1/pizzas/${pizzaId}/image`;
}
```

With blur effect during loading:

```html
<img 
  [src]="getPizzaImageUrl(pizza.id)"
  [class.loading]="!isImageLoaded(pizza.id)"
  [class.loaded]="isImageLoaded(pizza.id)"
  (load)="onImageLoad(pizza.id)"
  loading="lazy"
/>
```

```css
.pizza-image {
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
```

## Regeneration

Regenerate the client whenever the API changes:

1. Ensure the API is running at `https://localhost:7160`
2. Run the generation script
3. The client will be automatically updated

## Directory Structure

```
angular/
├── api/           # API service interfaces
├── model/         # TypeScript models/interfaces
├── configuration.ts
├── encoder.ts
├── variables.ts
└── README.md (this file)
```

## Notes

- The client is auto-generated - do not edit manually
- All changes will be overwritten on regeneration
- Use the API service interfaces for type safety
- Images are served from the API's wwwroot/images directory
