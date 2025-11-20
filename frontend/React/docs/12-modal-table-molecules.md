# 🧩 Modal & Table Molecules - Complete Guide

## Overview

Modal and Table molecules provide complete, production-ready solutions for dialogs and data display with built-in sorting, loading states, and full accessibility.

---

## Modal Molecule

### Purpose

Complete dialog/modal solution with:
- Portal rendering outside DOM tree
- Backdrop with click-outside closing
- Keyboard support (Escape to close)
- Focus management
- Smooth animations
- Full ARIA accessibility
- Multiple size variants

### Features

✅ **3 Sub-Components**:
- `Modal` - Main container with portal rendering
- `Modal.Body` - Content area with scrolling
- `Modal.Footer` - Action buttons area

✅ **Size Variants**:
- `sm` (384px) - Small dialogs
- `md` (512px) - Default, recommended
- `lg` (640px) - Large dialogs
- `xl` (896px) - Extra large dialogs

✅ **Accessibility**:
- `role="dialog"` and `aria-modal="true"`
- Keyboard navigation (Escape key)
- Focus management
- Backdrop blur effect
- Semantic HTML structure

✅ **Features**:
- Auto-disable body scroll
- Smooth fade-in animation
- Custom header with close button
- Responsive design (full-screen on mobile)
- Portal rendering (outside DOM hierarchy)

### Component API

#### Modal Component

```typescript
interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  /** Control modal visibility */
  isOpen: boolean;

  /** Called when modal should close */
  onClose: () => void;

  /** Modal title (shown in header) */
  title?: string;

  /** Modal content */
  children: ReactNode;

  /** Size of modal (default: md) */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /** Close button in header (default: true) */
  showCloseButton?: boolean;

  /** Close on backdrop click (default: true) */
  closeOnBackdropClick?: boolean;

  /** Close on Escape key (default: true) */
  closeOnEscape?: boolean;

  /** Disable backdrop scrolling (default: true) */
  disableBackdropScroll?: boolean;

  /** CSS class name */
  className?: string;
}
```

### Usage Examples

#### Basic Modal

```tsx
import { useState } from 'react';
import { Modal } from '@/components/molecules/Modal';
import { Button } from '@/components/atoms';

export function BasicModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Welcome">
        <Modal.Body>
          This is a modal dialog with portal rendering and full accessibility.
        </Modal.Body>
        <Modal.Footer align="right">
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
```

#### Confirmation Dialog

```tsx
<Modal
  isOpen={showConfirm}
  onClose={handleClose}
  title="Delete Item?"
  size="sm"
  closeOnBackdropClick={false}
>
  <Modal.Body>
    Are you sure you want to delete this item? This action cannot be undone.
  </Modal.Body>
  <Modal.Footer align="between">
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  </Modal.Footer>
</Modal>
```

#### Form Modal

```tsx
<Modal isOpen={isOpen} onClose={onClose} title="Create User" size="lg">
  <Modal.Body>
    <Form columns={2}>
      <FormField label="Name" required id="name">
        <Input id="name" />
      </FormField>
      <FormField label="Email" required id="email">
        <Input id="email" type="email" />
      </FormField>
    </Form>
  </Modal.Body>
  <Modal.Footer align="right">
    <Button variant="secondary" onClick={onClose}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleCreate}>
      Create
    </Button>
  </Modal.Footer>
</Modal>
```

---

## Table Molecule

### Purpose

Complete data table solution with:
- Sortable columns with visual indicators
- Loading state management
- Empty state handling
- Responsive design (horizontal scroll on mobile)
- Striped and hover effects
- Full ARIA attributes
- Keyboard navigation support

### Features

✅ **5 Sub-Components**:
- `Table` - Main container
- `Table.Head` - Table header
- `Table.Body` - Table body
- `Table.Row` - Table row
- `Table.Cell` - Table data cell
- `Table.HeaderCell` - Header cell with sort support

✅ **Built-in Features**:
- Sortable columns with direction indicator
- Loading spinner during data fetch
- Empty state messaging
- Striped rows option
- Hover effects
- Compact mode for condensed display
- Responsive horizontal scroll

✅ **Accessibility**:
- ARIA table semantics
- `aria-sort` for column state
- Loading state announced with `aria-busy`
- Keyboard accessible (Tab, Enter)
- Screen reader support

✅ **Responsive Design**:
- Horizontal scroll on mobile
- Full-width on desktop
- Stack layout support for mobile

### Component API

#### Table Component

