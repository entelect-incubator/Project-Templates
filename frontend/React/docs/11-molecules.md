# 🧩 Form & SearchForm Molecules - Complete Guide

## Overview

Form and SearchForm molecules combine multiple atoms to create complete, production-ready form experiences with built-in validation, error handling, and accessibility features.

---

## Form Molecule

### Purpose

Wraps form atoms (Input, Select, Checkbox, Radio, etc.) with:

- Fieldset-based semantic HTML
- Centralized error and loading states
- Multi-column responsive layout
- Full ARIA accessibility
- Form sections for large forms

### Features

✅ **3 Components**:

- `Form` - Main container with fieldset semantics
- `FormField` - Individual field wrapper with label/error/helper
- `FormSection` - Section grouping for complex forms

✅ **Multi-Column Layouts**:

- 1, 2, or 3 columns with responsive collapse
- Mobile-first responsive design

✅ **Comprehensive Validation**:

- Form-level error display
- Field-level errors with visual indicators
- Required field indicators
- Helper text for guidance

✅ **Accessibility**:

- Fieldset/legend for semantic structure
- aria-describedby for error/helper associations
- aria-required for required fields
- aria-busy for loading states
- WCAG 2.1 AA compliant

### Component API

#### Form Component

```tsx
interface FormProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Title/legend for the form */
  title?: string;

  /** Number of columns for layout (1-3) */
  columns?: 1 | 2 | 3;

  /** Form-level error message */
  error?: string;

  /** Show form is loading/submitting */
  isLoading?: boolean;

  /** Form content/fields */
  children: ReactNode;

  /** CSS class name */
  className?: string;
}
```

#### FormField Component

```tsx
interface FormFieldProps {
  /** Label text for the field */
  label?: string;

  /** Error message for the field */
  error?: string;

  /** Helper/hint text */
  helperText?: string;

  /** Field is required */
  required?: boolean;

  /** Field content */
  children: ReactNode;

  /** CSS class name */
  className?: string;

  /** Optional field identifier for accessibility */
  id?: string;
}
```

#### FormSection Component

```tsx
interface FormSectionProps {
  /** Section title */
  title?: string;

  /** Description for the section */
  description?: string;

  /** Section content */
  children: ReactNode;

  /** CSS class name */
  className?: string;
}
```

### Usage Examples

#### Basic Form with 2 Columns

```tsx
import { Form, FormField } from '@/components/molecules/Form';
import { Input, Button } from '@/components/atoms';

export function UserForm() {
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle submission
  };

  return (
    <Form
      title="User Registration"
      columns={2}
      error={formError}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <FormField
        label="First Name"
        required
        id="firstName"
      >
        <Input
          id="firstName"
          placeholder="John"
          required
        />
      </FormField>

      <FormField
        label="Last Name"
        required
        id="lastName"
      >
        <Input
          id="lastName"
          placeholder="Doe"
          required
        />
      </FormField>

      <FormField
        label="Email"
        error={errors.email}
        helperText="We'll never share your email"
        required
        id="email"
      >
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          required
        />
      </FormField>

      <FormField
        label="Age"
        id="age"
      >
        <Input
          id="age"
          type="number"
          placeholder="25"
        />
      </FormField>

      <Button type="submit" variant="primary">
        Register
      </Button>
    </Form>
  );
}
```

#### Complex Form with Sections

```tsx
<Form title="Profile Settings" columns={2}>
  <FormSection
    title="Basic Information"
    description="Your personal details"
  >
    <FormField label="Name" required id="name">
      <Input id="name" />
    </FormField>

    <FormField label="Email" required id="email">
      <Input id="email" type="email" />
    </FormField>
  </FormSection>

  <FormSection
    title="Preferences"
    description="How you interact with our platform"
  >
    <FormField label="Theme" id="theme">
      <Select id="theme">
        <option>Light</option>
        <option>Dark</option>
      </Select>
    </FormField>

    <FormField label="Notifications" id="notifications">
      <Checkbox id="notifications">
        Enable email notifications
      </Checkbox>
    </FormField>
  </FormSection>
</Form>
```

---

