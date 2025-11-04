# React Testing Standards

This guide establishes comprehensive testing standards for React frontend development using Vitest and Playwright.

## Testing Strategy

React testing follows a selective, behavior-focused approach:

- **Vitest:** Unit tests for complex components, hooks, and utilities only (not all components)
- **Playwright:** End-to-end tests for critical user workflows
- **Testing Library:** Component testing with user-centric queries
- **Coverage Goal:** 80%+ for business logic and complex components

## When to Write Tests

### Test Complex Components

✅ Components with conditional rendering logic
✅ Components with complex state management
✅ Reusable UI components (buttons, forms, modals)
✅ Custom hooks with business logic
✅ Utility functions and helpers
✅ API integration layers

### Skip Testing Simple Components

❌ Presentational-only components (just render props)
❌ Component wrappers that don't add logic
❌ Components that are tested through E2E tests
❌ Generated code
❌ Third-party library components

## Project Structure

Organize tests alongside source code:

```
frontend/src/
├── features/
│   ├── todos/
│   │   ├── api/
│   │   │   ├── useTodos.ts
│   │   │   └── useTodos.test.ts          # Hook tests
│   │   ├── components/
│   │   │   ├── TodoList.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   └── TodoForm.test.tsx         # Complex component test
│   │   └── pages/
│   │       └── TodosPage.tsx             # Tested via E2E
│   └── users/
│       ├── api/
│       │   ├── useAuth.ts
│       │   └── useAuth.test.ts
│       └── components/
│           ├── LoginForm.test.tsx        # Complex form
│           └── UserProfile.test.tsx
├── components/
│   ├── atoms/
│   │   ├── Button.tsx                    # Tested via E2E or higher-level tests
│   │   ├── Input.tsx
│   │   └── Badge.tsx
│   └── molecules/
│       ├── Modal.test.tsx                # Complex component
│       └── Pagination.test.tsx
├── hooks/
│   ├── useLocalStorage.ts
│   └── useLocalStorage.test.ts           # Hook test
└── utils/
    ├── validation.ts
    ├── validation.test.ts                # Utility tests
    └── api-client.test.ts

e2e/
├── config/
│   └── playwright.config.ts
├── fixtures/
│   └── auth.ts
└── specs/
    ├── todos.spec.ts
    ├── users.spec.ts
    └── auth.spec.ts
```

## Vitest Setup

### Installation

```bash
npm install -D vitest @vitest/ui
npm install -D @testing-library/react @testing-library/jest-dom
npm install -D jsdom
```

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.spec.ts',
        '**/*.test.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### src/test/setup.ts

```typescript
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

## Unit Test Examples

### Hook Testing with Vitest

**File: `src/features/todos/api/useTodos.test.ts`**

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTodos } from './useTodos';

// Mock API client
vi.mock('@/api/client', () => ({
  getTodos: vi.fn(),
  createTodo: vi.fn(),
  updateTodo: vi.fn(),
  deleteTodo: vi.fn(),
}));

describe('useTodos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch todos on mount', async () => {
    // Arrange
    const mockTodos = [
      { id: '1', title: 'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true },
    ];
    
    const { getTodos } = await import('@/api/client');
    vi.mocked(getTodos).mockResolvedValueOnce(mockTodos);

    // Act
    const { result } = renderHook(() => useTodos());

    // Assert
    await waitFor(() => {
      expect(result.current.todos).toEqual(mockTodos);
    });
  });

  it('should create a new todo', async () => {
    // Arrange
    const newTodo = { id: '3', title: 'New Todo', completed: false };
    const { createTodo } = await import('@/api/client');
    vi.mocked(createTodo).mockResolvedValueOnce(newTodo);

    // Act
    const { result } = renderHook(() => useTodos());
    await result.current.createTodo('New Todo');

    // Assert
    await waitFor(() => {
      expect(result.current.todos).toContainEqual(newTodo);
    });
  });

  it('should handle errors gracefully', async () => {
    // Arrange
    const { getTodos } = await import('@/api/client');
    vi.mocked(getTodos).mockRejectedValueOnce(new Error('API Error'));

    // Act
    const { result } = renderHook(() => useTodos());

    // Assert
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
      expect(result.current.isLoading).toBe(false);
    });
  });
});
```

### Complex Component Testing

**File: `src/features/todos/components/TodoForm.test.tsx`**

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from './TodoForm';

