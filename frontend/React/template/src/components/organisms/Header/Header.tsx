import React, { forwardRef } from 'react';
import './Header.scss';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand/logo area content */
  brand?: React.ReactNode;
  /** Main navigation content */
  nav?: React.ReactNode;
  /** User menu or actions area */
  actions?: React.ReactNode;
  /** Sticky header positioning */
  sticky?: boolean;
  /** Header height variant */
  height?: 'sm' | 'md' | 'lg';
  /** Background style */
  variant?: 'light' | 'dark' | 'primary';
}

/**
 * Header Organism Component
 *
 * Main page header for navigation, branding, and user actions.
 * Typically contains logo, main nav, and user menu.
 *
 * @example
 * ```tsx
 * <Header
 *   brand={<Logo />}
 *   nav={<Navigation />}
 *   actions={<UserMenu />}
 *   sticky
 * />
 * ```
 */
export const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    { brand, nav, actions, sticky = false, height = 'md', variant = 'light', className, ...props },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={`header header--${height} header--${variant} ${
          sticky ? 'header--sticky' : ''
        } ${className || ''}`}
        {...props}
      >
        <div className="header__container">
          {brand && <div className="header__brand">{brand}</div>}

          {nav && <nav className="header__nav">{nav}</nav>}

          {actions && <div className="header__actions">{actions}</div>}
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';
