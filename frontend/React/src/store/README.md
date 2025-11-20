# State Management Guide

## Overview

This folder contains the global state management for the pizza ordering application. The state is organized into separate stores following the **separation of concerns** principle.

## Store Structure

```
store/
├── README.md (this file)
├── cartStore.ts       # 🛒 Shopping cart state
├── customerStore.ts   # 👤 Customer information
├── orderStore.ts      # 📦 Order status & tracking
├── types.ts           # 📝 Shared TypeScript interfaces
└── index.ts           # 🔗 Re-exports for convenience
```

## Why Separate Stores?

### ✅ Benefits of Separation

1. **Clear Responsibility** - Each store manages one domain
2. **Easier Testing** - Test cart logic without order logic
3. **Better Scalability** - Add new stores without affecting existing ones
4. **Simpler Imports** - Import only what you need
5. **Reduced Coupling** - Stores don't depend on each other
6. **Team Collaboration** - Different devs can work on different stores

### ❌ Problems with Mixed Stores

```typescript
// ❌ BAD - Multiple concerns in one file
export const cartItems = signal(...);
export const customerInfo = signal(...);
export const currentOrder = signal(...);
export const isOrderLoading = signal(...);
// Hard to reason about, difficult to test
```

## Store Descriptions

### 🛒 cartStore.ts
**Responsibility**: Manage shopping cart items and calculations

**Exports**:
- `cartItems` - Array of items in cart
- `cartTotal` - Computed total price
- `cartItemCount` - Computed item count
- `isCartEmpty` - Computed empty state
- `addToCart()`, `removeFromCart()`, `updateCartItemQuantity()`, `clearCart()`

**When to Use**:
```typescript
import { cartItems, addToCart, cartTotal } from '@/store/cartStore';

// Components concerned with cart display/modification
```

### 👤 customerStore.ts
**Responsibility**: Manage customer/user information

**Exports**:
- `customerInfo` - Customer details (name, email, phone)
- `setCustomerInfo()`, `clearCustomerInfo()`

**When to Use**:
```typescript
import { customerInfo, setCustomerInfo } from '@/store/customerStore';

// Checkout form components
// Customer profile components
```

### 📦 orderStore.ts
**Responsibility**: Manage order creation, status, and tracking

**Exports**:
- `currentOrder` - Current/last order
- `isOrderLoading` - Loading state
- `orderError` - Error messages
- `isOrderCompleted` - Computed completion state
- `setCurrentOrder()`, `updateOrderStatus()`, `setOrderError()`, etc.

**When to Use**:
```typescript
import { currentOrder, isOrderLoading } from '@/store/orderStore';

// Order confirmation components
// Order tracking components
// Order status display
```

## Usage Examples

### ✅ Correct: Import only what you need

```typescript
// Cart component
import { cartItems, addToCart, cartTotal } from '@/store/cartStore';

function CartSummary() {
  return (
    <div>
      <p>Total: ${cartTotal.value}</p>
      <button onClick={() => addToCart(item)}>Add</button>
    </div>
  );
}
```

### ✅ Correct: Separate concerns

```typescript
// Checkout component - uses customer and order stores
import { customerInfo, setCustomerInfo } from '@/store/customerStore';
import { setCurrentOrder, isOrderLoading } from '@/store/orderStore';

function Checkout() {
  const handleSubmit = () => {
    setCustomerInfo(formData);
    // Then create order
    setCurrentOrder(newOrder);
  };
}
```

### ❌ Avoid: Mixing unrelated stores

```typescript
// ❌ BAD - Don't import order stuff in cart component
import { currentOrder } from '@/store/orderStore';
import { cartItems } from '@/store/cartStore';

function CartItem() {
  // Cart component shouldn't know about orders
}
```

## Why Preact Signals?

### ✅ Advantages of Signals

1. **Fine-grained Reactivity** - Only re-render affected components
2. **Zero Dependencies** - No provider wrapper needed
3. **Simple API** - Just `.value` to read/write
4. **Excellent Performance** - Skips React's reconciliation
5. **Framework Agnostic** - Works with any framework
6. **Computed Values** - Automatic memoization

