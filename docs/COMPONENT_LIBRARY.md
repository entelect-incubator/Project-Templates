# Component Library Quick Reference

## Atoms Overview

Complete set of reusable form and layout atoms with full accessibility and variant support.

## Button

```typescript
import { Button } from '@/components/atoms';

// Variants: primary, secondary, danger, success, warning, ghost
// Sizes: xs, sm, md, lg

<Button variant="primary" size="md" disabled={isLoading} loading={isLoading}>
  Save Changes
</Button>
```

## Input

```typescript
import { Input } from '@/components/atoms';

<Input
  label="Email"
  placeholder="you@example.com"
  error={errors.email}
  helperText="We'll never share your email"
  disabled={isLoading}
/>
```

## Select

```typescript
import { Select, type SelectOption } from '@/components/atoms';

const options: SelectOption[] = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
];

<Select
  label="Choose one"
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Select..."
  clearable
  error={error}
/>
```

## Checkbox

```typescript
import { Checkbox } from '@/components/atoms';

<Checkbox
  label="I agree to terms"
  checked={agreed}
  onChange={(e) => setAgreed(e.currentTarget.checked)}
  helperText="Review our terms before checking"
  indeterminate={isIndeterminate}
/>
```

## Radio & RadioGroup

```typescript
import { Radio, RadioGroup } from '@/components/atoms';

// Single Radio
<Radio label="Option 1" name="choice" value="1" checked={choice === '1'} />

// RadioGroup (preferred)
<RadioGroup
  name="color"
  label="Choose a color"
  options={[
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
  ]}
  value={color}
  onChange={setColor}
  direction="horizontal"
/>
```

## Alert

```typescript
import { Alert, type AlertVariant } from '@/components/atoms';

// Variants: success, warning, error, info
<Alert
  variant="success"
  title="Success!"
  description="Your changes have been saved"
  closeable
  onClose={() => console.log('closed')}
/>
```

## Badge

```typescript
import { Badge, type BadgeVariant } from '@/components/atoms';

// Variants: default, primary, success, warning, danger
// Sizes: sm, md, lg

<Badge variant="primary" size="md">
  Active
</Badge>

<Badge variant="success" dot>
  Online
</Badge>
```

## Card

```typescript
import { Card, CardHeader, CardBody, CardFooter } from '@/components/atoms';

<Card interactive>
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardBody>
    <p>Card content goes here</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## Spinner

```typescript
import { Spinner } from '@/components/atoms';

// Sizes: xs, sm, md, lg
<Spinner size="md" label="Loading..." />
```

## Common Props

### All Components
- `className?: string` - Additional CSS classes
- `disabled?: boolean` - Disable component
- Standard HTML attributes

### Form Components (Input, Select, Checkbox, Radio)
- `error?: string` - Error message
- `helperText?: string` - Helper/hint text
- `label?: string` - Label text
- `disabled?: boolean` - Disable state

### Components with Variants
- `variant: 'primary' | 'secondary' | ...` - Style variant
- `size?: 'xs' | 'sm' | 'md' | 'lg'` - Size variant

## Accessibility Features

✅ All components include:
- ARIA attributes (role, aria-label, aria-describedby)
- Keyboard navigation support
- Focus indicators
- Screen reader support
- Semantic HTML
- Color contrast compliance (WCAG AA)

## Styling

All components use:
- CSS custom properties for theming
- Responsive design by default
- SCSS with BEM naming
- Smooth transitions
- Dark mode ready

### Custom Properties (in globals.scss)
```scss
--primary-500, --primary-600, --primary-700
--gray-50, --gray-100, --gray-300, --gray-400, --gray-700
--red-500, --red-600
--green-500, --green-600
--yellow-500, --yellow-600
```

## Import Pattern

```typescript
// ✅ Recommended - Tree-shakeable
import { Button, Input, Select } from '@/components/atoms';

// ✅ Also works - Individual imports
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
```

## Next: Molecules and Organisms

### Molecules (in progress)
- Pagination ✅ (complete)
- Form (composition of atoms)
- SearchForm (Input + Button + debounce)
- Modal (Card-based)

### Organisms (planned)
- Header (navigation)
- Sidebar (menu)
- Footer (links)

---

Use these atoms as building blocks for larger components and pages. All components are fully typed with TypeScript and production-ready.
