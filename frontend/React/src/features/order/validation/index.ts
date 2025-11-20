/**
 * Order Validation Schemas
 * Using Zod for type-safe runtime validation of order-related data
 */

import { z } from 'zod';

// Customer Information Schema
export const customerInfoSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be at most 100 characters' })
    .trim(),

  email: z.string().email({ message: 'Invalid email address' }).toLowerCase().trim(),

  phone: z
    .string()
    .regex(/^[\d\-\s+()]+$/, {
      message: 'Invalid phone number format',
    })
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(20, { message: 'Phone number must be at most 20 characters' })
    .transform((val) => val.replace(/\D/g, '').slice(-10)),

  address: z
    .string()
    .min(5, { message: 'Address must be at least 5 characters' })
    .max(200, { message: 'Address must be at most 200 characters' })
    .trim(),

  city: z
    .string()
    .min(2, { message: 'City must be at least 2 characters' })
    .max(100, { message: 'City must be at most 100 characters' })
    .trim(),

  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, {
      message: 'Invalid ZIP code format (use 12345 or 12345-6789)',
    })
    .trim(),
});

export type CustomerInfoFormData = z.infer<typeof customerInfoSchema>;

// Order Status Validation
export const orderStatusSchema = z.enum([
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'out-for-delivery',
  'delivered',
  'cancelled',
]);

// Order ID Validation
export const orderIdSchema = z.string().regex(/^\d+$/, {
  message: 'Order ID must be a number',
});

// Cart Item Validation
export const cartItemSchema = z.object({
  pizzaId: z.string().min(1, { message: 'Pizza ID is required' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }).max(10, {
    message: 'Maximum 10 pizzas per item',
  }),
});

// Create Order Command Validation
export const createOrderSchema = z.object({
  items: z
    .array(cartItemSchema)
    .min(1, { message: 'At least one item is required' })
    .max(20, { message: 'Maximum 20 items per order' }),
  customer: customerInfoSchema,
});

export type CreateOrderFormData = z.infer<typeof createOrderSchema>;

// Order Tracking Validation
export const orderTrackingSchema = z.object({
  orderId: orderIdSchema,
  customerName: z.string().optional(),
});

export type OrderTrackingFormData = z.infer<typeof orderTrackingSchema>;