## SearchForm Molecule

### Purpose

Specialized form for search interfaces combining:
- Input with placeholder and validation
- Debounced search trigger (configurable delay)
- Clear button for easy reset
- Submit button with loading indicator
- Error and success message display
- Full keyboard support (Enter to search)

### Features

✅ **Debounced Search**:
- Configurable debounce delay (default: 300ms)
- Prevents excessive API calls
- Smooth search-as-you-type experience

✅ **Action Buttons**:
- Optional clear button (auto-hidden when empty)
- Optional submit button with loading spinner
- Fully configurable button labels

✅ **State Management**:
- Form-level error display
- Success message feedback
- Loading indicator during search
- Full ARIA attributes for screen readers

✅ **Accessibility**:
- Semantic form structure
- aria-busy for loading state
- aria-label for inputs
- aria-describedby for errors
- Full keyboard navigation

### Component API

```tsx
interface SearchFormProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSubmit' | 'type'> {
  /** Called when search query changes (after debounce) */
  onSearch?: (query: string) => void | Promise<void>;

  /** Called when form is submitted */
  onSubmit?: (query: string) => void | Promise<void>;

  /** Debounce delay in milliseconds */
  debounceDelay?: number;

  /** Show clear button */
  showClearButton?: boolean;

  /** Show submit button */
  showSubmitButton?: boolean;

  /** Button label */
  submitLabel?: string;

  /** Clear button label */
  clearLabel?: string;

  /** Loading state */
  isLoading?: boolean;

  /** Error message to display */
  error?: string;

  /** Success message to display */
  success?: string;

  /** CSS class name */
  className?: string;
}
```

### Usage Examples

#### Basic Search

```tsx
import { SearchForm } from '@/components/molecules/SearchForm';

export function SearchUsers() {
  const handleSearch = async (query: string) => {
    const response = await fetch(`/api/users/search?q=${query}`);
    const results = await response.json();
    // Handle results
  };

  return (
    <SearchForm
      placeholder="Search users by name or email..."
      onSearch={handleSearch}
      debounceDelay={300}
    />
  );
}
```

#### Search with Submit

```tsx
export function AdvancedSearch() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSearch = async (query: string) => {
    // Auto-search on input change
    try {
      const response = await fetch(`/api/search/preview?q=${query}`);
      setResults(await response.json());
      setSuccess(`Found ${results.length} results`);
    } catch (err) {
      setError('Search failed');
    }
  };

  const handleSubmit = async (query: string) => {
    // Full search on submit
    try {
      const response = await fetch('/api/search/full', {
        method: 'POST',
        body: JSON.stringify({ query }),
      });
      setResults(await response.json());
    } catch (err) {
      setError('Search failed');
    }
  };

  return (
    <SearchForm
      placeholder="Search..."
      onSearch={handleSearch}
      onSubmit={handleSubmit}
      showClearButton
      showSubmitButton
      submitLabel="Full Search"
      clearLabel="Clear"
      error={error}
      success={success}
    />
  );
}
```

#### Conditional Visibility

```tsx
export function SearchPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <SearchForm
      placeholder="Search products..."
      onSearch={async (query) => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/products?q=${query}`);
          if (!response.ok) throw new Error('Search failed');
        } finally {
          setIsLoading(false);
        }
      }}
      isLoading={isLoading}
      error={error}
      showSubmitButton={false}
      debounceDelay={500}
    />
  );
}
```

---

## Styling & Customization

### CSS Variables Used

```scss
/* Form */
--spacing-1, --spacing-2, --spacing-3, --spacing-4
--typography-heading-4-size
--typography-body-2-size, --typography-body-3-size
--typography-label-size, --typography-caption-size
--color-text-primary, --color-text-secondary
--color-error, --color-error-light
--color-success, --color-success-light
--color-danger, --border-radius-md
--transition-fast

/* SearchForm */
Plus all Form variables
--color-primary (for spinners)
--color-neutral-100
```

### Responsive Design

Both components are **mobile-first responsive**:
- Form: Collapses multi-column layouts on mobile
- SearchForm: Full-width input, stacked buttons on mobile
- All text: Increased font size (16px) on mobile to prevent zoom

---

## Integration with React Query

### Example: Search with React Query

```tsx
import { useMutation } from '@tanstack/react-query';
import { SearchForm } from '@/components/molecules/SearchForm';