describe('TodoForm', () => {
  it('should render form fields', () => {
    // Arrange & Act
    render(<TodoForm onSubmit={vi.fn()} />);

    // Assert
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should submit form with valid data', async () => {
    // Arrange
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<TodoForm onSubmit={onSubmit} />);

    // Act
    await user.type(screen.getByLabelText(/title/i), 'Test Todo');
    await user.type(screen.getByLabelText(/description/i), 'Test description');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Assert
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        title: 'Test Todo',
        description: 'Test description',
      });
    });
  });

  it('should display validation errors', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<TodoForm onSubmit={vi.fn()} />);

    // Act - Submit without title
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });
  });

  it('should disable submit button during submission', async () => {
    // Arrange
    const user = userEvent.setup();
    const slowSubmit = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<TodoForm onSubmit={slowSubmit} />);

    // Act
    await user.type(screen.getByLabelText(/title/i), 'Test');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Assert
    expect(submitButton).toBeDisabled();
  });

  it('should handle pre-filled values for editing', () => {
    // Arrange
    const initialValues = {
      id: '1',
      title: 'Existing Todo',
      description: 'Existing description',
    };

    // Act
    render(<TodoForm initialValues={initialValues} onSubmit={vi.fn()} />);

    // Assert
    expect(screen.getByDisplayValue('Existing Todo')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing description')).toBeInTheDocument();
  });
});
```

### Utility Function Testing

**File: `src/utils/validation.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import { validateEmail, validateTodoTitle, validatePassword } from './validation';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should accept valid emails', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('john.doe+tag@example.co.uk')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateTodoTitle', () => {
    it('should accept valid titles', () => {
      expect(validateTodoTitle('Do something')).toBe(true);
      expect(validateTodoTitle('A')).toBe(true);
    });

    it('should reject empty or too long titles', () => {
      expect(validateTodoTitle('')).toBe(false);
      expect(validateTodoTitle('  ')).toBe(false);
      expect(validateTodoTitle('x'.repeat(256))).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should accept strong passwords', () => {
      expect(validatePassword('SecurePass123!@')).toBe(true);
      expect(validatePassword('AnotherOne#2024')).toBe(true);
    });

    it('should reject weak passwords', () => {
      expect(validatePassword('weak')).toBe(false);
      expect(validatePassword('NoNumber!')).toBe(false);
      expect(validatePassword('12345678')).toBe(false);
    });
  });
});
```

### Custom Hook Testing

**File: `src/hooks/useLocalStorage.test.ts`**

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with default value', () => {
    // Arrange & Act
    const { result } = renderHook(() => useLocalStorage('key', 'default'));

    // Assert
    expect(result.current[0]).toBe('default');
  });

  it('should read from localStorage', () => {
    // Arrange
    localStorage.setItem('key', JSON.stringify('stored'));

    // Act
    const { result } = renderHook(() => useLocalStorage('key', 'default'));

    // Assert
    expect(result.current[0]).toBe('stored');
  });

  it('should update localStorage on value change', () => {
    // Arrange
    const { result } = renderHook(() => useLocalStorage('key', ''));

    // Act
    act(() => {
      result.current[1]('new value');
    });

    // Assert
    expect(localStorage.getItem('key')).toBe(JSON.stringify('new value'));
    expect(result.current[0]).toBe('new value');
  });

  it('should handle complex objects', () => {
    // Arrange
    const testObj = { name: 'Test', count: 42 };

    // Act
    const { result } = renderHook(() => useLocalStorage('obj', {}));
    act(() => {
      result.current[1](testObj);
    });

    // Assert
    expect(result.current[0]).toEqual(testObj);
    expect(localStorage.getItem('obj')).toBe(JSON.stringify(testObj));
  });
});
```

## Playwright E2E Testing

### Installation

```bash
npm install -D @playwright/test
npx playwright install
```

### playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

### E2E Test Examples

