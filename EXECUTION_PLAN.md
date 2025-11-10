# Comprehensive Execution Plan - Pizza Ordering App Evolution

**Date:** November 7, 2025  
**Scope:** Multi-phase modernization of .NET templates and React/Angular frontends  
**Quality:** SOLID principles, DRY patterns, comprehensive testing, clean code

---

## Project Structure Overview

### Current State

**Backend (.NET Templates):**
- `backend/.NET/1.LayeredArchitecture/` - 2 templates (CleanTemplate, TemplateWithDataAccess)
- `backend/.NET/2.CleanArchitecture/` - Clean architecture templates
- `backend/.NET/3.VerticalSliceArchitecture/2.Minimal/` - **Reference implementation** (✅ Has Orders: Create, Complete, GetStatus)
- `backend/.NET/4.Utilities/` - Shared utilities
- `backend/.NET/examples/api-testing/` - API test examples

**Frontend:**
- `frontend/React/template/` - **Current Pizza App** (partially built with cart/checkout UI)
- No Angular template yet (needs to be created)

**Clients:**
- `clients/generation/` - OpenAPI generation scripts (NSwag-based)
- `clients/generated/react/` - Placeholder for generated React client

---

## Phase 1: Generate OpenAPI Client

### 1.1 Fetch and Generate TypeScript Client

**Objective:** Generate type-safe TypeScript client from backend Orders endpoint

**Steps:**
1. Install NSwag CLI globally
   ```powershell
   dotnet tool install --global NSwag.ConsoleCore
   ```

2. Run generation against running .NET backend at `https://localhost:7160`
   ```powershell
   cd clients/generation
   .\generate-react-client.bat https://localhost:7160
   ```

3. Generated output location: `clients/generated/react/src/api/generated.ts`

**Deliverables:**
- ✅ `generated.ts` - TypeScript client with CreateOrder, CompleteOrder, GetOrderStatus operations
- ✅ `index.ts` - Export barrel
- ✅ README with usage instructions

---

## Phase 2: Update All .NET Templates

### 2.1 Pattern Reference
The **VerticalSliceArchitecture/2.Minimal** project is the reference implementation containing:

**Current Stack:**
- CQRSLite (ICommand, ICommandHandler, IQuery, IQueryHandler)
- Dispatcher pattern (not MediaTr - custom lightweight dispatcher)
- FluentValidation (CreateOrderCommandValidator)
- Result pattern (Result<T>, Result<T>.Success(), Result<T>.NotFound())
- Vertical slices (Orders feature organized by V1, Commands, Queries, Endpoints)

**To Implement Across All Templates:**

#### 2.1.1 CQRSLite Pattern
- Create `ICommand<TResult>`, `ICommandHandler<TCommand, TResult>`
- Create `IQuery<TResult>`, `IQueryHandler<TQuery, TResult>`
- Define `Dispatcher` class for routing commands/queries to handlers
- Example: `CreateOrderCommand` → `CreateOrderCommandHandler`

#### 2.1.2 IValidation Global Exception Handler
- Create middleware: `ValidationExceptionHandlerMiddleware`
- Catches `ValidationException` from FluentValidation
- Returns consistent error response with validation details
- Applied before other middlewares

#### 2.1.3 Aspire Configuration
- Copy Aspire configs from reference project
- Apply to all templates: `appsettings.*.json`, `Program.cs` Aspire setup
- Ensures consistent observability/dashboard integration

#### 2.1.4 New Dispatcher (Not MediaTr)
- Custom lightweight dispatcher (already in VerticalSlice)
- Register in DI: `services.AddScoped<Dispatcher>`
- Usage: `dispatcher.ExecuteAsync(command/query)`
- Benefits: No external dependency bloat, explicit routing

#### 2.1.5 Unit Tests for Orders
- Test structure: `Tests/Core/Orders/V1/`
- Test CreateOrderCommand handler
- Test CompleteOrderCommand handler
- Test GetOrderStatusQuery handler
- Test validators: CreateOrderCommandValidator
- Use xUnit, Moq, FluentAssertions

#### 2.1.6 Remove MediaTr & Middleware
- Search all templates for `using MediatR`
- Replace with custom Dispatcher pattern
- Remove middleware folders (use vertical slices instead)

### 2.2 Templates to Update

| Template                       | Path                                               | Status                    |
| ------------------------------ | -------------------------------------------------- | ------------------------- |
| **Layered - CleanTemplate**    | `1.LayeredArchitecture/1. CleanTemplate/`          | ⏳ To Do                   |
| **Layered - With Data Access** | `1.LayeredArchitecture/2. TemplateWithDataAccess/` | ⏳ To Do                   |
| **Clean Architecture**         | `2.CleanArchitecture/`                             | ⏳ To Do                   |
| **Vertical Slice - Minimal**   | `3.VerticalSliceArchitecture/2.Minimal/`           | ✅ Reference (update docs) |