### Code Example

```typescript
// Simple and straightforward
import { signal, computed } from '@preact/signals-react';

export const count = signal(0);
export const doubled = computed(() => count.value * 2);

// Usage in component
function Counter() {
  return (
    <div>
      <p>Count: {count.value}</p>
      <p>Doubled: {doubled.value}</p>
      <button onClick={() => count.value++}>+</button>
    </div>
  );
}
```

## Alternatives Comparison

### 1. **Zustand** 🎯

**Pros**:
- Small bundle size (~2.7KB)
- Hooks-based API familiar to React devs
- Great documentation
- Middleware support
- Time-travel debugging

**Cons**:
- Requires hooks in functional components
- Less fine-grained reactivity than signals
- Needs to handle re-renders carefully

**When to Use**: Medium-sized apps with complex middleware needs

```typescript
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  return <button onClick={increment}>{count}</button>;
}
```

### 2. **Jotai** ⚛️

**Pros**:
- Primitive atoms (bottom-up)
- Excellent TypeScript support
- Async atoms built-in
- React 18 Suspense ready
- Small bundle size (~3.1KB)

**Cons**:
- Requires Provider wrapper
- Steeper learning curve
- Less mature than Redux

**When to Use**: Apps needing fine-grained reactivity with Suspense

```typescript
import { atom, useAtom } from 'jotai';

export const countAtom = atom(0);

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### 3. **Recoil** 🔬

**Pros**:
- Atomic, derived state
- Excellent DevTools
- Concurrent features support
- Suspense support

**Cons**:
- Requires Provider wrapper
- Still experimental from Facebook
- Larger bundle size

**When to Use**: Complex apps needing advanced React features

### 4. **Redux** 🏪

**Pros**:
- Mature and battle-tested
- Massive ecosystem
- Excellent DevTools
- Predictable state updates

**Cons**:
- Boilerplate-heavy
- Steep learning curve
- Overkill for small apps
- Large bundle size (~12KB)

**When to Use**: Large teams, complex apps, heavy instrumentation needs

### 5. **Context API + useReducer** 📦

**Pros**:
- Built into React
- No external dependencies
- Good for simple state

**Cons**:
- Forces provider wrapper
- Can cause unnecessary re-renders
- Doesn't scale well
- Manual performance optimization

**When to Use**: Very simple state only

### 6. **Preact Signals** ⚡ (Our Choice)

**Pros**:
- **Simplest API** - Just `.value`
- **No Provider needed** - Works globally
- **Best Performance** - Fine-grained reactivity
- **Smallest bundle size** - ~2KB
- **Zero learning curve** - Familiar pattern

**Cons**:
- Less ecosystem than Redux
- Newer technology
- Fewer DevTools options

**When to Use**: Apps prioritizing simplicity and performance

## Comparison Table

| Feature        | Signals | Zustand | Jotai | Redux | Context |
| -------------- | ------- | ------- | ----- | ----- | ------- |
| Bundle Size    | ⚡⚡⚡     | ⚡⚡      | ⚡⚡    | 💥     | ✅       |
| Learning Curve | ⚡⚡⚡     | ⚡⚡      | ⚡     | 💥     | ⚡⚡      |
| Performance    | ⚡⚡⚡     | ⚡⚡      | ⚡⚡⚡   | ⚡     | 💥       |
| Ecosystem      | ⚡       | ⚡⚡      | ⚡⚡    | ⚡⚡⚡   | ✅       |
| DevTools       | ⚡       | ⚡⚡      | ⚡     | ⚡⚡⚡   | ⚡       |
| No Provider    | ✅       | ✅       | ❌     | ❌     | ❌       |
| Async Support  | ⚡       | ⚡⚡      | ⚡⚡⚡   | ⚡⚡    | ⚡       |

Legend: ⚡ Good | ⚡⚡ Very Good | ⚡⚡⚡ Excellent | ✅ Built-in | 💥 Not great

## Why We Chose Signals

For this pizza ordering app:

1. **Simplicity** - Team can get productive immediately
2. **Performance** - No unnecessary re-renders in product lists
3. **Small Bundle** - Important for first-class mobile experience
4. **No Setup** - No providers, no hooks complexity
5. **Clear State Updates** - Debugging is straightforward
6. **Perfect for Small-Medium Apps** - Our use case

## Migration Strategy (If Needed)

### To Zustand:

```typescript
// Before: Signals
export const cartItems = signal<CartItem[]>([]);
export const addToCart = (item: CartItem) => { ... };

