import React, { forwardRef, useState, useRef, useEffect } from 'react';
import './Select.scss';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The label for the select */
  label?: string;
  /** The options to display */
  options: SelectOption[];
  /** The current value */
  value?: string | number | null;
  /** Callback when value changes */
  onChange?: (value: string | number | null) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Error message to display */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Disable the select */
  disabled?: boolean;
  /** Show loading state */
  isLoading?: boolean;
  /** Allow clearing the value */
  clearable?: boolean;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      placeholder = 'Select an option...',
      error,
      helperText,
      disabled = false,
      isLoading = false,
      clearable = true,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Get display label from current value
    const displayLabel = React.useMemo(() => {
      if (value === null || value === undefined) return placeholder;
      const selected = options.find((opt) => opt.value === value);
      return selected?.label || placeholder;
    }, [value, options, placeholder]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    const handleOptionClick = (optionValue: string | number) => {
      if (value === optionValue) {
        if (clearable) {
          onChange?.(null);
        }
      } else {
        onChange?.(optionValue);
      }
      setIsOpen(false);
      buttonRef.current?.focus();
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(null);
    };

    const selectId = React.useId();
    const errorId = error ? `${selectId}-error` : undefined;

    return (
      <div ref={ref} className={`select-wrapper ${className || ''}`} {...props}>
        {label && (
          <label htmlFor={selectId} className="select-wrapper__label">
            {label}
          </label>
        )}

        <div
          ref={containerRef}
          className={`select ${isOpen ? 'select--open' : ''} ${
            disabled ? 'select--disabled' : ''
          } ${error ? 'select--error' : ''}`}
        >
          <button
            ref={buttonRef}
            id={selectId}
            type="button"
            className="select__button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={disabled || isLoading}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-describedby={errorId}
          >
            <span className="select__value">{displayLabel}</span>

            {isLoading ? (
              <span className="select__spinner" aria-hidden="true">
                ⟳
              </span>
            ) : value !== null && value !== undefined && clearable ? (
              <button
                type="button"
                className="select__clear"
                onClick={handleClear}
                aria-label="Clear selection"
                tabIndex={-1}
              >
                ✕
              </button>
            ) : (
              <span className="select__icon" aria-hidden="true">
                ⌄
              </span>
            )}
          </button>

          {isOpen && (
            <div className="select__dropdown" role="listbox">
              {options.length === 0 ? (
                <div className="select__no-options">No options available</div>
              ) : (
                options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`select__option ${
                      value === option.value ? 'select__option--selected' : ''
                    } ${option.disabled ? 'select__option--disabled' : ''}`}
                    onClick={() => !option.disabled && handleOptionClick(option.value)}
                    disabled={option.disabled}
                    role="option"
                    aria-selected={value === option.value}
                  >
                    {value === option.value && (
                      <span className="select__checkmark" aria-hidden="true">
                        ✓
                      </span>
                    )}
                    {option.label}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {helperText && !error && <div className="select-wrapper__helper">{helperText}</div>}

        {error && (
          <div id={errorId} className="select-wrapper__error" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
