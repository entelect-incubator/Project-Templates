# Developer Onboarding Guide

Welcome to the **Pezza Pizzeria React Template** - a modern, production-ready React application built with React 19.2, TypeScript, and best practices.

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18.0.0
- **npm** or **yarn**
- **Git**

### Installation
```bash
# Clone and install dependencies
git clone <repository-url>
cd react-template
npm install

# Start development server
npm run dev
```

## 📁 Project Structure

```
src/
├── app/                    # Application configuration
│   ├── App.tsx            # Root app component with routing
│   └── App.scss           # Global app styles
├── components/            # Reusable UI components
│   ├── common/           # Common components (ErrorBoundary, Toast)
│   └── ui/               # UI primitives (Button, Card, etc.)
├── features/             # Feature-based modules
│   └── pizzas/          # Pizza-related functionality
│       ├── components/  # Feature-specific components
│       ├── hooks/       # Feature-specific hooks
│       ├── pages/       # Feature pages
│       └── types/       # Feature type definitions
├── lib/                  # Shared libraries and utilities
│   ├── queryClient.ts   # TanStack Query configuration
│   └── telemetry.ts     # OpenTelemetry setup
├── stores/              # Global state management
└── styles/              # Global styles and design tokens
```

## 🛠️ Development Workflow

### Code Quality Tools

We use **Biome** as our all-in-one toolchain for linting, formatting, and code quality.

#### Setup Biome in Your Editor