### 2.3 Implementation Steps

For **each template**:

1. **Add Core/Orders Feature**
   - Copy `Core/Orders/V1/` structure from reference
   - Includes: Commands, Queries, Models, Mappers, Database/Entities, Validators

2. **Add Dispatcher**
   - Copy `Shared/Dispatcher.cs` from reference
   - Register: `services.AddScoped<Dispatcher>`

3. **Add IValidation Global Handler**
   - Add `Middleware/ValidationExceptionHandlerMiddleware.cs`
   - Register in `Program.cs`

4. **Add Aspire Integration**
   - Update `appsettings.Development.json` with Aspire settings
   - Update `Program.cs` with Aspire service setup

5. **Add Orders Endpoints**
   - Copy `Api/Endpoints/V1/Orders/` from reference
   - Register endpoints in Program.cs

6. **Add Unit Tests**
   - Create `Tests/Core/Orders/V1/` directory
   - Tests for Commands, Queries, Validators

7. **Remove MediaTr**
   - Delete any MediatR packages and imports
   - Replace with Dispatcher

---

## Phase 3: React App - Complete Ordering Flow

### 3.1 Current State
- Pizza menu page with local cart state (PizzaMenuPage.tsx)
- SCSS theming (light/dark)
- ThemeSwitcher component integrated
- Placeholder hooks in src/api/hooks.ts

### 3.2 Ordering Flow Architecture

```
User Journey:
Search Pizza Menu
      ↓
Add to Cart (Preact Signals global state)
      ↓
Review Cart & Enter Customer Info (React Hook Form + Zod)
      ↓
Create Order (POST /api/v1/order)
      ↓
Get Order Tracking ID
      ↓
Track Order Status (Polling/Webhooks)
      ↓ (Optional: Store in Cookie)
Access Later: Name + Order Number
```

### 3.3 Implementation Details

#### 3.3.1 Global State (Preact Signals)
**File:** `src/store/cartStore.ts`

```typescript
import { signal } from '@preact/signals-react';

export interface CartItem {
  pizzaId: string;
  name: string;
  price: number;
  quantity: number;
}

export const cart = signal<CartItem[]>([]);
export const cartTotal = signal<number>(0);
export const customerInfo = signal<{
  name: string;
  email: string;
  phone: string;
} | null>(null);
export const currentOrder = signal<{
  id: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';
  createdAt: string;
} | null>(null);

export const addToCart = (item: CartItem) => { /* ... */ };
export const removeFromCart = (pizzaId: string) => { /* ... */ };
export const clearCart = () => { /* ... */ };
```

#### 3.3.2 Customer Info Form (React Hook Form + Zod)
**File:** `src/features/pizzas/components/CustomerInfoForm.tsx`

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const customerInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^\d{10}$/, 'Invalid phone number'),
});

type CustomerInfoFormData = z.infer<typeof customerInfoSchema>;

export const CustomerInfoForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CustomerInfoFormData>({
    resolver: zodResolver(customerInfoSchema),
  });

  const onSubmit = (data: CustomerInfoFormData) => {
    customerInfo.value = data;
    // Proceed to order creation
  };

  return (/* form JSX */);
};
```

#### 3.3.3 Order Creation & Tracking
**File:** `src/api/orderService.ts`

```typescript
import { apiClient } from './client-adapter';

export const createOrder = async (items: CartItem[], customerInfo: CustomerInfo) => {
  const response = await apiClient.post<{ id: string; status: string }>('/api/v1/order', {
    items,
    ...customerInfo,
  });
  return response.data;
};

export const getOrderStatus = async (orderId: string) => {
  const response = await apiClient.get(`/api/v1/order/${orderId}/status`);
  return response.data;
};

// Optional: Polling for status
export const pollOrderStatus = (orderId: string, interval = 3000) => {
  return setInterval(async () => {
    const status = await getOrderStatus(orderId);
    currentOrder.value = { ...currentOrder.value, status };
    if (status === 'completed') clearInterval(interval);
  }, interval);
};
```

#### 3.3.4 Order Tracking with Cookie
**File:** `src/features/pizzas/utils/orderCookie.ts`

```typescript
import { customerInfo, currentOrder } from '@/store/cartStore';

const COOKIE_NAME = 'last_order_tracking';

export const saveOrderToCookie = () => {
  if (!currentOrder.value || !customerInfo.value) return;
  
  const orderData = JSON.stringify({
    orderId: currentOrder.value.id,
    customerName: customerInfo.value.name,
    createdAt: currentOrder.value.createdAt,
  });
  
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(orderData)}; max-age=${30 * 24 * 60 * 60}`; // 30 days
};

export const loadOrderFromCookie = () => {
  const match = document.cookie.match(`${COOKIE_NAME}=([^;]+)`);
  return match ? JSON.parse(decodeURIComponent(match[1])) : null;
};
```

