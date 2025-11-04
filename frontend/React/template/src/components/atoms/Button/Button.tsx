/**
 * Button Atom Component
 * Reusable button component with multiple variants and states
 * Accessibility-first design with proper ARIA attributes
 */

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: ButtonVariant;

  /** Size of the button */
  size?: ButtonSize;

  /** Is button in loading state */
  isLoading?: boolean;

  /** Is button full width */
  fullWidth?: boolean;

  /** Content displayed while loading */
  loadingContent?: ReactNode;

  /** Left icon or element */
  leftIcon?: ReactNode;

  /** Right icon or element */
  rightIcon?: ReactNode;
}

/**
 * Button Component
 * Provides accessible, themeable button functionality
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      loadingContent,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={[
          'btn',
          `btn--${variant}`,
          `btn--${size}`,
          fullWidth && 'btn--fullwidth',
          isLoading && 'btn--loading',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {leftIcon && <span className="btn__icon btn__icon--left">{leftIcon}</span>}

        <span className="btn__content">
          {isLoading && loadingContent ? loadingContent : children}
        </span>

        {rightIcon && !isLoading && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
