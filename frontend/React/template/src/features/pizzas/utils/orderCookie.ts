// orderCookie.ts
import { currentOrder, customerInfo } from '../../../store/cartStore';

const COOKIE_NAME = 'last_order_tracking';

export const saveOrderToCookie = (): void => {
  if (!currentOrder.value || !customerInfo.value) return;

  const orderData = JSON.stringify({
    orderId: currentOrder.value.id,
    customerName: customerInfo.value.name,
    createdAt: currentOrder.value.createdAt,
  });

  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(orderData)}; max-age=${30 * 24 * 60 * 60}`; // 30 days
};

export const loadOrderFromCookie = (): {
  orderId: string;
  customerName: string;
  createdAt: string;
} | null => {
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  return match ? JSON.parse(decodeURIComponent(match[1])) : null;
};

export const clearOrderCookie = (): void => {
  document.cookie = `${COOKIE_NAME}=; max-age=0`;
};
