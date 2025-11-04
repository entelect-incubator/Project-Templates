import React, { forwardRef } from 'react';
import './Sidebar.scss';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Sidebar navigation content */
  children: React.ReactNode;
  /** Sidebar width variant */
  width?: 'sm' | 'md' | 'lg';
  /** Make sidebar collapsible */
  collapsible?: boolean;
  /** Initial collapsed state */
  isCollapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapseChange?: (isCollapsed: boolean) => void;
  /** Background style */
  variant?: 'light' | 'dark';
  /** Position relative to content */
  position?: 'left' | 'right';
  /** Show divider/border */
  bordered?: boolean;
}

/**
 * Sidebar Organism Component
 *
 * Side navigation panel typically containing main menu items.
 * Supports collapsible state and multiple width/style options.
 *
 * @example
 * ```tsx
 * <Sidebar collapsible width="md">
 *   <nav>
 *     <a href="/dashboard">Dashboard</a>
 *     <a href="/users">Users</a>
 *   </nav>
 * </Sidebar>
 * ```
 */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      children,
      width = 'md',
      collapsible = false,
      isCollapsed = false,
      onCollapseChange,
      variant = 'light',
      position = 'left',
      bordered = true,
      className,
      ...props
    },
    ref
  ) => {
    const [collapsed, setCollapsed] = React.useState(isCollapsed);

    const handleToggle = () => {
      const newState = !collapsed;
      setCollapsed(newState);
      onCollapseChange?.(newState);
    };

    return (
      <aside
        ref={ref}
        className={`sidebar sidebar--${width} sidebar--${variant} sidebar--${position} ${
          collapsed ? 'sidebar--collapsed' : ''
        } ${bordered ? 'sidebar--bordered' : ''} ${className || ''}`}
        {...props}
      >
        {collapsible && (
          <button
            className="sidebar__toggle"
            onClick={handleToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-pressed={collapsed}
          >
            <span className="sidebar__toggle-icon" />
          </button>
        )}

        <div className="sidebar__content">{children}</div>
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';
