import type { CustomerInfo } from '../types';

export type CustomerInfoFormData = CustomerInfo & {
  notes?: string;
};