**File: `e2e/specs/todos.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Todo Features', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to todos page before each test
    await page.goto('/todos');
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('should create a new todo', async ({ page }) => {
    // Arrange
    const todoTitle = 'Complete Playwright tests';

    // Act
    await page.click('button:has-text("Add Todo")');
    await page.fill('input[name="title"]', todoTitle);
    await page.click('button:has-text("Create")');

    // Assert
    await expect(page.locator(`text=${todoTitle}`)).toBeVisible();
  });

  test('should mark todo as complete', async ({ page }) => {
    // Arrange - Create a todo first
    await page.click('button:has-text("Add Todo")');
    await page.fill('input[name="title"]', 'Test todo');
    await page.click('button:has-text("Create")');

    // Act
    await page.click('input[type="checkbox"]');

    // Assert
    const todoItem = page.locator('text=Test todo').locator('..');
    await expect(todoItem).toHaveClass(/completed/);
  });

  test('should delete a todo', async ({ page }) => {
    // Arrange - Create a todo first
    const todoTitle = 'Todo to delete';
    await page.click('button:has-text("Add Todo")');
    await page.fill('input[name="title"]', todoTitle);
    await page.click('button:has-text("Create")');

    // Act
    await page.click('button:has-text("Delete"):near(text=' + todoTitle + ')');
    await page.click('button:has-text("Confirm")'); // Confirm deletion

    // Assert
    await expect(page.locator(`text=${todoTitle}`)).not.toBeVisible();
  });

  test('should filter todos by status', async ({ page }) => {
    // Act
    await page.click('button:has-text("Completed")');

    // Assert
    const todos = await page.locator('[data-testid="todo-item"]').count();
    // Should show only completed todos
    const completedCheckboxes = await page
      .locator('[data-testid="todo-item"] input[type="checkbox"]:checked')
      .count();
    expect(completedCheckboxes).toBe(todos);
  });

  test('should show empty state when no todos exist', async ({ page }) => {
    // Arrange
    await page.click('[data-testid="clear-all"]');
    await page.click('button:has-text("Confirm")');

    // Assert
    await expect(page.locator('text=No todos yet')).toBeVisible();
  });
});
```

**File: `e2e/specs/auth.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login with valid credentials', async ({ page }) => {
    // Arrange
    await page.goto('/login');

    // Act
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'Password123!');
    await page.click('button:has-text("Login")');

    // Assert
    await expect(page).toHaveURL('/todos');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // Arrange
    await page.goto('/login');

    // Act
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'WrongPassword');
    await page.click('button:has-text("Login")');

    // Assert
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });

  test('should logout successfully', async ({ page, context }) => {
    // Arrange - Login first
    await page.goto('/login');
    await page.fill('input[type="email"]', 'user@example.com');
    await page.fill('input[type="password"]', 'Password123!');
    await page.click('button:has-text("Login")');
    await expect(page).toHaveURL('/todos');

    // Act
    await page.click('[data-testid="user-menu"]');
    await page.click('button:has-text("Logout")');

    // Assert
    await expect(page).toHaveURL('/login');
  });

  test('should prevent access to protected pages without auth', async ({ page }) => {
    // Act & Assert
    await page.goto('/todos');
    await expect(page).toHaveURL('/login');
  });
});
```

## Running Tests

### Vitest Commands

```bash
# Run all tests
npm run test

# Run in watch mode
npm run test:watch

# Run with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Playwright Commands

```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode (see browser)
npm run test:e2e -- --headed

# Run specific test file
npm run test:e2e e2e/specs/todos.spec.ts

# Generate test report
npm run test:e2e
npx playwright show-report
```

## package.json Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:all": "npm run test && npm run test:e2e"
  }
}
```

## Best Practices

### Do's

✅ Test behavior, not implementation
✅ Use data-testid for element selection in E2E tests
✅ Keep tests focused on single functionality
✅ Use user-centric queries (getByRole, getByLabelText)
✅ Mock external dependencies in unit tests
✅ Test error states and edge cases
✅ Keep E2E tests independent
✅ Use fixtures for common setup
✅ Document complex test scenarios
✅ Run tests before committing

### Don'ts

❌ Don't test everything (use judgment)
❌ Don't write fragile tests with hard-coded values
❌ Don't test implementation details
❌ Don't use generic selectors in E2E (avoid nth-child)
❌ Don't make E2E tests dependent on order
❌ Don't test third-party libraries
❌ Don't ignore flaky tests
❌ Don't mix unit and E2E concerns
❌ Don't over-mock in component tests
❌ Don't leave skipped tests in codebase

## Troubleshooting

### Vitest Issues

**Problem:** Tests timeout

**Solution:**
```typescript
it('should handle long operations', async () => {
  // ...
}, { timeout: 10000 });
```

**Problem:** Cannot find module

**Solution:** Ensure vitest.config.ts has correct alias configuration

### Playwright Issues

**Problem:** Timeout waiting for element

**Solution:**
```typescript
// Increase timeout for slow operations
await page.goto('/todos', { waitUntil: 'networkidle' });
await page.waitForSelector('[data-testid="todo-item"]', { timeout: 10000 });
```

**Problem:** Tests fail in CI but pass locally

**Solution:**
- Use `--headed` to debug
- Check screenshot/trace artifacts
- Ensure consistent wait strategies

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Last Updated:** November 4, 2025
**Version:** 1.0

Follow these standards to write maintainable React tests!
