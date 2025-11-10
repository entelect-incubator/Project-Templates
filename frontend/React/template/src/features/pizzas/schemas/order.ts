/**
 * Order Form Schema using Zod
 * Validation for customer information and order details
 */

import { z } from 'zod';

export const customerInfoSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),

  email: z.string().email('Please enter a valid email address'),

  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-+()]+$/, 'Please enter a valid phone number'),

  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must be less than 100 characters'),

  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters'),

  zipCode: z
    .string()
    .min(3, 'Zip code must be at least 3 characters')
    .max(10, 'Zip code must be less than 10 characters')
    .regex(/^[\d\-\s]+$/, 'Please enter a valid zip code'),
});

export type CustomerInfoFormData = z.infer<typeof customerInfoSchema>;

export const orderFormSchema = z.object({
  customer: customerInfoSchema,
  deliveryInstructions: z
    .string()
    .max(200, 'Instructions must be less than 200 characters')
    .optional(),
  paymentMethod: z.enum(['cash', 'card', 'paypal']).refine((val) => val, {
    message: 'Please select a payment method',
  }),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
