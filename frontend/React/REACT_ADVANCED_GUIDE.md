# React 19.2 Advanced Todo Application

## Overview

This is a modern, production-ready React 19.2+ application featuring TanStack Query, TypeScript, Tailwind CSS, SCSS, OpenTelemetry, and comprehensive error handling. The project demonstrates best practices for building scalable React applications with strong typing, performance optimization, and observability.

## 🎯 Key Features

### React 19.2+ & Modern Stack
- **React 19.2** with latest JSX features
- **React Compiler** for automatic component optimization
- **TanStack Query v5** for advanced data fetching and caching
- **TypeScript 5.3** for type safety
- **Vite 5.1** for fast builds and HMR
- **Tailwind CSS 3.4** + **SCSS** for styling

### Architecture & Code Quality
- **Feature-Slice Architecture**: Organized by feature with clear boundaries
- **Global Error Boundary**: Catches and handles all React errors gracefully
- **Toast Notifications**: Sonner-based notification system for user feedback
- **Proper Error Handling**: Comprehensive error states and user messages
- **OpenTelemetry**: Built-in distributed tracing for observability
- **Disabled States**: Proper disabled state management during async operations

### Advanced Features
- **Debounced Search**: Search with caching and AbortSignal support
- **CacheSignal System**: Robust cache management with TTL
- **Pagination Component**: Reusable, accessible pagination
- **Custom Hooks**: Collection of reusable hooks (useAsync, useDebouncedSearch, useLocalStorage, etc.)
- **SSR Ready**: Suspense boundaries for server-side rendering support
- **Batching Suspense Boundaries**: Optimized loading states for SSR

## 📁 Project Structure

```
src/
├── app/                          # Application root
│   ├── App.tsx                  # Main app component with providers
│   └── App.scss                 # App styling
├── api/                         # API client
│   └── client.ts               # HTTP client with AbortSignal support
├── components/                 # Shared components
│   └── common/
│       ├── GlobalErrorBoundary.tsx
│       ├── Pagination.tsx       # Reusable pagination component
│       ├── Pagination.scss
│       ├── Toast.tsx            # Toast provider and hook
│       └── ...
├── features/                   # Feature modules
│   └── todos/
│       ├── api/               # Feature API calls
│       ├── components/        # Feature components
│       ├── hooks/
│       │   └── useTodos.ts   # Feature-specific hooks with telemetry
│       ├── pages/
│       │   ├── TodoPage.tsx   # Main page component
│       │   └── TodoPage.scss  # Page styling
│       └── types/
│           └── index.ts       # TypeScript interfaces
├── hooks/                      # Global custom hooks
│   └── index.ts
├── lib/
│   ├── queryClient.ts         # TanStack Query setup
│   ├── telemetry.ts           # OpenTelemetry integration
│   └── helpers/
│       └── cache.ts           # Caching utilities with CacheSignal
├── styles/
│   ├── globals.scss           # Global styles and SCSS variables
│   └── index.css              # Base CSS (if needed)
├── types/                     # Global types
├── main.tsx                   # Application entry point
└── vite-env.d.ts             # Vite environment types
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Testing
npm run test
npm run test:ui
npm run test:coverage

# E2E testing
npm run e2e
npm run e2e:ui
```

## 🏗️ Architecture Details

### 1. Error Handling

**Global Error Boundary** (`GlobalErrorBoundary.tsx`)
- Catches all React errors at component tree level
- Integrates with OpenTelemetry for error tracking
- Provides fallback UI and reset functionality
- Shows error details in development mode

### 2. Toast System

The application uses **Sonner** for toast notifications with a custom hook interface:

```typescript
const toast = useToast()
toast.success('Success message')
toast.error('Error message')
toast.warning('Warning message')
toast.info('Info message')
```

### 3. Debounced Search with CacheSignal

**CacheSignal** class provides:
- Automatic cache invalidation with TTL
- Request deduplication via AbortSignal
- Pattern-based cache invalidation
- Memory-efficient cache management

```typescript
const cacheSignal = new CacheSignal(5 * 60 * 1000) // 5 minute TTL
const result = await cacheSignal.getOrSet('key', fetchFn)
cacheSignal.invalidatePattern(/todos/)
```

### 4. Pagination Component

Reusable, accessible pagination with:
- Smart page number generation
- Prev/Next navigation
- Page info display
- Disabled state management
- Aria labels for accessibility

### 5. OpenTelemetry Integration

Track operations with spans:

```typescript
await withSpan('operation-name', async () => {
  addSpanAttributes({ 'key': 'value' })
  recordSpanEvent('event-name')
  // Your code here
})
```

### 6. React Compiler

