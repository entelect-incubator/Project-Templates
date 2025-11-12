/**
 * Order status utilities and constants
 */

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';

export const ORDER_STATUSES: readonly OrderStatus[] = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'completed',
] as const;

/**
 * Get icon for order status
 * @param status - Order status
 * @returns Status icon emoji
 */
export function getStatusIcon(status?: string): string {
  switch (status) {
    case 'pending':
      return '⏳';
    case 'confirmed':
      return '✓';
    case 'preparing':
      return '👨‍🍳';
    case 'ready':
      return '📦';
    case 'completed':
      return '✅';
    default:
      return '❓';
  }
}

/**
 * Get CSS class name for order status
 * @param status - Order status
 * @returns CSS class name
 */
export function getStatusColor(status?: string): string {
  switch (status) {
    case 'pending':
      return 'pending';
    case 'confirmed':
      return 'confirmed';
    case 'preparing':
      return 'preparing';
    case 'ready':
      return 'ready';
    case 'completed':
      return 'completed';
    default:
      return 'unknown';
  }
}

/**
 * Get human-readable status label
 * @param status - Order status
 * @returns Formatted status label
 */
export function getStatusLabel(status?: string): string {
  if (!status) return 'Unknown';

  return status
    .replace(/_/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Check if status is completed
 * @param status - Order status
 * @returns True if order is completed
 */
export function isOrderCompleted(status?: string): boolean {
  return status === 'completed';
}

/**
 * Get the index of a status in the timeline
 * @param status - Order status
 * @returns Index in timeline, -1 if not found
 */
export function getStatusIndex(status?: string): number {
  return ORDER_STATUSES.indexOf(status as OrderStatus);
}

/**
 * Check if a status has been completed in the timeline
 * @param currentStatus - Current order status
 * @param checkStatus - Status to check
 * @returns True if the status has been completed
 */
export function isStatusCompleted(currentStatus?: string, checkStatus?: string): boolean {
  const currentIndex = getStatusIndex(currentStatus);
  const checkIndex = getStatusIndex(checkStatus);

  return currentIndex !== -1 && checkIndex !== -1 && currentIndex >= checkIndex;
}
