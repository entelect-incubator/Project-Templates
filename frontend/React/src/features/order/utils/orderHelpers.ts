/**
 * Order Utilities
 * Helper functions for order management, status tracking, and data transformation
 */

import type { Order as StoreOrder } from '@/store/types';
import type { Order, OrderStatus, OrderTimelineEvent } from '../types';

/**
 * Convert store order to full order type
 */
export function convertStoreOrder(storeOrder: StoreOrder): Partial<Order> {
  return {
    id: storeOrder.id.toString(),
    status: storeOrder.status as OrderStatus,
    createdAt: new Date(storeOrder.createdAt),
    // Other fields would need to be fetched separately
  };
}

/**
 * Generate order timeline events based on status
 */
export function generateOrderTimeline(order: Order): OrderTimelineEvent[] {
  const events: OrderTimelineEvent[] = [
    {
      status: 'pending',
      timestamp: order.createdAt,
      description: 'Order received and being processed',
    },
  ];

  // Add events based on current status
  const statusProgression: OrderStatus[] = [
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'out-for-delivery',
    'delivered',
  ];

  const currentIndex = statusProgression.indexOf(order.status);

  for (let i = 1; i <= currentIndex; i++) {
    const status = statusProgression[i];
    const timestamp = new Date(order.createdAt.getTime() + i * 10 * 60 * 1000); // 10 min intervals

    events.push({
      status,
      timestamp,
      description: getStatusDescription(status),
    });
  }

  return events;
}

/**
 * Get human-readable description for order status
 */
export function getStatusDescription(status: OrderStatus): string {
  const descriptions: Record<OrderStatus, string> = {
    pending: 'Order received and being processed',
    confirmed: 'Order confirmed by restaurant',
    preparing: 'Your delicious pizza is being prepared',
    ready: 'Order ready for pickup/delivery',
    'out-for-delivery': 'Order is out for delivery',
    delivered: 'Order delivered successfully',
    cancelled: 'Order was cancelled',
  };

  return descriptions[status] || 'Status update';
}

/**
 * Calculate estimated delivery time based on status
 */
export function calculateEstimatedDelivery(createdAt: Date, status: OrderStatus): Date {
  const baseMinutes = 30; // Base delivery time
  const statusMinutes: Record<OrderStatus, number> = {
    pending: baseMinutes,
    confirmed: baseMinutes - 5,
    preparing: baseMinutes - 10,
    ready: 15,
    'out-for-delivery': 10,
    delivered: 0,
    cancelled: 0,
  };

  const minutesToAdd = statusMinutes[status] || baseMinutes;
  return new Date(createdAt.getTime() + minutesToAdd * 60 * 1000);
}

/**
 * Check if order status indicates completion
 */
export function isOrderCompleted(status: OrderStatus): boolean {
  return status === 'delivered' || status === 'cancelled';
}

/**
 * Check if order is currently being prepared
 */
export function isOrderInProgress(status: OrderStatus): boolean {
  return ['confirmed', 'preparing', 'ready', 'out-for-delivery'].includes(status);
}

/**
 * Get next expected status for an order
 */
export function getNextStatus(currentStatus: OrderStatus): OrderStatus | null {
  const progression: Record<OrderStatus, OrderStatus | null> = {
    pending: 'confirmed',
    confirmed: 'preparing',
    preparing: 'ready',
    ready: 'out-for-delivery',
    'out-for-delivery': 'delivered',
    delivered: null,
    cancelled: null,
  };

  return progression[currentStatus] || null;
}

/**
 * Get CSS class for order status color
 */
export function getStatusColor(status?: string): string {
  const colors: Record<string, string> = {
    pending: 'status-pending',
    confirmed: 'status-confirmed',
    preparing: 'status-preparing',
    ready: 'status-ready',
    'out-for-delivery': 'status-out-for-delivery',
    delivered: 'status-delivered',
    cancelled: 'status-cancelled',
  };

  return colors[status || ''] || 'status-unknown';
}

/**
 * Get icon for order status
 */
export function getStatusIcon(status?: string): string {
  const icons: Record<string, string> = {
    pending: '⏳',
    confirmed: '✅',
    preparing: '👨‍🍳',
    ready: '📦',
    'out-for-delivery': '🚚',
    delivered: '✨',
    cancelled: '❌',
  };

  return icons[status || ''] || '❓';
}

/**
 * Get display label for order status
 */
export function getStatusLabel(status?: string): string {
  const labels: Record<string, string> = {
    pending: 'Order Received',
    confirmed: 'Order Confirmed',
    preparing: 'Being Prepared',
    ready: 'Ready for Pickup',
    'out-for-delivery': 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };

  return labels[status || ''] || 'Unknown Status';
}