#### 3.3.5 Checkout Page
**File:** `src/features/pizzas/pages/CheckoutPage.tsx`

- Display: Order summary, customer info form, payment (mock)
- Actions: Create order, show confirmation, navigate to tracking
- Error handling: Sonner toasts for validation/API errors

#### 3.3.6 Order Tracking Page
**File:** `src/features/pizzas/pages/OrderTrackingPage.tsx`

- Display: Order timeline (pending → confirmed → preparing → ready → completed)
- Input: Order ID (from URL param) OR Name + Order Number (alternative access)
- Status polling: Fetch status every 3 seconds, stop when completed
- Share: Generate shareable tracking link

### 3.4 Updated PizzaMenuPage.tsx

**Changes:**
- Integrate Preact Signals for cart state (replace local useState)
- Add "Clear Cart" button
- Add "Checkout" button → navigates to CheckoutPage
- Display cart count badge
- Use existing SCSS theme

### 3.5 Navigation Structure

```
/
  /pizzas (PizzaMenuPage with cart sidebar)
  /checkout (CheckoutPage with customer form)
  /order/:orderId (OrderTrackingPage)
  /order/find (OrderTrackingPage with manual lookup)
```

---

## Phase 4: Angular Template

### 4.1 Architecture Pattern

**Stack:**
- Angular 18+ (latest stable)
- Standalone components
- Signals (built-in Angular signals, not Preact)
- HttpClient with interceptors
- Reactive Forms with custom validators
- Ngx-toastr for notifications
- SCSS for styling
- OpenAPI generator CLI (not NSwag - Java-based, more Angular-friendly)

### 4.2 Project Structure

```
frontend/Angular/template/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts
│   │   │   │   ├── order.service.ts
│   │   │   │   ├── pizza.service.ts
│   │   │   │   └── notification.service.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── error.interceptor.ts
│   │   │   │   └── auth.interceptor.ts (optional)
│   │   │   └── guards/ (optional)
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   ├── footer/
│   │   │   │   └── theme-switcher/
│   │   │   ├── directives/
│   │   │   ├── pipes/
│   │   │   └── utils/
│   │   ├── features/
│   │   │   ├── pizzas/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── menu.component.ts
│   │   │   │   │   ├── checkout.component.ts
│   │   │   │   │   └── tracking.component.ts
│   │   │   │   ├── components/
│   │   │   │   │   ├── pizza-card/
│   │   │   │   │   ├── cart-sidebar/
│   │   │   │   │   └── customer-form/
│   │   │   │   └── models/
│   │   ├── app.component.ts (root standalone)
│   │   └── app.routes.ts
│   ├── styles/
│   │   ├── globals.scss
│   │   ├── variables.scss
│   │   └── themes.scss
│   └── main.ts (bootstrapApplication)
├── clients/
│   └── generation/
│       └── openapi-generator-angular.json (config)
└── package.json
```

### 4.3 Key Features to Implement

