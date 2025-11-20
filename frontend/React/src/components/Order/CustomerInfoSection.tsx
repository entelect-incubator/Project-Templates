import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormEmail, FormInput, FormTelephone } from '@/components/ui';
import type { CustomerInfoFormData } from '@/features/pizzas/schemas/order';
import styles from './CustomerInfoSection.module.scss';

/**
 * Type-safe CSS Modules interface for CustomerInfoSection styles
 */
type CustomerInfoSectionStyles = {
  section: string;
  title: string;
  formRow: string;
  formField: string;
  label: string;
  input: string;
  errorMessage: string;
};

interface CustomerInfoSectionProps {
  register: UseFormRegister<CustomerInfoFormData>;
  errors: FieldErrors<CustomerInfoFormData>;
}

/**
 * CustomerInfoSection component
 * Renders form fields for delivery information with react-hook-form integration
 */
export function CustomerInfoSection({ register, errors }: CustomerInfoSectionProps) {
  const typedStyles = styles as CustomerInfoSectionStyles;

  return (
    <div className={typedStyles.section}>
      <h3 className={typedStyles.title}>Delivery Information</h3>

      <div className={typedStyles.formRow}>
        <FormInput
          id='name'
          label='Full Name'
          required
          placeholder='John Doe'
          registration={register('name')}
          error={errors.name}
        />

        <FormEmail
          id='email'
          label='Email Address'
          required
          placeholder='john@example.com'
          registration={register('email')}
          error={errors.email}
        />
      </div>

      <div className={typedStyles.formRow}>
        <FormTelephone
          id='phone'
          label='Phone Number'
          required
          placeholder='(555) 123-4567'
          registration={register('phone')}
          error={errors.phone}
        />
      </div>

      <FormInput
        id='address'
        label='Address'
        required
        placeholder='123 Main St'
        registration={register('address')}
        error={errors.address}
      />

      <div className={typedStyles.formRow}>
        <FormInput
          id='city'
          label='City'
          required
          placeholder='New York'
          registration={register('city')}
          error={errors.city}
        />

        <FormInput
          id='zipCode'
          label='Zip Code'
          required
          placeholder='10001'
          registration={register('zipCode')}
          error={errors.zipCode}
        />
      </div>
    </div>
  );
}
