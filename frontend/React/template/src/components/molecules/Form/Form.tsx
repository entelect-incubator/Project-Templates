import { forwardRef } from 'react';
import type { ReactNode, FieldsetHTMLAttributes } from 'react';

/**
 * Form component - Wrapper for form atoms with validation and error handling
 *
 * Features:
 * - Fieldset-based layout for semantic HTML
 * - Optional legend for form title
 * - Flexible field grid system (1-3 columns)
 * - Validation state management
 * - Error display at form level
 * - Loading state for submission
 * - ARIA attributes for accessibility
 *
 * @example
 * ```tsx
 * <Form title="User Settings" columns={2}>
 *   <FormField label="Name" error={errors.name}>
 *     <Input type="text" {...register('name')} />
 *   </FormField>
 *   <FormField label="Email" error={errors.email}>
 *     <Input type="email" {...register('email')} />
 *   </FormField>
 * </Form>
 * ```
 */

export interface FormProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /** Title/legend for the form */
  title?: string;

  /** Number of columns for layout (1-3) */
  columns?: 1 | 2 | 3;

  /** Form-level error message */
  error?: string;

  /** Show form is loading/submitting */
  isLoading?: boolean;

  /** Form content/fields */
  children: ReactNode;

  /** CSS class name */
  className?: string;
}

export interface FormFieldProps {
  /** Label text for the field */
  label?: string;

  /** Error message for the field */
  error?: string;

  /** Helper/hint text */
  helperText?: string;

  /** Field is required */
  required?: boolean;

  /** Field content */
  children: ReactNode;

  /** CSS class name */
  className?: string;

  /** Optional field identifier for accessibility */
  id?: string;
}

/**
 * Form component - Main container with fieldset semantics
 */
export const Form = forwardRef<HTMLFieldSetElement, FormProps>(
  ({ title, columns = 1, error, isLoading = false, children, className = '', ...props }, ref) => {
    const columnClass = `form--cols-${columns}`;

    return (
      <fieldset
        ref={ref}
        className={`form ${columnClass} ${isLoading ? 'form--loading' : ''} ${className}`.trim()}
        disabled={isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {title && <legend className="form__title">{title}</legend>}

        {error && (
          <div className="form__error" role="alert" aria-live="polite">
            <svg
              className="form__error-icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="form__fields">{children}</div>
      </fieldset>
    );
  }
);

Form.displayName = 'Form';

/**
 * FormField component - Wrapper for a single form field with label and error handling
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, error, helperText, required = false, children, className = '', id, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`form-field ${error ? 'form-field--error' : ''} ${className}`.trim()}
        {...props}
      >
        {label && (
          <label htmlFor={id} className="form-field__label">
            <span>{label}</span>
            {required && (
              <span className="form-field__required" aria-label="required" title="Required field">
                *
              </span>
            )}
          </label>
        )}

        <div className="form-field__control">{children}</div>

        {error && (
          <div className="form-field__error" id={id ? `${id}-error` : undefined} role="alert">
            {error}
          </div>
        )}

        {helperText && !error && (
          <div className="form-field__helper" id={id ? `${id}-helper` : undefined}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

/**
 * FormSection component - Group related fields together
 * Useful for organizing large forms into sections
 */
export interface FormSectionProps {
  /** Section title */
  title?: string;

  /** Description for the section */
  description?: string;

  /** Section content */
  children: ReactNode;

  /** CSS class name */
  className?: string;
}

export const FormSection = forwardRef<HTMLDivElement, FormSectionProps>(
  ({ title, description, children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`form-section ${className}`.trim()} {...props}>
        {title && (
          <div className="form-section__header">
            <h3 className="form-section__title">{title}</h3>
            {description && <p className="form-section__description">{description}</p>}
          </div>
        )}

        <div className="form-section__content">{children}</div>
      </div>
    );
  }
);

FormSection.displayName = 'FormSection';
