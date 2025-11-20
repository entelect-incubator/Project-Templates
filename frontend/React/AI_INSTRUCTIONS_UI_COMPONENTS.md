// AI System Prompt - UI Components Awareness
// This file documents the UI component library for AI assistants

/*
IMPORTANT: Always use the UI component library from `src/components/ui/` for consistent styling and accessibility.

## UI Component Library Location
src/components/ui/ - All reusable UI components
src/components/ui/index.ts - Barrel export for convenient imports

## Available UI Components

### Form Components (src/components/ui/)
1. FormInput - Generic text input with error handling
   - Usage: <FormInput id="..." label="..." registration={register('fieldName')} error={errors.fieldName} />
   - Features: Built-in accessibility, error display, theme variables

2. FormEmail - Email input (type="email" preset)
   - Usage: <FormEmail id="..." label="..." registration={register('email')} error={errors.email} />
   - Features: Same as FormInput with email validation

3. FormTelephone - Phone input (type="tel" preset)
   - Usage: <FormTelephone id="..." label="..." registration={register('phone')} error={errors.phone} />
   - Features: Same as FormInput with tel type

### Button Components (src/components/ui/)
1. Button - Main button component with variants and sizes
   - Usage: <Button variant="primary" size="md" isLoading={false}>Click Me</Button>
   - Variants: 'primary' | 'secondary' | 'danger'
   - Sizes: 'sm' | 'md' | 'lg'
   - Features: Loading state, disabled state, hover effects

2. SubmitButton - Specialized submit button with loading label
   - Usage: <SubmitButton label="Save" isLoading={isSubmitting} loadingLabel="Saving..." />
   - Features: Automatic type="submit", built-in loading state, no need for custom logic

### Composition Components
1. CustomerInfoSection - Consolidated customer delivery form
   - Location: src/components/Order/CustomerInfoSection.tsx
   - Includes: FormInput, FormEmail, FormTelephone for all delivery fields

2. OrderSummary - Order items display
   - Location: src/components/Order/OrderSummary.tsx
   - Displays: Items with quantities, prices, and total

## Import Pattern
Always import from the barrel export (index.ts):
✅ CORRECT:
  import { Button, FormInput, SubmitButton } from '@/components/ui';

❌ AVOID:
  import { Button } from '@/components/ui/Button';
  import Form components from @/components/Form (deprecated)

## When to Create New Components
1. If it's used in more than one place → Create in ui/
2. If it's feature-specific → Keep in feature folder, don't put in ui/
3. If it's a composition of ui components → Keep separate, reference ui components
4. If it's a page layout → Keep in feature/pages

## Styling Rules
- All components use CSS modules (*.module.scss)
- All components support CSS custom properties (--color-primary, --color-error, etc.)
- Never use inline styles (except for dynamic layout properties)
- Never create custom buttons/inputs when ui components exist

## Accessibility Requirements
All form components MUST have:
- Proper label associations (htmlFor attribute)
- Error aria-invalid and aria-describedby
- Keyboard navigation support
- Screen reader friendly markup

## Common Usage Examples

### Basic Form
```tsx
import { FormInput, FormEmail, SubmitButton } from '@/components/ui';

export function MyForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput id="name" label="Name" registration={register('name')} error={errors.name} />
      <FormEmail id="email" label="Email" registration={register('email')} error={errors.email} />
      <SubmitButton label="Submit" isLoading={isSubmitting} />
    </form>
  );
}
```

### Button Group
```tsx
import { Button, SubmitButton } from '@/components/ui';

<div style={{ display: 'flex', gap: '1rem' }}>
  <SubmitButton label="Save" isLoading={isSaving} />
  <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
  <Button variant="danger" onClick={handleDelete}>Delete</Button>
</div>
```

## DO NOT
❌ Create custom button components (use Button or SubmitButton)
❌ Create custom input components (use FormInput, FormEmail, FormTelephone)
❌ Use hardcoded colors in components (use CSS variables: --color-primary, --color-error)
❌ Add inline styles for standard styling (use CSS modules)
❌ Import form components from @/components/Form (they're now in @/components/ui)

## DO
✅ Use ui components for all forms and buttons
✅ Use CSS modules for component styling
✅ Use CSS custom properties for theming
✅ Add proper accessibility attributes
✅ Create composition components in feature folders
✅ Document complex component usage

## Theme Colors Available
--color-primary: Primary action color (red - #dc3348)
--color-secondary: Secondary action color
--color-error: Error state color
--color-border: Border color
--color-text-primary: Main text color
--color-text-secondary: Secondary text color
--color-background-secondary: Secondary background

## Documentation
- Full UI component docs: docs/UI_COMPONENTS.md
- Component examples: See OrderForm.tsx and CustomerInfoSection.tsx
- Styling guide: See FormInput.module.scss and Button.module.scss
*/

// If adding new UI components:
// 1. Place in src/components/ui/
// 2. Create *.module.scss for styling
// 3. Use CSS custom properties for colors
// 4. Export from src/components/ui/index.ts
// 5. Add examples to docs/UI_COMPONENTS.md
// 6. Ensure full TypeScript typing
// 7. Add accessibility attributes
// 8. Test in at least 2 places before considering "production ready"
