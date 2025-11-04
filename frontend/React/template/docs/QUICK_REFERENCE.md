# 📋 Quick Reference -  React 19.2

## 🚀 Getting Started

```bash
# Install (if needed)
npm install --legacy-peer-deps

# Development
npm run dev                 # Start dev server on :5173

# Production
npm run build              # Build for production
npm run preview            # Preview production locally

# Quality Checks
npm run type-check         # TypeScript validation
npm run lint              # ESLint check
npm run format            # Prettier formatting

# Testing
npm run test              # Unit tests (Vitest)
npm run test:watch       # Watch mode
npm run test:e2e         # E2E tests (Playwright)

# API Integration
npm run generate:client   # Generate TypeScript client from .NET OpenAPI
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── atoms/           # Button, Input, Badge (base components)
│   ├── molecules/       # Pagination, Form, Card (composed atoms)
│   └── organisms/       # Header, Sidebar (page sections)
├── features/            # Feature-based code (Todos, Users)
├── api/                # API client & hooks
├── hooks/              # Custom hooks (useAsync, useDebouncedSearch)
├── config/
│   └── settings.ts     # All configuration constants
├── styles/
│   └── globals.scss    # Global variables, mixins, base styles
└── types/              # Shared TypeScript interfaces
```

## ⚙️ Configuration

All settings in `src/config/settings.ts`:

```typescript
import { CONFIG } from '@/config/settings'

CONFIG.PAGINATION.DEFAULT_PAGE_SIZE      // 10
CONFIG.SEARCH.DEBOUNCE_DELAY             // 300ms
CONFIG.QUERY_CONFIG.STALE_TIME           // 1min
CONFIG.API.BASE_URL                      // http://localhost:5000
CONFIG.FEATURE_FLAGS.DEBUG_MODE          // false in prod
```

## 🎨 Using Components

### Atoms (Base Components)

```typescript
import { Button, Input } from '@/components/atoms'

// Button variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Delete</Button>
<Button variant="success">Save</Button>
<Button variant="warning">Warning</Button>
<Button variant="ghost">Cancel</Button>

// Button sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Button states
<Button isLoading loadingContent="Saving...">Save</Button>
<Button leftIcon={<SaveIcon />}>Save</Button>
<Button rightIcon={<ArrowIcon />}>Next</Button>
<Button fullWidth>Full Width</Button>

// Input field
<Input
  label="Username"
  placeholder="Enter your username"
  error={errors.username}
  helperText="Min 3 characters"
  required
/>

<Input
  label="Email"
  type="email"
  leftIcon={<EmailIcon />}
  error={emailError}
/>
```

### Molecules (Composed Components)

```typescript
import { Pagination } from '@/components/molecules'

<Pagination
  currentPage={page}
  totalPages={totalPages}
  isLoading={isLoading}
  onChange={(newPage) => setPage(newPage)}
/>
```

## 📡 API Integration

### 1. Generate Client from Backend

```bash
# Backend OpenAPI endpoint: http://localhost:5000/openapi/v1.json
npm run generate:client

# Creates:
# src/api/generated/client.ts     - Full TypeScript client
# src/api/generated/types.ts      - All DTOs and interfaces
```

### 2. Use Generated Client

```typescript
import { TodosClient } from '@/api/generated/client'

const client = new TodosClient('http://localhost:5000')
const todos = await client.getTodos(1, 10)
```

## 🧩 Creating New Components

### New Atom Component Template

```typescript
// src/components/atoms/Badge/Badge.tsx
import { forwardRef, type HTMLAttributes } from 'react'
import './Badge.scss'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={['badge', `badge--${variant}`, `badge--${size}`, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </span>
  )
)

Badge.displayName = 'Badge'
```

```scss
// src/components/atoms/Badge/Badge.scss
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;
  
  &--primary {
    background-color: var(--primary-100);
    color: var(--primary-700);
  }
  
  &--success {
    background-color: var(--success-100);
    color: var(--success-700);
  }
}
```

### Export from Barrel

```typescript
// src/components/atoms/index.ts
export { Button } from './Button'
export { Input } from './Input'
export { Badge } from './Badge'  // Add new component
```

## 📚 Documentation

**Location**: `docs/`

- **README.md** - Overview of 11 guides
- **01-application-overview.md** - Introduction
- **IMPLEMENTATION_STATUS.md** - Current status
- **REFACTOR_SUMMARY.md** - What was built
- **SESSION_COMPLETE.md** - Session summary

## 🔐 Security Checklist

- ✅ Input validation on all inputs
- ✅ Error boundaries for safe error handling
- ✅ XSS prevention (React auto-escapes by default)
- ✅ CSRF tokens (configure on backend)
- ✅ Environment variables not exposed

## ⚡ Performance Tips

1. **Use CONFIG constants** instead of magic numbers
2. **Lazy load features** with React.lazy()
3. **Enable React Compiler** (auto via Babel)
4. **Implement React Query** caching
5. **Use debounced search** (configured in settings)
6. **Code split by route** (automatic in Vite)

## 🧪 Testing Components

```typescript
// src/components/atoms/Button/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '../Button'

describe('Button', () => {
  it('renders with primary variant', () => {
    render(<Button variant="primary">Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>)
    expect(screen.getByText('Loading')).toHaveAttribute('aria-busy', 'true')
  })
})
```

## 🎯 Common Tasks

### Add a New Feature

```
1. Create folder: src/features/MyFeature/
2. Create hook: src/features/MyFeature/hooks/useMyData.ts
3. Create page: src/features/MyFeature/pages/MyPage.tsx
4. Create styles: src/features/MyFeature/pages/MyPage.scss
5. Export from src/features/index.ts
6. Add route in router config
```

### Add Configuration Constant

```typescript
// src/config/settings.ts
export const MY_CONFIG = {
  SETTING_1: 'value1',
  SETTING_2: 100,
} as const

// Usage
import { CONFIG } from '@/config/settings'
const value = CONFIG.MY_CONFIG.SETTING_1
```

### Handle Errors

```typescript
import { useToast } from '@/components/common/Toast'

function MyComponent() {
  const toast = useToast()

  try {
    // Do something
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Unknown error')
  }
}
```

## 📊 Architecture at a Glance

```
User Interface (React Components)
         ↓
Atoms + Molecules + Organisms (Reusable UI)
         ↓
Feature Hooks (useMyData.ts)
         ↓
API Layer (Generated from OpenAPI)
         ↓
.NET Minimal API (Backend with Vertical Slices)
```

## 🎓 Learning Resources

1. **Atomic Design**: Read `docs/04-components-and-styling.md`
2. **API Integration**: Read `docs/05-api-layer.md`
3. **State Management**: Read `docs/06-state-management.md`
4. **Security**: Read `docs/09-security.md` (when available)
5. **Performance**: Read `docs/10-performance.md` (when available)

## ❓ FAQ

**Q: How do I add a new button variant?**
A: Edit `src/components/atoms/Button/Button.scss` and add new variant class

**Q: How do I generate the API client?**
A: Ensure backend is running, then run `npm run generate:client`

**Q: Where do I put magic numbers?**
A: In `src/config/settings.ts` under appropriate category

**Q: How do I test components?**
A: Create `.test.tsx` file in `__tests__/` folder and use Vitest

**Q: How do I handle loading states?**
A: Use component's `isLoading` prop and provide `loadingContent`

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Status**: ✅ Production Ready
