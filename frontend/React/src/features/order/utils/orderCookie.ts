/**
 * Order Cookie Management
 * Utilities for persisting order tracking information in browser cookies
 */

const COOKIE_NAME = 'last_order_tracking';

export interface OrderCookieData {
  orderId: string;
  customerName: string;
  createdAt: string;
}

/**
 * Save order information to cookie for tracking persistence
 */
export const saveOrderToCookie = (
  orderId: string,
  customerName: string,
  createdAt: string
): void => {
  const orderData: OrderCookieData = {
    orderId,
    customerName,
    createdAt,
  };

  const encodedData = encodeURIComponent(JSON.stringify(orderData));
  document.cookie = `${COOKIE_NAME}=${encodedData}; max-age=${30 * 24 * 60 * 60}`; // 30 days
};

/**
 * Load order tracking information from cookie
 */
export const loadOrderFromCookie = (): OrderCookieData | null => {
  try {
    const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    return match ? JSON.parse(decodeURIComponent(match[1])) : null;
  } catch (error) {
    console.warn('Failed to parse order cookie:', error);
    clearOrderCookie();
    return null;
  }
};

/**
 * Clear order tracking cookie
 */
export const clearOrderCookie = (): void => {
  document.cookie = `${COOKIE_NAME}=; max-age=0; path=/`;
};

/**
 * Check if order tracking cookie exists
 */
export const hasOrderCookie = (): boolean => {
  return document.cookie.includes(COOKIE_NAME);
};
