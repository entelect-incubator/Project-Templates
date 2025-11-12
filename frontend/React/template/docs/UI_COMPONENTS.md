# UI Components Library

All reusable UI components are located in `src/components/ui/` and exported from `src/components/ui/index.ts`.

## Form Components

### FormInput
Generic text input component with built-in error handling and accessibility features.

```tsx
import { FormInput } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
});

export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        id="username"
        label="Username"
        required
        placeholder="Enter your username"
        registration={register('username')}
        error={errors.username}
      />
    </form>
  );
}
```

**Props:**
- `label`: Field label text
- `registration`: React Hook Form registration object from `register()`
- `error`: FieldError object (shows error state and message)
- `id`: HTML id attribute (required for accessibility)
- All standard HTMLInputElement attributes (type, placeholder, disabled, etc.)

### FormEmail
Specialized email input component. Automatically sets `type="email"`.

```tsx
<FormEmail
  id="email"
  label="Email Address"
  required
  placeholder="you@example.com"
  registration={register('email')}
  error={errors.email}
/>
```

### FormTelephone
Specialized phone input component. Automatically sets `type="tel"`.

```tsx
<FormTelephone
  id="phone"
  label="Phone Number"
  required
  placeholder="(555) 123-4567"
  registration={register('phone')}
  error={errors.phone}
/>
```

## Button Components

### Button
Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ui';

export function MyComponent() {
  return (
    <>
      {/* Primary variant (default) */}
      <Button onClick={handleClick}>
        Click Me
      </Button>

      {/* Different variants */}
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Delete</Button>

      {/* Different sizes */}
      <Button size="sm">Small</Button>
      <Button size="md">Medium (default)</Button>
      <Button size="lg">Large</Button>

      {/* Loading state */}
      <Button isLoading={isLoading}>
        {isLoading ? '⏳' : 'Submit'}
      </Button>

      {/* Disabled state */}
      <Button disabled>Disabled</Button>
    </>
  );
}
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'danger'` (default: 'primary')
- `size`: `'sm' | 'md' | 'lg'` (default: 'md')
- `isLoading`: Boolean to show loading state
- `disabled`: Standard HTML disabled attribute
- All standard HTMLButtonElement attributes

### SubmitButton
Specialized submit button with built-in loading state handling.

```tsx
import { SubmitButton } from '@/components/ui';
import { useForm } from 'react-hook-form';

export function MyForm() {
  const { handleSubmit, formState: { isSubmitting } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ... form fields ... */}
      
      <SubmitButton
        label="Save Changes"
        isLoading={isSubmitting}
        loadingLabel="Saving..."
      />
    </form>
  );
}
```

**Props:**
- `label`: Button text when not loading
- `isLoading`: Boolean to control loading state (default: false)
- `loadingLabel`: Text to show while loading (default: 'Processing...')
- All standard HTMLButtonElement attributes

## Form Section Components

### CustomerInfoSection
Consolidated customer information form with all delivery fields.

Located in `src/components/Order/CustomerInfoSection.tsx`

```tsx
import { CustomerInfoSection } from '@/components/Order/CustomerInfoSection';
import { useForm } from 'react-hook-form';

export function OrderPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomerInfoSection register={register} errors={errors} />
    </form>
  );
}
```

Includes fields for:
- Full Name
- Email Address
- Phone Number
- Address
- City
- Zip Code

### OrderSummary
Displays order items with quantities and total.

Located in `src/components/Order/OrderSummary.tsx`

```tsx
import { OrderSummary } from '@/components/Order/OrderSummary';

export function OrderPage({ items, total }) {
  return <OrderSummary items={items} total={total} />;
}
```

## Styling & Theming

All UI components use CSS modules for scoped styling and support CSS custom properties (variables) for theming:

- `--color-primary`: Primary action color
- `--color-secondary`: Secondary action color
- `--color-error`: Error states
- `--color-border`: Border colors
- `--color-text-primary`: Primary text color
- `--color-text-secondary`: Secondary text color
- `--color-background-secondary`: Secondary background color

### Custom Styling
You can extend components with custom classes:

```tsx
<Button className="custom-class">
  Custom Styled Button
</Button>
```

## Accessibility

All form components include built-in accessibility features:

- **Labels**: Properly linked to inputs via `htmlFor`
- **Error states**: `aria-invalid` indicates validation errors
- **Error messages**: `aria-describedby` associates errors with fields
- **Keyboard navigation**: Full keyboard support
- **Screen readers**: Proper semantic HTML and ARIA attributes

## Import Paths

All UI components can be imported from the barrel export:

```tsx
// Recommended - single import statement
import { Button, SubmitButton, FormInput, FormEmail, FormTelephone } from '@/components/ui';

// Alternative - direct imports
import { Button } from '@/components/ui/Button';
```

## Example: Complete Form

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput, FormEmail, SubmitButton, Button } from '@/components/ui';

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

export function SignupForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    await api.signup(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        id="name"
        label="Full Name"
        required
        registration={register('name')}
        error={errors.name}
      />

      <FormEmail
        id="email"
        label="Email"
        required
        registration={register('email')}
        error={errors.email}
      />

      <FormInput
        id="password"
        label="Password"
        type="password"
        required
        registration={register('password')}
        error={errors.password}
      />

      <div style={{ display: 'flex', gap: '1rem' }}>
        <SubmitButton
          label="Sign Up"
          isLoading={isSubmitting}
          loadingLabel="Creating Account..."
        />
        <Button variant="secondary" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
```

## Component Composition

These components are designed to be composed together. For example, `CustomerInfoSection` uses `FormInput`, `FormEmail`, and `FormTelephone` internally. You can create similar sections by composing these base components.

## Type Safety

All components are fully typed with TypeScript. Type definitions are included in component files for IDE autocomplete and compile-time type checking.