**VS Code:**
1. Install the [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
2. Add to your `.vscode/settings.json`:
```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": true,
    "source.organizeImports.biome": true
  }
}
```

#### Biome Commands
```bash
# Check code quality (lint + format)
npm run check

# Auto-fix issues
npm run check:fix

# Lint only
npm run lint

# Format only
npm run format
```

### Git Workflow
```bash
# Before committing, run pre-commit checks
npm run pre-commit

# This runs:
# - TypeScript type checking
# - Biome linting and formatting
# - Unit tests
```

## 🏗️ Architecture & Patterns

### SOLID Principles Implementation

#### 1. **Single Responsibility Principle (SRP)**
Each component, hook, and function has one clear purpose:

```tsx
// ✅ Good - Single responsibility
function PizzaCard({ pizza }: { pizza: Pizza }) {
  // Only responsible for rendering a pizza card
}

function usePizzas() {
  // Only responsible for pizza data fetching
}

// ❌ Bad - Multiple responsibilities
function PizzaCardWithCart({ pizza, cart, onAddToCart }) {
  // Handles both pizza display AND cart logic
}
```

#### 2. **Open/Closed Principle (OCP)**
Components are open for extension, closed for modification:

```tsx
// ✅ Good - Extensible via props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}

// Easy to extend without modifying the component
<Button variant="primary" size="lg">Add to Cart</Button>
```

#### 3. **Liskov Substitution Principle (LSP)**
Derived components can replace base components:

```tsx
// ✅ Good - All buttons work the same way
interface BaseButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function PrimaryButton(props: BaseButtonProps) { /* */ }
function SecondaryButton(props: BaseButtonProps) { /* */ }

// Both can be used interchangeably
```

#### 4. **Interface Segregation Principle (ISP)**
Small, focused interfaces instead of large ones:

```tsx
// ✅ Good - Focused interfaces
interface PizzaDisplayProps {
  pizza: Pizza;
}

interface PizzaActionsProps {
  onAddToCart: (pizza: Pizza) => void;
}

// ❌ Bad - Large interface with optional props
interface PizzaComponentProps {
  pizza: Pizza;
  onAddToCart?: (pizza: Pizza) => void;
  showPrice?: boolean;
  showToppings?: boolean;
  // ... many optional props
}
```

#### 5. **Dependency Inversion Principle (DIP)**
Depend on abstractions, not implementations:

```tsx
// ✅ Good - Depends on abstraction
interface ApiClient {
  fetchPizzas(): Promise<Pizza[]>;
}

function usePizzas(apiClient: ApiClient) {
  // Works with any implementation of ApiClient
}

// ❌ Bad - Depends on implementation
function usePizzas() {
  // Hard-coded to specific fetch implementation
  return fetch('/api/pizzas');
}
```

### Clean Code Practices

#### Meaningful Names
```tsx
// ✅ Good
const activePizzas = pizzas.filter(pizza => pizza.available);
const calculateTotalPrice = (items: CartItem[]) => { /* */ };

// ❌ Bad
const data = pizzas.filter(p => p.avl);
const calc = (items: any[]) => { /* */ };
```

#### Pure Functions
```tsx
// ✅ Good - Pure function
function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

// ❌ Bad - Side effects
let globalTotal = 0;
function calculateTotal(items: CartItem[]): number {
  globalTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  return globalTotal;
}
```

#### Small, Focused Components
```tsx
// ✅ Good - Small, focused
function PizzaToppings({ toppings }: { toppings: string[] }) {
  return (
    <div className="pizza-toppings">
      {toppings.map(topping => (
        <Badge key={topping}>{topping}</Badge>
      ))}
    </div>
  );
}

// ❌ Bad - Too large, multiple concerns
function PizzaCardWithEverything({ pizza }) {
  // 100+ lines handling display, actions, cart, etc.
}
```

## 🚦 React 19.2 Features

### Server-Side Rendering (SSR)
We use React 19.2's improved SSR with Suspense batching:

```tsx
// Automatic Suspense batching for better performance
function PizzaMenuContent() {
  const { data: pizzas } = usePizzas(); // useSuspenseQuery internally
  
  return (
    <div>
      {pizzas.map(pizza => <PizzaCard key={pizza.id} pizza={pizza} />)}
    </div>
  );
}

// Wrapped with Suspense boundary
export default function PizzaMenuPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PizzaMenuContent />
    </Suspense>
  );
}
```

### Build Commands
```bash
# Client-side build
npm run build:client

# Server-side build  
npm run build:server

# Full SSR build
npm run build:ssr

# Preview SSR
npm run preview:ssr
```

## 🔍 Data Fetching Patterns

### TanStack Query with React 19.2 Suspense
```tsx
// Modern Suspense-based data fetching
export function usePizzas() {
  return useSuspenseQuery({
    queryKey: ['pizzas'],
    queryFn: fetchPizzas,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Legacy compatibility (if needed)
export function usePizzasLegacy() {
  return useQuery({
    queryKey: ['pizzas'],
    queryFn: fetchPizzas,
    staleTime: 1000 * 60 * 5,
  });
}
```

### Error Handling
```tsx
// Global error boundary catches Suspense errors
<GlobalErrorBoundary>
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
</GlobalErrorBoundary>
```

## 📊 Observability

### OpenTelemetry Integration
We use OpenTelemetry for distributed tracing:

```tsx
// Automatic telemetry for data fetching
async function fetchPizzas(): Promise<Pizza[]> {
  return withSpan('fetch-pizzas', async () => {
    addSpanAttributes({
      'pizza.api.endpoint': '/api/pizzas',
    });
    
    const response = await fetch('/api/pizzas');
    
    recordSpanEvent('pizza.fetch.success', {
      'pizza.count': data.length,
    });
    
    return data;
  });
}
```

## 🧪 Testing Strategy

### Unit Tests (Vitest)
```bash
# Run tests
npm run test

# Watch mode
npm run test -- --watch

# Coverage
npm run test:coverage

# UI mode
npm run test:ui
```

### Testing Components
```tsx
import { render, screen } from '@testing-library/react';
import { PizzaCard } from './PizzaCard';

test('displays pizza information', () => {
  const pizza = {
    id: '1',
    name: 'Margherita',
    price: 12.99,
  };
  
  render(<PizzaCard pizza={pizza} />);
  
  expect(screen.getByText('Margherita')).toBeInTheDocument();
  expect(screen.getByText('$12.99')).toBeInTheDocument();
});
```

### E2E Tests (Playwright)
```bash
# Run E2E tests
npm run e2e

# Interactive mode
npm run e2e:ui
```

## 🚀 Deployment

### Environment Variables
Create `.env.local` for local development:
```bash
VITE_API_URL=https://localhost:7160
VITE_SSR=false
```

### Production Build
```bash
# Full production build with SSR
npm run build:ssr

# Client-only build
npm run build:client
```

## 🔧 Troubleshooting

### Common Issues

#### Biome Configuration
If Biome isn't working:
1. Check `.vscode/settings.json` configuration
2. Ensure Biome extension is installed and enabled
3. Run `npm run check:fix` to auto-fix issues

#### TypeScript Errors
```bash
# Check types without building
npm run type-check

# Common issues:
# - Missing type definitions
# - Incorrect import paths
# - Outdated type declarations
```

#### SSR Issues
```bash
# Build server bundle separately to debug
npm run build:server

# Check for:
# - Client-only code in server bundle
# - Missing dependencies in SSR build
# - Hydration mismatches
```

## 📚 Additional Resources

### Documentation
- [React 19 Documentation](https://react.dev/)
- [TanStack Query Guide](https://tanstack.com/query/latest)
- [Biome Documentation](https://biomejs.dev/)
- [Vite SSR Guide](https://vitejs.dev/guide/ssr.html)

### Best Practices
- [React Performance Best Practices](https://react.dev/learn/render-and-commit)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)

## 🤝 Contributing

1. Follow the established code style (enforced by Biome)
2. Write tests for new features
3. Update documentation as needed
4. Run pre-commit checks before submitting PRs
5. Use meaningful commit messages

### Commit Message Format
```
feat(pizza): add new topping selection component

- Implements multi-select topping picker
- Adds validation for topping combinations
- Updates cart calculation logic

Closes #123
```

Happy coding! 🍕