```typescript
interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Table data for accessibility announcements */
  data?: unknown[];

  /** Show loading state */
  isLoading?: boolean;

  /** Empty state message */
  emptyMessage?: string;

  /** Striped rows (default: true) */
  striped?: boolean;

  /** Show hover effects (default: true) */
  hoverable?: boolean;

  /** Compact padding (default: false) */
  compact?: boolean;

  /** Called when column is sorted */
  onSort?: (column: string, direction: SortDirection) => void;

  /** CSS class name */
  className?: string;

  /** Table content */
  children: ReactNode;
}
```

#### Table.HeaderCell Component

```typescript
interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Cell content */
  children: ReactNode;

  /** Enable sorting for this column */
  sortable?: boolean;

  /** Column identifier for sorting */
  column?: string;

  /** Current sort direction */
  sortDirection?: SortDirection;

  /** Called when sorted */
  onSort?: (column: string, direction: SortDirection) => void;

  /** Text alignment */
  align?: 'left' | 'center' | 'right';

  /** CSS class name */
  className?: string;
}
```

### Usage Examples

#### Basic Table

```tsx
import { Table } from '@/components/molecules/Table';

export function BasicTable() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  return (
    <Table data={users}>
      <Table.Head>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
      </Table.Head>
      <Table.Body>
        {users.map(user => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
```

#### Sortable Table

```tsx
import { useState } from 'react';
import { Table } from '@/components/molecules/Table';

export function SortableTable() {
  const [data, setData] = useState(initialUsers);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isLoading, setIsLoading] = useState(false);

  const handleSort = (column, direction) => {
    setSortColumn(column);
    setSortDirection(direction);

    // Simulate sorting
    setIsLoading(true);
    setTimeout(() => {
      const sorted = [...data].sort((a, b) => {
        const aVal = a[column];
        const bVal = b[column];

        if (direction === 'asc') {
          return aVal > bVal ? 1 : -1;
        }
        return aVal < bVal ? 1 : -1;
      });

      setData(sorted);
      setIsLoading(false);
    }, 500);
  };

  return (
    <Table data={data} isLoading={isLoading} onSort={handleSort}>
      <Table.Head>
        <Table.HeaderCell
          sortable
          column="name"
          sortDirection={sortColumn === 'name' ? sortDirection : null}
          onSort={handleSort}
        >
          Name
        </Table.HeaderCell>
        <Table.HeaderCell
          sortable
          column="email"
          sortDirection={sortColumn === 'email' ? sortDirection : null}
          onSort={handleSort}
        >
          Email
        </Table.HeaderCell>
        <Table.HeaderCell align="center">Status</Table.HeaderCell>
      </Table.Head>
      <Table.Body>
        {data.map(user => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell align="center">
              <Badge variant="success">Active</Badge>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
```

#### Table with Pagination

```tsx
import { useState } from 'react';
import { Table } from '@/components/molecules/Table';
import { Pagination } from '@/components/molecules/Pagination';

export function PaginatedTable() {
  const allUsers = [...]; // All users
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = allUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Table data={paginatedUsers}>
        <Table.Head>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
        </Table.Head>
        <Table.Body>
          {paginatedUsers.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}
```

#### Table with Row Selection

```tsx
const [selectedRows, setSelectedRows] = useState(new Set());

<Table data={users}>
  <Table.Head>
    <Table.HeaderCell>
      <input
        type="checkbox"
        checked={selectedRows.size === users.length}
        onChange={e => {
          if (e.target.checked) {
            setSelectedRows(new Set(users.map(u => u.id)));
          } else {
            setSelectedRows(new Set());
          }
        }}
      />
    </Table.HeaderCell>
    <Table.HeaderCell>Name</Table.HeaderCell>
  </Table.Head>
  <Table.Body>
    {users.map(user => (
      <Table.Row
        key={user.id}
        selected={selectedRows.has(user.id)}
        onClick={() => {
          const updated = new Set(selectedRows);
          if (updated.has(user.id)) {
            updated.delete(user.id);
          } else {
            updated.add(user.id);
          }
          setSelectedRows(updated);
        }}
      >
        <Table.Cell>
          <input
            type="checkbox"
            checked={selectedRows.has(user.id)}
            onChange={() => {}}
          />
        </Table.Cell>
        <Table.Cell>{user.name}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

---

## Styling & Customization

### CSS Variables Used

Both molecules use theme CSS variables:

```scss
/* Colors */
--color-background
--color-border
--color-text-primary
--color-text-secondary
--color-primary
--color-primary-light
--color-neutral-50
--color-neutral-100
--color-neutral-800
--color-neutral-900

/* Typography */
--typography-heading-4-size
--typography-body-1-size
--typography-body-2-size
--typography-caption-size

/* Spacing */
--spacing-1, --spacing-2, --spacing-3, --spacing-4, --spacing-6

