export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'out-for-delivery',
  'delivered',
  'cancelled',
] as const;

export type OrderStatusString = (typeof ORDER_STATUSES)[number];

export function isStatusCompleted(current?: string, target?: string) {
  if (!current || !target) return false;
  const normalizedCurrent = ORDER_STATUSES.indexOf(current as OrderStatusString);
  const normalizedTarget = ORDER_STATUSES.indexOf(target as OrderStatusString);
  if (normalizedCurrent === -1 || normalizedTarget === -1) return false;
  return normalizedCurrent >= normalizedTarget;
}

export function isOrderCompleted(status?: string) {
  return status === 'delivered' || status === 'cancelled';
}
