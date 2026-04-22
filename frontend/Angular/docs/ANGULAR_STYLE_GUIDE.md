# Angular Style Guide

This document outlines the coding standards and best practices for Angular development in this project, aligned with the official Angular style guide.

## Official Resources

- **Angular Style Guide**: [angular.dev/style-guide](https://angular.dev/style-guide)
- **Angular AI Guide**: [angular.dev/ai](https://angular.dev/ai)
- **SOLID Principles in Angular**: [angular.love/angular-and-solid-principles](https://angular.love/angular-and-solid-principles)

---

## File Structure & Organization

### Single Responsibility Principle

Each file should have a **single responsibility**:

```
components/
  hero/
    hero.component.ts        # Component orchestration (ONLY)
    hero.component.html      # Template (ONLY)
    hero.component.scss      # Styles (ONLY)
    hero.component.spec.ts   # Tests (ONLY)
```

**❌ Don't:**
```typescript
@Component({
  template: `<div>...</div>`,  // Inline template
  styles: [`...`]              // Inline styles
})
```

**✅ Do:**
```typescript
@Component({
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
```

### Naming Conventions

| Type       | Convention                | Example                           |
| ---------- | ------------------------- | --------------------------------- |
| Components | kebab-case                | `hero-section.component.ts`       |
| Services   | kebab-case + `.service`   | `toast-banner.service.ts`         |
| Directives | kebab-case + `.directive` | `lazy-load.directive.ts`          |
| Pipes      | kebab-case + `.pipe`      | `currency-format.pipe.ts`         |
| Guards     | kebab-case + `.guard`     | `auth.guard.ts`                   |
| Interfaces | PascalCase                | `HeroConfig`, `ToastOptions`      |
| Constants  | UPPER_SNAKE_CASE          | `DEFAULT_TIMEOUT`, `API_BASE_URL` |

---

## Component Architecture

### SOLID Principles

#### Single Responsibility
Components should **orchestrate**, not implement everything:

```typescript
// ❌ Don't: Component doing too much
@Component({...})
export class PizzaListComponent {
  pizzas = [];
  
  async loadPizzas() { /* HTTP logic */ }
  filterPizzas() { /* Filter logic */ }
  sortPizzas() { /* Sort logic */ }
  formatPrice() { /* Formatting */ }
}

// ✅ Do: Component orchestrates services
@Component({...})
export class PizzaListComponent {
  private readonly pizzaService = inject(PizzaService);
  private readonly filterService = inject(FilterService);
  
  pizzas = this.pizzaService.pizzas;
  
  onFilter(criteria: FilterCriteria): void {
    this.filterService.apply(criteria);
  }
}
```

#### Open/Closed Principle
Use `@Input()` for configuration, extend without modification:

```typescript
@Component({...})
export class HeroComponent {
  @Input() videoSource = '/videos/default.mp4';
  @Input() brandName = 'Default Brand';
  @Input() ctaText = 'Get Started';
}
```

#### Dependency Inversion
Depend on abstractions (interfaces/tokens), not concrete implementations:

```typescript
// Token definition
export const TOAST_SERVICE = new InjectionToken<ToastService>('ToastService');

// Component uses abstraction
@Component({...})
export class AppComponent {
  private readonly toastService = inject(TOAST_SERVICE);
}
```

---

## Signals & Reactivity

### Prefer Signals over BehaviorSubjects

```typescript
// ❌ Old pattern
private readonly _items = new BehaviorSubject<Item[]>([]);
items$ = this._items.asObservable();

// ✅ Modern Angular
private readonly _items = signal<Item[]>([]);
readonly items = this._items.asReadonly();
```

### Use Computed for Derived State

```typescript
private readonly cartItems = signal<CartItem[]>([]);

// Computed values update automatically
readonly totalItems = computed(() => 
  this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
);

readonly totalPrice = computed(() =>
  this.cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0)
);
```

### Use effect() Sparingly

```typescript
// Only for side effects (logging, sync with external systems)
effect(() => {
  console.log('Cart updated:', this.cartItems());
  localStorage.setItem('cart', JSON.stringify(this.cartItems()));
});
```

---

## Change Detection

### Always Use OnPush

```typescript
@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,  // Always!
})
export class PizzaCardComponent {}
```

### Immutable Updates

```typescript
// ❌ Don't mutate
this.items().push(newItem);

// ✅ Create new array
this.items.update(items => [...items, newItem]);
```

---

## Templates

### Use Angular Control Flow

```html
<!-- ✅ Modern syntax -->
@if (isLoading()) {
  <app-spinner />
} @else if (error()) {
  <app-error-message [error]="error()" />
} @else {
  <app-content [data]="data()" />
}

@for (item of items(); track item.id) {
  <app-item [data]="item" />
} @empty {
  <p>No items found</p>
}
```

### Accessibility First

```html
<!-- Always include ARIA attributes -->
<button
  type="button"
  (click)="addToCart()"
  [attr.aria-label]="'Add ' + pizza.name + ' to cart'"
  [attr.aria-disabled]="isDisabled()"
>
  Add to Cart
</button>
```

---

## Services

### Injectable at Root Level

```typescript
@Injectable({
  providedIn: 'root',  // Singleton, tree-shakable
})
export class CartService {}
```

### Use inject() over Constructor

```typescript
// ❌ Old pattern
constructor(private cartService: CartService) {}

// ✅ Modern pattern
private readonly cartService = inject(CartService);
```

---

## Styling

### Component Styles with Tailwind

Use `@apply` in component SCSS for reusability:

```scss
// hero.component.scss
:host {
  @apply block;
}

.hero-section {
  @apply relative min-h-screen;
  @apply flex items-center justify-center;
}

.hero-cta {
  @apply px-8 py-4 rounded-full;
  @apply bg-primary text-white;
  @apply font-bold text-lg;
  @apply transition-all duration-300;
  
  &:hover {
    @apply scale-105 shadow-lg;
  }
  
  &:focus-visible {
    @apply outline-2 outline-offset-2 outline-primary;
  }
}
```

### CSS Custom Properties for Theming

```scss
.card {
  background-color: var(--color-surface);
  border-color: var(--color-border);
  color: var(--color-text);
}
```

---

## Testing

### Component Testing

```typescript
describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
  });

  it('should display brand name', () => {
    component.brandName = 'Test Brand';
    fixture.detectChanges();
    
    const element = fixture.nativeElement.querySelector('.brand-name');
    expect(element.textContent).toContain('Test Brand');
  });
});
```

### Service Testing

```typescript
describe('ToastBannerService', () => {
  let service: ToastBannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastBannerService);
  });

  it('should add toast to list', () => {
    service.success('Test message');
    expect(service.toasts().length).toBe(1);
  });
});
```

---

## Documentation

### Component Documentation

```typescript
/**
 * Hero Section Component
 * 
 * Displays the main hero section with video background,
 * brand information, and call-to-action button.
 * 
 * @example
 * ```html
 * <app-hero
 *   [videoSource]="'/videos/custom.mp4'"
 *   [brandName]="'My Brand'"
 *   [ctaText]="'Shop Now'"
 * />
 * ```
 * 
 * @see https://angular.dev/style-guide
 */
@Component({...})
export class HeroComponent {}
```

---

## Quick Reference

### Imports Checklist

- [ ] `ChangeDetectionStrategy` for OnPush
- [ ] `inject` for dependency injection
- [ ] `signal`, `computed`, `effect` for reactivity
- [ ] `input`, `output` for component I/O (Angular 17.1+)

### Component Checklist

- [ ] Separate HTML file
- [ ] Separate SCSS file
- [ ] `changeDetection: ChangeDetectionStrategy.OnPush`
- [ ] `standalone: true`
- [ ] ARIA attributes for accessibility
- [ ] JSDoc comments

### Service Checklist

- [ ] `providedIn: 'root'`
- [ ] Signal-based state
- [ ] Pure functions where possible
- [ ] Proper error handling

---

## Related Documentation

- [Architecture Overview](./ARCHITECTURE_OVERVIEW.md)
- [Coding Standards](../CODING_STANDARDS.md)
- [Aspire Setup](./ASPIRE_SETUP.md)
- [AI Guide](./AI_GUIDE.md)
