# Developer Onboarding Guide

Welcome to the Pezza Pizza Ordering App! This guide will get you up and running quickly.

## 🚀 Quick Start (5 minutes)

### Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org)
- **.NET 9 SDK** - [Download](https://dotnet.microsoft.com/download)
- **VS Code** - [Download](https://code.visualstudio.com)

### 1. Install Dependencies

```bash
cd frontend/Angular
npm install
```

### 2. Start Development Server

**Option A: Angular Only**
```bash
ng serve
```

**Option B: With .NET Aspire (Recommended)**
```bash
npm run aspire
```

### 3. Open in Browser

- Angular App: [http://localhost:4200](http://localhost:4200)
- Aspire Dashboard: [https://aspire.dev.localhost:17091](https://aspire.dev.localhost:17091)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── core/              # App-wide singletons
│   │   ├── guards/        # Route guards
│   │   └── interceptors/  # HTTP interceptors
│   ├── shared/            # Reusable code
│   │   ├── components/    # UI components
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   ├── hero/
│   │   │   └── toast-banner/
│   │   └── services/      # Shared services
│   ├── features/          # Feature modules
│   │   ├── pizza/         # Pizza menu
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   └── types/
│   │   └── order/         # Cart & ordering
│   └── generated/         # Auto-generated API clients
├── assets/                # Static files
└── styles.scss            # Global styles
```

---

## 🛠️ Key Technologies

| Technology   | Version | Purpose                  |
| ------------ | ------- | ------------------------ |
| Angular      | 21      | Frontend framework       |
| Tailwind CSS | 4.0     | Utility-first styling    |
| .NET Aspire  | 9.0     | Cloud-native development |
| TypeScript   | 5.7     | Type safety              |

---

## 📝 Development Workflow

### Creating a Component

```bash
# Generate with Angular CLI
ng generate component features/pizza/components/pizza-detail

# Or create files manually following structure:
pizza-detail/
  pizza-detail.component.ts
  pizza-detail.component.html
  pizza-detail.component.scss
  pizza-detail.component.spec.ts
```

### Component Template

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pizza-detail',
  standalone: true,
  templateUrl: './pizza-detail.component.html',
  styleUrl: './pizza-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PizzaDetailComponent {}
```

### API Integration

```typescript
import { inject } from '@angular/core';
import { PizzaService } from '../../../generated/api';

export class PizzaListComponent {
  private readonly pizzaApi = inject(PizzaService);
  
  readonly pizzas = signal<PizzaModel[]>([]);
  
  async loadPizzas(): Promise<void> {
    const result = await firstValueFrom(this.pizzaApi.apiV1PizzaGet());
    this.pizzas.set(result);
  }
}
```

---

## 🧪 Testing

```bash
# Run unit tests
ng test

# Run with coverage
ng test --code-coverage

# Run specific test file
ng test --include=**/pizza-card*.spec.ts
```

---

## 🔧 Useful Commands

| Command                | Description            |
| ---------------------- | ---------------------- |
| `ng serve`             | Start dev server       |
| `ng build`             | Production build       |
| `ng test`              | Run unit tests         |
| `ng lint`              | Lint code              |
| `npm run generate:api` | Regenerate API clients |
| `npm run aspire`       | Start with Aspire      |

---

## 📚 Documentation

- [Angular Style Guide](./ANGULAR_STYLE_GUIDE.md) - Coding standards
- [Architecture Overview](./ARCHITECTURE_OVERVIEW.md) - App structure
- [Aspire Setup](./ASPIRE_SETUP.md) - Backend integration
- [API Client Generation](./API_CLIENT_GENERATION.md) - OpenAPI setup

---

## 🆘 Getting Help

1. Check the documentation links above
2. Search existing code for examples
3. Ask team members
4. Consult [Angular Docs](https://angular.dev)

---

## ✅ Onboarding Checklist

- [ ] Node.js installed and working
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`ng serve`)
- [ ] Can see app at localhost:4200
- [ ] Made first code change
- [ ] Read Angular Style Guide
- [ ] Understand project structure