Automatic optimization enabled via `babel-plugin-react-compiler`:
- Automatic memoization of components
- Dependency tracking optimization
- Performance improvements without code changes

## 💅 Styling

### SCSS Structure

- **Variables**: Colors, spacing, typography, shadows
- **Mixins**: Reusable style patterns (flex-center, transitions, buttons)
- **Base Styles**: Typography, forms, buttons, utilities
- **Responsive Design**: Mobile-first approach with breakpoints

### Tailwind CSS

Tailwind is configured alongside SCSS for utility-first approach:
- Custom color palette with primary colors
- Extended spacing and radius
- Animations and transitions
- Responsive modifiers

### SCSS Mixins

```scss
@include flex-center;         // Center flex container
@include flex-between;        // Space-between flex
@include flex-column;         // Column flex
@include transition;          // Smooth transitions
@include focus-ring;          // Accessible focus
@include disabled-state;      // Disabled styling
@include button-base;         // Button base styles
@include card;               // Card styling
```

## 🎯 Custom Hooks

### useAsync
Manage async state with loading and error handling:
```typescript
const { data, isLoading, error } = useAsync(asyncFn, [dependencies])
```

### useDebouncedSearch
Debounced search with caching:
```typescript
const { query, results, isLoading, setQuery } = useDebouncedSearch(searchFn, 300)
```

### useMediaQuery
Responsive design hook:
```typescript
const isMobile = useMediaQuery('(max-width: 768px)')
```

### useLocalStorage
Type-safe local storage:
```typescript
const [value, setValue] = useLocalStorage('key', initialValue)
```

### usePrevious
Track previous value:
```typescript
const prevValue = usePrevious(currentValue)
```

### useIsMounted
SSR-compatible mount detection:
```typescript
const isMounted = useIsMounted()
```

## 📊 Data Fetching

### Query Hooks with Telemetry

```typescript
// Fetch todos with automatic telemetry
const { data, isLoading, error } = useTodos(page, pageSize)

// Search with caching
const { data } = useTodoSearch(query, page, pageSize)

// Create with optimistic updates
const createMutation = useCreateTodo()
await createMutation.mutateAsync(command)
```

### TanStack Query Configuration

- **staleTime**: 5 minutes
- **gcTime** (cache time): 10 minutes
- **Optimistic updates**: Enabled for mutations
- **Cache invalidation**: Pattern-based using CacheSignal

## 🔍 OpenTelemetry

### Setup

Basic OpenTelemetry initialization in `lib/telemetry.ts`:

```typescript
import { withSpan, addSpanAttributes, recordSpanEvent } from '@/lib/telemetry'
```

### Usage

```typescript
// Wrap async operations
await withSpan('fetch-todos', async () => {
  addSpanAttributes({
    'todos.page': page,
    'todos.total': total,
  })
  recordSpanEvent('todos_fetched')
  return result
})
```

### Integration Points

- All data fetching hooks include span tracking
- Error boundary tracks error events
- Mutations track operation attributes
- SSR operations can be monitored

## ⚡ Performance Optimization

### React Compiler
- Enabled via Babel plugin
- Automatic component memoization
- Dependency optimization

### Code Splitting
```javascript
rollupOptions: {
  output: {
    manualChunks: {
      'react-vendor': ['react', 'react-dom'],
      'query-vendor': ['@tanstack/react-query'],
    },
  },
}
```

### Caching Strategy
- Query caching with TanStack Query
- CacheSignal for custom caching
- Request deduplication with AbortSignal

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Error announcements

## 🧪 Testing

### Vitest
```bash
npm run test              # Run tests
npm run test:ui          # UI testing
npm run test:coverage    # Coverage report
```

### Playwright E2E
```bash
npm run e2e              # Run E2E tests
npm run e2e:ui          # UI for E2E tests
```

## 🚢 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Create `.env` file:
```
VITE_API_URL=https://api.example.com
```

### Build Output
- **outDir**: `dist/`
- **Sourcemaps**: Enabled
- **Minification**: Terser

## 🔄 SSR Considerations

This template is prepared for SSR with:
- **Suspense boundaries** for data fetching
- **Batching boundaries** for optimized rendering
- **Hydration-safe hooks** (useIsMounted)
- **Cache management** for server state

## 📚 Additional Resources

- [React 19 Blog](https://blog.logrocket.com/react-19-2-is-here/)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com)
- [OpenTelemetry](https://opentelemetry.io)
- [Vite](https://vitejs.dev)

## 🤝 Contributing

Follow the established patterns:
1. Feature-Slice Architecture
2. TypeScript strict mode
3. SCSS for component styles
4. Error boundaries for error states
5. Toast for user feedback
6. Accessibility best practices

## 📝 License

MIT
