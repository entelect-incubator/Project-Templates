# Feature Architecture Documentation

This document outlines the clean separation of concerns between the Pizza and Order features.

## 🏗️ Architecture Overview

The original monolithic `pizzas` feature has been split into two focused, maintainable features:

### 🍕 Pizza Feature
**Responsibility:** Pizza catalog and menu display
**Location:** `src/features/pizza/`

### 📦 Order Feature  
**Responsibility:** Shopping cart, checkout process, and order management
**Location:** `src/features/order/`

## 📁 Feature Structure

### Pizza Feature
```
src/features/pizza/
├── components/
│   ├── PizzaGrid.tsx                 # Grid layout for pizza display
│   ├── PizzaHeader.tsx               # Menu page header
│   ├── PizzaMenuLoading.tsx          # Loading states
│   ├── PizzaCardFooter.tsx           # Pizza card actions
│   └── pizza/                        # Pizza-specific sub-components
├── hooks/
│   └── index.ts                      # usePizzas, usePizza hooks
├── pages/
│   ├── PizzaMenuPage.tsx             # Main pizza menu page
│   └── PizzaMenuPage.scss            # Page styles
├── types/
│   └── index.ts                      # Pizza, PizzaCategory, PizzaFilters
└── index.ts                          # Public API exports
```

### Order Feature
```
src/features/order/
├── components/
│   ├── # Cart Management
│   ├── ShoppingCartSidebar.tsx       # Cart sidebar
│   ├── ShoppingCartItem.tsx          # Individual cart items
│   ├── EmptyCart.tsx                 # Empty cart state
│   ├── # Checkout Process  
│   ├── CheckoutSteps.tsx             # Multi-step checkout UI
│   ├── CheckoutActions.tsx           # Checkout navigation
│   ├── CustomerInfoStep.tsx          # Customer info step
│   ├── CustomerInfoForm.tsx          # Customer form component
│   ├── OrderReviewStep.tsx           # Order review step
│   ├── ModeSelection.tsx             # Pickup/delivery selection
│   ├── # Order Management
│   ├── OrderSummaryCard.tsx          # Order summary display
│   ├── OrderForm.tsx                 # Order creation form
│   ├── OrderLookupForms.tsx          # Order lookup UI
│   ├── CurrentStatus.tsx             # Current order status
│   ├── StatusTimeline.tsx            # Order status timeline
│   ├── CompletionMessage.tsx         # Order completion
│   └── ShareLink.tsx                 # Order sharing
├── hooks/
│   └── index.ts                      # useCreateOrder, useOrderTracking
├── pages/
│   ├── CheckoutPage.tsx              # Checkout flow page
│   ├── CheckoutPage.scss             # Checkout styles
│   ├── OrderTrackingPage.tsx         # Order tracking page
│   └── OrderTrackingPage.scss        # Tracking styles
├── types/
│   └── index.ts                      # Order, Cart, CustomerInfo types
├── utils/
│   ├── orderHelpers.ts               # Order status, timeline utils
│   └── orderCookie.ts                # Order persistence
├── validation/
│   └── index.ts                      # Zod schemas for validation
└── index.ts                          # Public API exports
```

## 🔄 Data Flow

### Pizza Feature Flow
1. **Menu Display:** `PizzaMenuPage` → `usePizzas()` → `PizzaGrid` → Pizza Cards
2. **Pizza Selection:** User clicks pizza → Event passed to parent (Order feature)

### Order Feature Flow
1. **Add to Cart:** Pizza selected → `cartActions.addItem()` → Cart updated
2. **Checkout:** `CheckoutPage` → Multi-step flow → Order creation
3. **Order Tracking:** `OrderTrackingPage` → `useOrderTracking()` → Status updates

## 🔌 Integration Points

### Cross-Feature Communication
- **Pizza → Order:** Pizza selection events passed via props/callbacks
- **Order → Pizza:** Cart state shared via global store
- **Shared Types:** Pizza interface used in both features via imports

### Import Patterns
```typescript
// ✅ Clean imports
import { Pizza } from '@/features/pizza/types';
import { CartItem, Order } from '@/features/order/types';
import { usePizzas } from '@/features/pizza';
import { useCreateOrder } from '@/features/order';

// ❌ Avoid cross-feature component imports
// Don't import order components in pizza feature
// Don't import pizza components in order feature (except types)
```

## 🎯 Benefits of This Architecture

### 1. **Separation of Concerns**
- Pizza feature only handles pizza catalog
- Order feature only handles cart/orders
- Clear responsibility boundaries

### 2. **Maintainability**
- Easier to locate and modify functionality
- Reduced coupling between features
- Independent testing strategies

### 3. **Scalability**
- Features can evolve independently
- New pizza features don't affect orders
- New order features don't affect pizzas

### 4. **Team Collaboration**
- Different teams can work on different features
- Reduced merge conflicts
- Clear ownership boundaries

## 🧪 Testing Strategy

### Pizza Feature Testing
- Focus on pizza display logic
- Menu filtering and search
- Pizza data transformation
- API integration tests

### Order Feature Testing  
- Cart management operations
- Checkout flow validation
- Order status tracking
- Payment integration tests

## 🚀 Migration Guide

### For Existing Code
1. **Update imports** from old `pizzas` feature to new split features
2. **Review component dependencies** to ensure proper separation
3. **Update routing** to use new feature structure
4. **Test integration points** between features

### For New Development
1. **Pizza changes:** Add to `src/features/pizza/`
2. **Order changes:** Add to `src/features/order/`
3. **Shared utilities:** Consider creating a shared utilities feature
4. **Cross-feature needs:** Use well-defined interfaces and events

## 📋 Next Steps

1. **Update routing configuration** to use new page components
2. **Review and update imports** throughout the application
3. **Update tests** to reflect new structure
4. **Consider state management** improvements with cleaner separation
5. **Document API contracts** between features

---

*This architecture promotes clean code principles and makes the codebase more maintainable and scalable.*