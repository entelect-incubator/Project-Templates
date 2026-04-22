# Angular Client Quick Reference

## Generate Angular Client

### From Angular Project
```bash
cd frontend/Angular
npm run generate:api
```

### Standalone
```batch
# Windows
cd clients/generation
.\generate-angular-client.bat

# macOS/Linux
cd clients/generation
chmod +x generate-angular-client.sh
./generate-angular-client.sh
```

## Client Location
```
clients/generated/angular/
├── api/           # Services (PizzaService, OrderService)
├── model/         # TypeScript interfaces
└── README.md      # Full documentation
```

## Usage Examples

### Import Service
```typescript
import { PizzaService, PizzaModel } from './generated/api';
```

### Inject in Component
```typescript
private pizzaService = inject(PizzaService);
```

### Load Data
```typescript
this.pizzaService.searchPizzas({}).subscribe(result => {
  this.pizzas.set(result.data || []);
});
```

### Load Images
```typescript
// API endpoint
getPizzaImageUrl(pizzaId: number): string {
  return `https://localhost:7160/v1/pizzas/${pizzaId}/image`;
}
```

## Features
- ✅ Angular 21 compatible
- ✅ Signal-ready
- ✅ TypeScript interfaces
- ✅ RxJS observables
- ✅ Singleton services

## Requirements
- API running at https://localhost:7160
- @openapitools/openapi-generator-cli installed

## See Also
- Full docs: `clients/generated/angular/README.md`
- Implementation: `frontend/Angular/CLIENT_GENERATION_AND_IMAGES.md`
