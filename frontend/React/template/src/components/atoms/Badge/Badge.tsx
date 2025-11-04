/**
 * Badge Atom Component
 * Small label or indicator
 * Accessibility-first design
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import './Badge.scss';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant of the badge */
  variant?: BadgeVariant;

  /** Size of the badge */
  size?: BadgeSize;

  /** If true, makes badge look like a dot/pill */
  dot?: boolean;

  /** Icon or element to display before text */
  icon?: ReactNode;

  /** Content of the badge */
  children: ReactNode;
}

/**
 * Badge Component
 * Small label or indicator for status, count, or category
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', dot = false, icon, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={['badge', `badge--${variant}`, `badge--${size}`, dot && 'badge--dot', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {icon && <span className="badge__icon">{icon}</span>}
      <span className="badge__content">{children}</span>
    </span>
  )
);

Badge.displayName = 'Badge';
