# API Client Generation

This document explains how to generate and use the TypeScript API clients.

## Overview

We use **OpenAPI Generator** to automatically create type-safe Angular clients from the backend's OpenAPI specification.

## Quick Start

```bash
# Generate/regenerate API clients
npm run generate:api
```

This creates clients in `src/app/generated/api/`.

## Configuration

### OpenAPI Tools Config

File: `openapitools.json`

```json
{
  "$schema": "node_modules/@openapitools/openapi-generator-cli/config.schema.json",
  "spaces": 2,
  "generator-cli": {
    "version": "7.12.0",
    "generators": {
      "angular": {
        "generatorName": "typescript-angular",
        "inputSpec": "../Pezza.Web/swagger.json",
        "output": "src/app/generated/api",
        "additionalProperties": {
          "ngVersion": "20.0.0",
          "supportsES6": true,
          "withInterfaces": true,
          "useSingleRequestParameter": true
        }
      }
    }
  }
}
```

## Generated Files

```
src/app/generated/api/
├── api/
│   ├── pizza.service.ts      # Pizza API operations
│   ├── order.service.ts      # Order API operations
│   └── ...
├── model/
│   ├── pizzaModel.ts         # Pizza data model
│   ├── orderModel.ts         # Order data model
│   └── ...
├── api.module.ts             # Optional module import
└── index.ts                  # Barrel exports
```

## Usage

### Injecting Services

```typescript
import { inject } from '@angular/core';
import { PizzaService, PizzaModel } from '../../../generated/api';

export class PizzaListComponent {
  private readonly pizzaApi = inject(PizzaService);
  
  async loadPizzas(): Promise<PizzaModel[]> {
    return await firstValueFrom(this.pizzaApi.apiV1PizzaGet());
  }
}
```

### Configuration in app.config.ts

```typescript
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiModule, Configuration } from './generated/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: Configuration,
      useFactory: () => new Configuration({
        basePath: environment.apiBaseUrl,
      }),
    },
    importProvidersFrom(ApiModule),
  ],
};
```

## Image Loading

The backend provides pizza images via:

```
GET /api/v1/Pizza/{id}/image
```

### Lazy Image Component

```html
<app-lazy-image
  [src]="'/api/v1/Pizza/' + pizza.id + '/image'"
  [alt]="pizza.name"
  containerClass="w-full h-48"
  imageClass="object-cover"
/>
```

## Regenerating Clients

When the backend API changes:

1. Ensure backend is running
2. Update `swagger.json` from backend
3. Run `npm run generate:api`
4. Review generated changes
5. Update components if needed

## Troubleshooting

### Common Issues

**"Cannot find module '@api'"**
- Run `npm run generate:api`
- Check `tsconfig.json` paths

**"API returns 404"**
- Verify `basePath` in configuration
- Check backend is running

**"Type mismatches after regeneration"**
- Review breaking API changes
- Update component code accordingly
