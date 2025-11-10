/**
 * Customer Information Form Component
 * Using React Hook Form + Zod for validation
 */

import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerInfoSchema, type CustomerInfoFormData } from '../validation/schemas';
import { setCustomerInfo } from '../../../store/cartStore';
import styles from './CustomerInfoForm.module.scss';

interface CustomerInfoFormProps {
  onSubmit?: (data: CustomerInfoFormData) => void | Promise<void>;
  isLoading?: boolean;
}

export const CustomerInfoForm = ({ onSubmit, isLoading = false }: CustomerInfoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CustomerInfoFormData>({
    resolver: zodResolver(customerInfoSchema),
    mode: 'onBlur',
  });

  const handleFormSubmit = async (data: CustomerInfoFormData) => {
    // Update global state
    setCustomerInfo(data);

    // Call optional callback
    if (onSubmit) {
      await onSubmit(data);
    }

    // Reset form after submission
    reset();
  };

  const isSubmittingForm = isSubmitting || isLoading;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form} noValidate>
      <h2 className={styles.title}>Delivery Information</h2>

      {/* Name Field */}
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Full Name *
        </label>
        <input
          {...register('name')}
          id="name"
          type="text"
          placeholder="John Doe"
          className={`${styles.input} ${errors.name ? styles.error : ''}`}
          disabled={isSubmittingForm}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className={styles.errorMessage}>
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Email Field */}
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email Address *
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          placeholder="john@example.com"
          className={`${styles.input} ${errors.email ? styles.error : ''}`}
          disabled={isSubmittingForm}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className={styles.errorMessage}>
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Phone Field */}
      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.label}>
          Phone Number *
        </label>
        <input
          {...register('phone')}
          id="phone"
          type="tel"
          placeholder="(555) 123-4567"
          className={`${styles.input} ${errors.phone ? styles.error : ''}`}
          disabled={isSubmittingForm}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <span id="phone-error" className={styles.errorMessage}>
            {errors.phone.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className={styles.submitButton} disabled={isSubmittingForm}>
        {isSubmittingForm ? 'Processing...' : 'Continue to Payment'}
      </button>

      <p className={styles.disclaimer}>
        * Required fields. Your information is secure and will only be used for order delivery.
      </p>
    </form>
  );
};

export default CustomerInfoForm;
