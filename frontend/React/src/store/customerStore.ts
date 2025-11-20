/**
 * Customer Store - Manages customer information state
 *
 * Responsibility: Handle customer data (name, email, phone)
 * Should NOT: Manage cart items, orders, or order status
 *
 * This store is focused solely on customer information, making it:
 * - Independent and testable
 * - Reusable across different features
 * - Easy to extend with more customer fields
 */

import { signal } from '@preact/signals-react';
import type { CustomerInfo } from './types';

// ============================================================================
// Signals - Customer State
// ============================================================================

/**
 * Current customer information
 *
 * Null when no customer is logged in or checkout form hasn't been filled
 * Set during checkout process
 */
export const customerInfo = signal<CustomerInfo | null>(null);

// ============================================================================
// Customer Info Operations
// ============================================================================

/**
 * Set customer information
 *
 * Typically called when user fills out checkout form
 *
 * @param info Customer details (name, email, phone)
 *
 * @example
 * setCustomerInfo({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   phone: '555-1234'
 * });
 */
export const setCustomerInfo = (info: CustomerInfo): void => {
  customerInfo.value = info;
};

/**
 * Clear customer information
 *
 * Use after order is completed or when user logs out
 *
 * @example
 * clearCustomerInfo();
 */
export const clearCustomerInfo = (): void => {
  customerInfo.value = null;
};

/**
 * Get customer's full name
 *
 * @returns Customer name or empty string if not set
 *
 * @example
 * const name = getCustomerName(); // "John Doe"
 */
export const getCustomerName = (): string => {
  return customerInfo.value?.name ?? '';
};

/**
 * Get customer's email
 *
 * @returns Customer email or empty string if not set
 *
 * @example
 * const email = getCustomerEmail(); // "john@example.com"
 */
export const getCustomerEmail = (): string => {
  return customerInfo.value?.email ?? '';
};

/**
 * Get customer's phone
 *
 * @returns Customer phone or empty string if not set
 *
 * @example
 * const phone = getCustomerPhone(); // "555-1234"
 */
export const getCustomerPhone = (): string => {
  return customerInfo.value?.phone ?? '';
};

/**
 * Check if customer information is complete
 *
 * All fields must be non-empty
 *
 * @returns true if all customer info is set, false otherwise
 *
 * @example
 * if (isCustomerInfoComplete()) {
 *   // Show proceed to payment button
 * }
 */
export const isCustomerInfoComplete = (): boolean => {
  return !!(customerInfo.value?.name && customerInfo.value?.email && customerInfo.value?.phone);
};

/**
 * Update a single customer field
 *
 * @param field The field to update ('name' | 'email' | 'phone')
 * @param value The new value
 *
 * @example
 * updateCustomerField('email', 'newemail@example.com');
 */
export const updateCustomerField = (field: keyof CustomerInfo, value: string): void => {
  if (customerInfo.value) {
    customerInfo.value = {
      ...customerInfo.value,
      [field]: value,
    };
  }
};
