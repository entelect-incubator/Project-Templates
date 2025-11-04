# Organism Components - Layout & Structure

Complete set of layout organisms for building page structure following Atomic Design principles.

## Header Organism

Main page header component for navigation, branding, and user actions.

### Usage

```typescript
import { Header } from '@/components/organisms';
import Logo from './Logo';
import Navigation from './Navigation';
import UserMenu from './UserMenu';

<Header
  brand={<Logo />}
  nav={<Navigation />}
  actions={<UserMenu />}
  sticky
  height="md"
  variant="light"
/>
```

### Props

- `brand?: React.ReactNode` - Logo/brand area
- `nav?: React.ReactNode` - Main navigation content
- `actions?: React.ReactNode` - Right-side actions (user menu, buttons)
- `sticky?: boolean` - Sticky positioning (default: false)
- `height?: 'sm' | 'md' | 'lg'` - Height variant (default: 'md')
  - sm: 56px
  - md: 64px
  - lg: 80px
- `variant?: 'light' | 'dark' | 'primary'` - Background style (default: 'light')

### Features

- Responsive flexbox layout
- Sticky positioning support
- Multiple height and color variants
- Mobile-friendly navigation
- SEMantic HTML with `<header>` tag

---

## Sidebar Organism

Side navigation panel with optional collapse functionality.

### Usage

```typescript
import { Sidebar } from '@/components/organisms';

<Sidebar
  collapsible
  width="md"
  variant="light"
  position="left"
>
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a href="/users">Users</a>
    <a href="/settings">Settings</a>
  </nav>
</Sidebar>
```

### Props

- `children: React.ReactNode` - Sidebar content (navigation, menus)
- `width?: 'sm' | 'md' | 'lg'` - Width variant (default: 'md')
  - sm: 192px
  - md: 256px
  - lg: 320px
- `collapsible?: boolean` - Show collapse button (default: false)
- `isCollapsed?: boolean` - Initial collapsed state (default: false)
- `onCollapseChange?: (isCollapsed: boolean) => void` - Collapse state callback
- `variant?: 'light' | 'dark'` - Background style (default: 'light')
- `position?: 'left' | 'right'` - Position relative to content (default: 'left')
- `bordered?: boolean` - Show border/shadow (default: true)

### Features

- Collapsible with toggle button
- Smooth width transitions
- Scrollable content
- Mobile slide-out behavior
- Accessibility support (aria-label, aria-pressed)
- Custom scrollbar styling

### Collapsed State

When collapsed, sidebar shrinks to 64px showing only icons. Perfect for maximizing content space.

---

## Footer Organism

Page footer containing links, copyright, and additional information.

### Usage

```typescript
import { Footer, FooterColumn } from '@/components/organisms';

<Footer copyright="© 2024 Company Name" variant="dark" size="md">
  <FooterColumn title="Product">
    <ul>
      <li><a href="/features">Features</a></li>
      <li><a href="/pricing">Pricing</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </FooterColumn>
  <FooterColumn title="Legal">
    <ul>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
    </ul>
  </FooterColumn>
</Footer>
```

### Footer Props

- `children: React.ReactNode` - Footer content (FooterColumn components)
- `copyright?: string` - Copyright text (optional)
- `variant?: 'light' | 'dark'` - Background style (default: 'light')
- `size?: 'sm' | 'md' | 'lg'` - Padding size (default: 'md')
  - sm: 1.5rem padding
  - md: 2rem padding
  - lg: 3rem padding
- `bordered?: boolean` - Show top border/shadow (default: true)

### FooterColumn Props

- `title?: string` - Column heading
- `children?: React.ReactNode` - Column content (usually `<ul>` with links)

### Features

- Auto-grid multi-column layout
- Responsive column wrapping
- Copyright section
- Link styling with hover effects
- Focus indicators for accessibility
- Dark/light variants

---

## Layout Patterns

### Basic App Layout

```typescript
import { Header, Sidebar, Footer } from '@/components/organisms';

export function AppLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="app-container">
      <Header
        brand={<Logo />}
        nav={<MainNav />}
        actions={<UserMenu />}
        sticky
      />
      
      <div className="app-body">
        <Sidebar
          collapsible
          isCollapsed={sidebarCollapsed}
          onCollapseChange={setSidebarCollapsed}
        >
          <SideNav />
        </Sidebar>
        
        <main className="app-content">
          {children}
        </main>
      </div>
      
      <Footer copyright="© 2024">
        <FooterColumn title="Product">
          {/* links */}
        </FooterColumn>
      </Footer>
    </div>
  );
}
```

### CSS for App Container

```scss
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.app-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
```

---

## Styling & Customization

### CSS Custom Properties

All organisms use standard design tokens:

```scss
--primary-500, --primary-600, --primary-700
--gray-50, --gray-100, --gray-200, --gray-800, --gray-900
```

### Color Variants

**Light Theme:**
```scss
background-color: white;
border-color: var(--gray-200);
color: var(--gray-900);
```

**Dark Theme:**
```scss
background-color: var(--gray-900);
border-color: var(--gray-800);
color: white;
```

**Primary Theme:**
```scss
background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
color: white;
```

---

## Responsive Behavior

### Mobile Breakpoints

At `max-width: 768px`:

- **Header:**
  - Navigation hidden (typically replaced with hamburger menu)
  - Reduced padding and spacing

- **Sidebar:**
  - Fixed positioning
  - Slide-out animation
  - Full viewport height
  - Overlay behavior

- **Footer:**
  - Single column layout (or 2 columns max)
  - Reduced spacing and font sizes

---

## Accessibility

All organisms include:
- Semantic HTML (`<header>`, `<aside>`, `<footer>`)
- ARIA attributes (aria-label, aria-pressed, aria-expanded)
- Keyboard navigation
- Focus management
- Color contrast compliance (WCAG AA)
- Screen reader support

---

## Next: Molecules

**Upcoming Molecules:**
- Form - Wraps Input, Select, Checkbox with labels
- SearchForm - Debounced search with filters
- Modal - Dialog with Header, Body, Footer
- Table - Data table with sorting/pagination

---

## Next: Feature Components

After organisms, create feature-specific page components:
- Dashboard page
- User list page
- Settings page
- etc.

All following established Atomic Design patterns.
