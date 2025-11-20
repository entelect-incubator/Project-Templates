/**
 * Order Lookup Forms Component
 * Handles both ID-based and Name+ID order lookup forms
 */

import type { FormEvent } from 'react';
import styles from './OrderLookupForms.module.scss';

interface OrderLookupFormsProps {
  // Form state
  orderIdInput: string;
  customerNameInput: string;
  isLoading: boolean;
  error: string | null;

  // Form handlers
  onOrderIdChange: (value: string) => void;
  onCustomerNameChange: (value: string) => void;
  onTrackById: (e: FormEvent<HTMLFormElement>) => void;
  onTrackByName: (e: FormEvent<HTMLFormElement>) => void;
  onClearError: () => void;

  // Style props
  className?: string;
}

export function OrderLookupForms({
  orderIdInput,
  customerNameInput,
  isLoading,
  error,
  onOrderIdChange,
  onCustomerNameChange,
  onTrackById,
  onTrackByName,
  onClearError,
  className = '',
}: OrderLookupFormsProps) {
  const combinedClassName = `${styles.formsContainer} ${className}`.trim();

  const handleOrderIdChange = (value: string) => {
    onOrderIdChange(value);
    if (error) onClearError();
  };

  const handleCustomerNameChange = (value: string) => {
    onCustomerNameChange(value);
    if (error) onClearError();
  };

  return (
    <div className={combinedClassName}>
      {/* Track by ID Form */}
      <form onSubmit={onTrackById} className={styles.form} id='current-order-panel' role='tabpanel'>
        <div className={styles.formGroup}>
          <label htmlFor='orderId' className={styles.label}>
            Order ID
          </label>
          <input
            id='orderId'
            type='text'
            placeholder='Enter your order ID'
            value={orderIdInput}
            onChange={(e) => handleOrderIdChange(e.target.value)}
            disabled={isLoading}
            className={styles.input}
            aria-describedby={error ? 'error-message' : undefined}
          />
        </div>

        <button
          type='submit'
          disabled={isLoading || !orderIdInput.trim()}
          className={styles.searchButton}
        >
          {isLoading ? 'Loading...' : 'Track Order'}
        </button>
      </form>

      {/* Track by Name + ID Form */}
      <form
        onSubmit={onTrackByName}
        className={styles.form}
        id='lookup-order-panel'
        role='tabpanel'
      >
        <h3 className={styles.formTitle}>Or track by name and ID</h3>

        <div className={styles.formGroup}>
          <label htmlFor='customerName' className={styles.label}>
            Customer Name
          </label>
          <input
            id='customerName'
            type='text'
            placeholder='Enter your name'
            value={customerNameInput}
            onChange={(e) => handleCustomerNameChange(e.target.value)}
            disabled={isLoading}
            className={styles.input}
            aria-describedby={error ? 'error-message' : undefined}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='orderIdByName' className={styles.label}>
            Order ID
          </label>
          <input
            id='orderIdByName'
            type='text'
            placeholder='Enter order ID'
            value={orderIdInput}
            onChange={(e) => handleOrderIdChange(e.target.value)}
            disabled={isLoading}
            className={styles.input}
            aria-describedby={error ? 'error-message' : undefined}
          />
        </div>

        <button
          type='submit'
          disabled={isLoading || !customerNameInput.trim() || !orderIdInput.trim()}
          className={styles.searchButton}
        >
          {isLoading ? 'Loading...' : 'Find Order'}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className={styles.error} role='alert' id='error-message'>
          {error}
        </div>
      )}
    </div>
  );
}
