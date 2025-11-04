import React, { forwardRef } from 'react';
import './Radio.scss';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label text for the radio button */
  label?: string;
  /** Helper text below the radio */
  helperText?: string;
  /** Error message */
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, helperText, error, disabled = false, className, id, ...props }, ref) => {
    const radioId = id || React.useId();
    const errorId = error ? `${radioId}-error` : undefined;

    return (
      <div className={`radio-wrapper ${className || ''}`}>
        <div className="radio__container">
          <input
            ref={ref}
            id={radioId}
            type="radio"
            className="radio__input"
            disabled={disabled}
            aria-describedby={errorId}
            {...props}
          />
          <label htmlFor={radioId} className="radio__label">
            <span className="radio__circle">
              {props.checked && <span className="radio__dot" aria-hidden="true" />}
            </span>
            {label && <span className="radio__text">{label}</span>}
          </label>
        </div>

        {helperText && !error && <div className="radio-wrapper__helper">{helperText}</div>}

        {error && (
          <div id={errorId} className="radio-wrapper__error" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

/**
 * RadioGroup component for managing multiple radio buttons
 */
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The name attribute for the radio group */
  name: string;
  /** The options to display */
  options: Array<{ value: string | number; label: string; disabled?: boolean }>;
  /** The current value */
  value?: string | number;
  /** Callback when value changes */
  onChange?: (value: string | number) => void;
  /** Disable all options */
  disabled?: boolean;
  /** Label for the group */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Direction of the group */
  direction?: 'vertical' | 'horizontal';
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      options,
      value,
      onChange,
      disabled = false,
      label,
      helperText,
      error,
      direction = 'vertical',
      className,
      ...props
    },
    ref
  ) => {
    const groupId = React.useId();
    const errorId = error ? `${groupId}-error` : undefined;

    return (
      <div ref={ref} className={`radio-group ${className || ''}`} {...props}>
        {label && (
          <div className="radio-group__label" id={`${groupId}-label`}>
            {label}
          </div>
        )}

        <div
          className={`radio-group__options radio-group__options--${direction}`}
          role="group"
          aria-labelledby={label ? `${groupId}-label` : undefined}
          aria-describedby={errorId}
        >
          {options.map((option) => (
            <Radio
              key={option.value}
              name={name}
              value={option.value}
              label={option.label}
              checked={value === option.value}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  onChange?.(option.value);
                }
              }}
              disabled={disabled || option.disabled}
              className="radio-group__radio"
            />
          ))}
        </div>

        {helperText && !error && <div className="radio-group__helper">{helperText}</div>}

        {error && (
          <div id={errorId} className="radio-group__error" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
