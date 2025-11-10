/**
 * Customer Information Form Validation Schema
 * Using Zod for type-safe runtime validation
 */

import { z } from 'zod';

export const customerInfoSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be at most 100 characters' })
    .trim(),

  email: z.string().email({ message: 'Invalid email address' }).toLowerCase().trim(),

  phone: z
    .string()
    .regex(/^[\d\-\s\+\(\)]+$/, {
      message: 'Invalid phone number format',
    })
    .min(10, { message: 'Phone number must be at least 10 digits' })
    .max(20, { message: 'Phone number must be at most 20 characters' })
    .transform((val) => val.replace(/\D/g, '').slice(-10)),
});

export type CustomerInfoFormData = z.infer<typeof customerInfoSchema>;

/**
 * Order Status validation
 */
export const orderStatusSchema = z.enum([
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'completed',
]);

export type OrderStatusType = z.infer<typeof orderStatusSchema>;

/**
 * Cart Item validation
 */
export const cartItemSchema = z.object({
  pizzaId: z.string().uuid().or(z.string().min(1)),
  pizzaName: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export type CartItemType = z.infer<typeof cartItemSchema>;

/**
 * Order tracking lookup validation (for finding orders by name + number)
 */
export const orderTrackingLookupSchema = z.object({
  customerName: z.string().min(2, { message: 'Name must be at least 2 characters' }).trim(),

  orderId: z
    .string()
    .regex(/^\d+$/, { message: 'Order ID must be numeric' })
    .or(z.number().positive()),
});

export type OrderTrackingLookupType = z.infer<typeof orderTrackingLookupSchema>;
