/**
 * Spinner Atom Component
 * Loading indicator for async operations
 * Accessibility-first design with ARIA attributes
 */

import { forwardRef, type HTMLAttributes } from 'react';
import './Spinner.scss';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the spinner */
  size?: SpinnerSize;

  /** Label for accessibility */
  label?: string;

  /** Show label text next to spinner */
  showLabel?: boolean;
}

/**
 * Spinner Component
 * Accessible loading spinner with customizable size
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', label = 'Loading', showLabel = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={['spinner', `spinner--${size}`, className].filter(Boolean).join(' ')}
      role="status"
      aria-live="polite"
      aria-label={label}
      {...props}
    >
      <div className="spinner__ring" />
      {showLabel && <span className="spinner__label">{label}</span>}
    </div>
  )
);

Spinner.displayName = 'Spinner';
