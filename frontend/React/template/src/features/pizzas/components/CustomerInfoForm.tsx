/**
 * Customer Information Form Component
 * Using React Hook Form + Zod for validation
 * Utilizes reusable FormInput, FormEmail, FormTelephone components with type-safe CSS Modules
 */

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormDisclaimer, FormEmail, FormInput, FormTelephone, SubmitButton } from '@/components/ui';
import { setCustomerInfo } from '../../../store/cartStore';
import { type CustomerInfoFormData, customerInfoSchema } from '../validation/schemas';
import styles from './CustomerInfoForm.module.scss';

/**
 * Typed CSS class names - ensures autocomplete and type safety
 */
type CustomerInfoFormStyles = {
  form: string;
  title: string;
};

interface CustomerInfoFormProps {
  onSubmit?: (data: CustomerInfoFormData) => void | Promise<void>;
  isLoading?: boolean;
}

/**
 * CustomerInfoForm
 * Form for collecting customer delivery information
 * Uses react-hook-form with zod schema validation
 */
export const CustomerInfoForm = ({ onSubmit, isLoading = false }: CustomerInfoFormProps) => {
  const typedStyles = styles as CustomerInfoFormStyles;

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
    <form onSubmit={handleSubmit(handleFormSubmit)} className={typedStyles.form} noValidate>
      <h2 className={typedStyles.title}>Delivery Information</h2>

      <FormInput
        label='Full Name'
        registration={register('name')}
        error={errors.name}
        placeholder='John Doe'
        disabled={isSubmittingForm}
      />

      <FormEmail
        label='Email Address'
        registration={register('email')}
        error={errors.email}
        placeholder='john@example.com'
        disabled={isSubmittingForm}
      />

      <FormTelephone
        label='Phone Number'
        registration={register('phone')}
        error={errors.phone}
        placeholder='(555) 123-4567'
        disabled={isSubmittingForm}
      />

      <SubmitButton
        label='Continue to Payment'
        isLoading={isSubmittingForm}
        loadingLabel='Processing...'
      />

      <FormDisclaimer />
    </form>
  );
};

export default CustomerInfoForm;