#### 4.3.1 Standalone Components
All components must be standalone with explicit imports:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pizza-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `...`,
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  // ...
}
```

#### 4.3.2 Global Error Handling

**Interceptor:** `core/interceptors/error.interceptor.ts`

```typescript
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.error(error.error?.message || 'An error occurred');
        return throwError(() => error);
      }),
    );
  }
}
```

#### 4.3.3 Notifications (Ngx-Toastr)

**Service:** `core/services/notification.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private toastr: NgxToastrService) {}

  success(message: string): void {
    this.toastr.success(message);
  }

  error(message: string): void {
    this.toastr.error(message);
  }

  info(message: string): void {
    this.toastr.info(message);
  }
}
```

#### 4.3.4 Theme System

**Component:** `shared/components/theme-switcher/theme-switcher.component.ts`

```typescript
@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  template: `
    <button (click)="toggleTheme()" class="theme-toggle">
      {{ isDark() ? '☀️' : '🌙' }}
    </button>
  `,
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent {
  isDark = signal(this.getInitialTheme());

  constructor(private document: Document) {}

  toggleTheme(): void {
    this.isDark.set(!this.isDark());
    const theme = this.isDark() ? 'dark-theme' : 'light-theme';
    this.document.documentElement.classList.toggle('dark-theme', this.isDark());
    localStorage.setItem('theme', theme);
  }

  private getInitialTheme(): boolean {
    return localStorage.getItem('theme') === 'dark-theme';
  }
}
```

#### 4.3.5 OpenAPI Client Generation

**Config:** `clients/generation/openapi-generator-angular.json`

```json
{
  "npmVersion": "6.0.0",
  "inputSpec": "https://localhost:7160/openapi/v1.json",
  "outputDir": "../generated/angular",
  "generatorName": "typescript-angular",
  "modelPackage": "models",
  "apiPackage": "api",
  "packageJson": {
    "name": "@generated/pizza-api",
    "version": "1.0.0"
  }
}
```

**Generation:**
```bash
npm install -g @openapitools/openapi-generator-cli
openapi-generator-cli generate -c clients/generation/openapi-generator-angular.json
```

#### 4.3.6 Pizza Ordering Flow (Same as React)

**Pages:**
1. **MenuComponent** - Display pizzas, cart sidebar, add to cart
2. **CheckoutComponent** - Customer form (Reactive Forms), review order
3. **TrackingComponent** - Order status with polling

**State Management:** Angular Signals (built-in)

```typescript
export const pizzaStore = signal<Pizza[]>([]);
export const cartItems = signal<CartItem[]>([]);
export const currentOrder = signal<Order | null>(null);
```

---

## Phase 5: Documentation Updates

### 5.1 Files to Create/Update

| File                          | Purpose                                        |
| ----------------------------- | ---------------------------------------------- |
| `README.md`                   | Project overview, structure, stack explanation |
| `ARCHITECTURE.md`             | Visual architecture diagrams, data flow        |
| `docs/CQRSLITE_PATTERN.md`    | Explanation of CQRSLite, Dispatcher, usage     |
| `docs/OPENAPI_GENERATION.md`  | How to generate clients (React, Angular)       |
| `docs/REACT_ORDERING_FLOW.md` | React ordering implementation guide            |
| `docs/ANGULAR_TEMPLATE.md`    | Angular standalone components, structure       |
| `docs/TESTING.md`             | Unit test patterns, examples                   |
| `docs/DEPLOYMENT.md`          | Build, run, deploy instructions                |

### 5.2 Key Documentation Points

- **CQRS & Dispatcher:** Why custom dispatcher over MediaTr
- **Aspire:** Observability, dashboard, health checks
- **Global Error Handling:** Validation middleware flow
- **OpenAPI Generation:** Commands for React and Angular
- **Pizza Ordering:** End-to-end flow (backend endpoints + frontend integration)
- **Testing:** xUnit patterns, test examples
- **Code Quality:** SOLID principles applied, DRY patterns

---

## Execution Order

**Critical Path:**

1. ✅ Phase 1: Generate OpenAPI Client (enables frontend integration)
2. ✅ Phase 2: Update .NET Templates (reference: VerticalSlice)
   - 2a: LayeredArchitecture templates
   - 2b: CleanArchitecture template
   - 2c: VerticalSlice (document as reference)
3. ✅ Phase 3: React App Ordering Flow
4. ✅ Phase 4: Angular Template
5. ✅ Phase 5: Documentation

---

## Success Criteria

### .NET Templates
- ✅ All templates have Orders feature (Create, Complete, GetStatus)
- ✅ CQRSLite pattern applied consistently
- ✅ Dispatcher (no MediaTr)
- ✅ IValidation global exception handler
- ✅ Aspire configured
- ✅ Unit tests for Orders (80%+ coverage)
- ✅ No remaining MediaTr/middleware imports

### React App
- ✅ Pizza menu → cart → checkout → order creation flow works
- ✅ React Hook Form + Zod validation on checkout
- ✅ Preact Signals for global cart state
- ✅ Order tracking page with polling
- ✅ Cookie-based order recovery
- ✅ OpenAPI client integration
- ✅ Error handling with Sonner toasts

### Angular Template
- ✅ Standalone components architecture
- ✅ Signals-based state management
- ✅ Same ordering flow as React
- ✅ Global error interceptor + toastr notifications
- ✅ Theme switcher (light/dark)
- ✅ OpenAPI client generation working
- ✅ SCSS styling consistent

### Documentation
- ✅ All patterns explained
- ✅ Architecture diagrams
- ✅ Generation instructions
- ✅ Code examples for each pattern
- ✅ Testing examples
- ✅ SOLID principles applied throughout

---

## Potential Risks & Mitigations

| Risk                                  | Mitigation                                              |
| ------------------------------------- | ------------------------------------------------------- |
| Breaking changes in existing projects | Version each template carefully, test thoroughly        |
| OpenAPI generation fails              | Ensure backend running, cert trust, local spec fallback |
| Cross-browser theme issues            | Test on Chrome, Firefox, Safari, Edge                   |
| Order tracking race conditions        | Implement proper cancellation tokens, debounce polling  |
| Angular setup complexity              | Use CLI generators, follow official patterns            |
| Performance issues                    | Lazy load routes, optimize change detection, signals    |

---

## Notes

- This is a comprehensive modernization effort spanning backend, frontend, and tooling
- All changes should maintain backward compatibility where possible
- Testing is critical - don't skip unit tests
- Documentation must be updated alongside code
- Code review recommended for each phase
- Follow SOLID principles throughout (Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion)