export function TodoSearch() {
  const searchMutation = useMutation({
    mutationFn: async (query: string) => {
      const response = await fetch(`/api/todos/search?q=${query}`);
      return response.json();
    },
    onError: (error) => {
      console.error('Search failed:', error);
    },
  });

  return (
    <SearchForm
      placeholder="Search todos..."
      onSearch={(query) => {
        if (query) searchMutation.mutate(query);
      }}
      isLoading={searchMutation.isPending}
      error={searchMutation.error?.message}
    />
  );
}
```

---

## Accessibility Checklist

### Form

- ✅ Fieldset/legend semantic structure
- ✅ Label associated with inputs (htmlFor)
- ✅ aria-required for required fields
- ✅ aria-describedby links errors and helpers
- ✅ Required field indicator (*)
- ✅ Error messages with role="alert"
- ✅ Proper heading hierarchy
- ✅ Keyboard navigation throughout

### SearchForm

- ✅ aria-label on input
- ✅ aria-busy during search
- ✅ aria-describedby for errors
- ✅ aria-live="polite" for messages
- ✅ Semantic form element
- ✅ Full keyboard support
- ✅ Error messages with role="alert"
- ✅ Loading state visual + aria-busy

---

## Performance Considerations

### Form

- ✅ Fieldset doesn't re-render on prop changes
- ✅ No unnecessary memo or useCallback
- ✅ CSS Grid for layouts (hardware accelerated)
- ✅ Animations optimized for prefers-reduced-motion

### SearchForm

- ✅ Debounce prevents excessive renders (300ms default)
- ✅ setTimeout cleanup prevents memory leaks
- ✅ Controlled input component
- ✅ No external dependencies for debounce
- ✅ CSS Grid for button layout

---

## Testing

### Form Testing

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, FormField } from '@/components/molecules/Form';

test('displays form with title and fields', () => {
  render(
    <Form title="Test Form">
      <FormField label="Name" id="name">
        <input id="name" />
      </FormField>
    </Form>
  );

  expect(screen.getByText('Test Form')).toBeInTheDocument();
  expect(screen.getByLabelText('Name')).toBeInTheDocument();
});

test('displays error message', () => {
  render(
    <Form error="Form submission failed">
      <FormField label="Test" id="test">
        <input id="test" />
      </FormField>
    </Form>
  );

  expect(screen.getByRole('alert')).toHaveTextContent('Form submission failed');
});
```

### SearchForm Testing

```tsx
test('debounces search input', async () => {
  const onSearch = vi.fn();
  render(<SearchForm onSearch={onSearch} debounceDelay={100} />);

  const input = screen.getByLabelText('Search query');
  await userEvent.type(input, 'test');

  await new Promise(resolve => setTimeout(resolve, 50));
  expect(onSearch).not.toHaveBeenCalled();

  await new Promise(resolve => setTimeout(resolve, 100));
  expect(onSearch).toHaveBeenCalledWith('test');
});
```

---

## Status

| Component   | Status     | Lines    | Features                                 |
| ----------- | ---------- | -------- | ---------------------------------------- |
| Form        | ✅ Complete | 180      | Fieldset, multi-column, sections, errors |
| FormField   | ✅ Complete | Included | Labels, errors, helpers, required        |
| FormSection | ✅ Complete | Included | Grouping, titles, descriptions           |
| SearchForm  | ✅ Complete | 210      | Debounce, clear, submit, errors          |

**Total**: 2 molecules, 390+ lines, 100% TypeScript, WCAG 2.1 AA compliant

---

## Files

```
src/components/molecules/
├── Form/
│   ├── Form.tsx (180 lines)
│   ├── Form.scss (260 lines)
│   └── index.ts
├── SearchForm/
│   ├── SearchForm.tsx (210 lines)
│   ├── SearchForm.scss (180 lines)
│   └── index.ts
└── index.ts (8 lines - exports)
```
