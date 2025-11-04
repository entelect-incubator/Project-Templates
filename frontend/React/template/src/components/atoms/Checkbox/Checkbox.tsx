import React, { forwardRef } from 'react';
import './Checkbox.scss';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text for the checkbox */
  label?: string;
  /** Helper text below the checkbox */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Intermediate state (for parent/child relationships) */
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, helperText, error, indeterminate = false, disabled = false, className, id, ...props },
    ref
  ) => {
    const checkboxId = id || React.useId();
    const errorId = error ? `${checkboxId}-error` : undefined;

    return (
      <div className={`checkbox-wrapper ${className || ''}`}>
        <div className="checkbox__container">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className="checkbox__input"
            disabled={disabled}
            aria-describedby={errorId}
            {...props}
          />
          <label htmlFor={checkboxId} className="checkbox__label">
            <span className="checkbox__box">
              {indeterminate ? (
                <span className="checkbox__indeterminate" aria-hidden="true">
                  −
                </span>
              ) : props.checked ? (
                <span className="checkbox__check" aria-hidden="true">
                  ✓
                </span>
              ) : null}
            </span>
            {label && <span className="checkbox__text">{label}</span>}
          </label>
        </div>

        {helperText && !error && <div className="checkbox-wrapper__helper">{helperText}</div>}

        {error && (
          <div id={errorId} className="checkbox-wrapper__error" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
