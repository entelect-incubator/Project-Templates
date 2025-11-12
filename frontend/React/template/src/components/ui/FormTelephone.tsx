import type { InputHTMLAttributes } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './FormInput.module.scss';

interface FormTelephoneProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError | undefined;
  registration: UseFormRegisterReturn;
}

export function FormTelephone({ label, error, registration, ...props }: FormTelephoneProps) {
  return (
    <div className={styles['formGroup']}>
      <label htmlFor={props.id} className={styles['label']}>
        {label} {props.required && '*'}
      </label>
      <input
        type="tel"
        {...registration}
        {...props}
        className={`${styles['input']} ${error ? styles['error'] : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
      />
      {error && (
        <span id={`${props.id}-error`} className={styles['errorMessage']}>
          {error.message}
        </span>
      )}
    </div>
  );
}