// After: Zustand
export const useCartStore = create((set) => ({
  cartItems: [],
  addToCart: (item) => set((state) => ({
    cartItems: [...state.cartItems, item],
  })),
}));

// Components need minimal change
// const { cartItems, addToCart } = useCartStore();
```

### To Jotai:

```typescript
// Before: Signals
export const cartItems = signal<CartItem[]>([]);

// After: Jotai
export const cartItemsAtom = atom<CartItem[]>([]);

// In components:
// const [cartItems, setCartItems] = useAtom(cartItemsAtom);
```

## Best Practices

### ✅ Do This

1. **Keep stores focused** - One responsibility per store
2. **Export types alongside signals** - For better TypeScript support
3. **Use computed for derived state** - Automatic memoization
4. **Document store responsibility** - Clear comments at top
5. **Group related functions** - Organize by feature/domain
6. **Use meaningful names** - `cartItems` not `items`

### ❌ Don't Do This

1. **Don't create store dependencies** - Use composition in components
2. **Don't access unrelated stores** - Import only what needed
3. **Don't mutate signal arrays directly** - Reassign: `signal.value = [...]`
4. **Don't mix stores** - One responsibility per file
5. **Don't create computed in components** - Create in store instead
6. **Don't over-compute** - Only compute when needed

## Adding New Stores

### Template

```typescript
/**
 * [Domain Name] State Management
 *
 * Manages:
 * - [What this store manages]
 */

import { signal, computed } from '@preact/signals-react';

// ============================================================================
// Type Definitions
// ============================================================================

export interface [YourType] {
  // Define structure
}

// ============================================================================
// Signals - Global State
// ============================================================================

export const [stateSignal] = signal<[Type]>([initialValue]);

// ============================================================================
// Computed Values
// ============================================================================

export const [derivedValue] = computed(() => {
  // Derive from signals
});

// ============================================================================
// Operations
// ============================================================================

/**
 * Operation description
 */
export const [operation] = ([params]): void => {
  [stateSignal].value = newValue;
};
```

## Testing Stores

```typescript
import { cartItems, addToCart, clearCart } from '@/store/cartStore';

describe('cartStore', () => {
  beforeEach(() => clearCart());

  it('should add item to cart', () => {
    addToCart({ pizzaId: '1', pizzaName: 'Margherita', price: 10, quantity: 1 });
    expect(cartItems.value).toHaveLength(1);
  });

  it('should calculate total correctly', () => {
    addToCart({ pizzaId: '1', pizzaName: 'Margherita', price: 10, quantity: 2 });
    expect(cartTotal.value).toBe(20);
  });
});
```

## Resources

- [Preact Signals Docs](https://preactjs.com/guide/v10/signals/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Jotai Docs](https://jotai.org/)
- [Redux Official](https://redux.js.org/)

## Summary

| Goal               | Solution        | Store                                 |
| ------------------ | --------------- | ------------------------------------- |
| Add/remove pizzas  | `cartStore`     | `addToCart()`, `removeFromCart()`     |
| Get customer info  | `customerStore` | `customerInfo`, `setCustomerInfo()`   |
| Track order status | `orderStore`    | `currentOrder`, `updateOrderStatus()` |

---

**Key Principle**: Each store has one job. Do it well. Import only what you need.