/* Animations */
--transition-fast
--border-radius-md
--border-radius-lg
```

### Responsive Design

**Modal**:
- Desktop: Fixed width based on size variant
- Tablet: 90% width
- Mobile: Full-width with padding (sm/md/lg/xl all become full-width)

**Table**:
- Desktop: Full-width with responsive cell padding
- Tablet: Horizontal scroll maintained
- Mobile: Compact mode, horizontal scroll, or stack layout

---

## Accessibility Checklist

### Modal

- ✅ `role="dialog"` and `aria-modal="true"`
- ✅ Title linked with `aria-labelledby`
- ✅ Keyboard support (Escape to close)
- ✅ Focus management and body scroll prevention
- ✅ Semantic HTML (header, body, footer sections)
- ✅ Close button with proper ARIA label
- ✅ Backdrop with proper z-index management

### Table

- ✅ Semantic table structure (thead, tbody, tr, td, th)
- ✅ `aria-sort` on sortable headers
- ✅ `aria-busy` during loading
- ✅ Keyboard navigation (Tab, Enter on headers)
- ✅ Column alignment accessibility
- ✅ Row selection with ARIA attributes
- ✅ Empty state messaging
- ✅ Screen reader friendly sort indicators

---

## Integration Patterns

### Modal with Form

```tsx
<Modal isOpen={isOpen} onClose={onClose} title="Edit User">
  <Modal.Body>
    <Form columns={1}>
      <FormField label="Name" id="name">
        <Input id="name" defaultValue={user.name} />
      </FormField>
    </Form>
  </Modal.Body>
  <Modal.Footer align="right">
    <Button onClick={onClose}>Cancel</Button>
    <Button variant="primary" onClick={handleSave}>Save</Button>
  </Modal.Footer>
</Modal>
```

### Table with Modal Actions

```tsx
const [selectedUser, setSelectedUser] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

<Table data={users}>
  {/* ... */}
  <Table.Body>
    {users.map(user => (
      <Table.Row key={user.id}>
        {/* ... */}
        <Table.Cell align="right">
          <Button
            size="sm"
            onClick={() => {
              setSelectedUser(user);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>

<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit User">
  {selectedUser && (
    <>
      <Modal.Body>
        <Form>
          <FormField label="Name" id="name">
            <Input id="name" defaultValue={selectedUser.name} />
          </FormField>
        </Form>
      </Modal.Body>
      <Modal.Footer align="right">
        <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </>
  )}
</Modal>
```

---

## Testing

### Modal Testing

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '@/components/molecules/Modal';

test('renders modal when isOpen is true', () => {
  render(
    <Modal isOpen={true} onClose={() => {}} title="Test Modal">
      <Modal.Body>Content</Modal.Body>
    </Modal>
  );

  expect(screen.getByText('Test Modal')).toBeInTheDocument();
  expect(screen.getByText('Content')).toBeInTheDocument();
});

test('closes on escape key', async () => {
  const onClose = vi.fn();
  render(
    <Modal isOpen={true} onClose={onClose} title="Test">
      <Modal.Body>Content</Modal.Body>
    </Modal>
  );

  await userEvent.keyboard('{Escape}');
  expect(onClose).toHaveBeenCalled();
});
```

### Table Testing

```tsx
test('sorts column when header clicked', async () => {
  const onSort = vi.fn();
  render(
    <Table onSort={onSort}>
      <Table.Head>
        <Table.HeaderCell sortable column="name" onSort={onSort}>
          Name
        </Table.HeaderCell>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>John</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );

  await userEvent.click(screen.getByText('Name'));
  expect(onSort).toHaveBeenCalledWith('name', 'asc');
});
```

---

## Status

| Component        | Status     | Lines    | Features                     |
| ---------------- | ---------- | -------- | ---------------------------- |
| Modal            | ✅ Complete | 240      | Portal, keyboard, animations |
| Modal.Body       | ✅ Complete | Included | Scrollable content           |
| Modal.Footer     | ✅ Complete | Included | Flexible button layout       |
| Table            | ✅ Complete | 320      | Sorting, loading, responsive |
| Table.HeaderCell | ✅ Complete | Included | Sort indicators              |

**Total**: 5 molecules, 560+ lines, 100% TypeScript, WCAG 2.1 AA compliant

---

## Files

```
src/components/molecules/
├── Modal/
│   ├── Modal.tsx (240 lines)
│   ├── Modal.scss (280 lines)
│   └── index.ts (2 lines)
├── Table/
│   ├── Table.tsx (320 lines)
│   ├── Table.scss (300 lines)
│   └── index.ts (8 lines)
└── index.ts (exports updated)
```
