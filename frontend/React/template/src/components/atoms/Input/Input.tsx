/**
 * Input Atom Component
 * Reusable text input with label, error states, and accessibility
 */

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import './Input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above input */
  label?: string;

  /** Error message displayed below input */
  error?: string;

  /** Helper text displayed below input */
  helperText?: string;

  /** Left icon or element */
  leftIcon?: ReactNode;

  /** Right icon or element */
  rightIcon?: ReactNode;

  /** Is input required */
  required?: boolean;

  /** Is input in loading state */
  isLoading?: boolean;
}

/**
 * Input Component
 * Accessible text input with proper ARIA attributes and error states
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      required,
      isLoading,
      id,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isInvalid = !!error;
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
            {required && (
              <span className="input-label__required" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <div
          className={['input-container', isInvalid && 'input-container--error']
            .filter(Boolean)
            .join(' ')}
        >
          {leftIcon && <span className="input-icon input-icon--left">{leftIcon}</span>}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled || isLoading}
            className={['input', isInvalid && 'input--error', className].filter(Boolean).join(' ')}
            aria-invalid={isInvalid}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            aria-busy={isLoading}
            {...props}
          />

          {rightIcon && <span className="input-icon input-icon--right">{rightIcon}</span>}

          {isLoading && (
            <span className="input-loading" aria-label="loading">
              ⏳
            </span>
          )}
        </div>

        {error && (
          <p id={errorId} className="input-error" role="alert">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="input-helper">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
