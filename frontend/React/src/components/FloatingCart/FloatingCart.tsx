import { Cart, OrderStatus } from '@/types/pizza';
import styles from './FloatingCart.module.scss';

interface FloatingCartProps {
  cart: Cart;
  orderStatus?: OrderStatus;
  onClick: () => void;
  isHidden?: boolean;
}

/**
 * Floating Cart Button Component
 * Persistent button showing cart item count and order status
 */
export function FloatingCart({ cart, orderStatus, onClick, isHidden = false }: FloatingCartProps) {
  if (isHidden || cart.itemCount === 0) {
    return null;
  }

  const getStatusLabel = (status?: OrderStatus) => {
    const statusMap: Record<OrderStatus, string> = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      preparing: 'Preparing',
      ready: 'Ready',
      out_for_delivery: 'Delivering',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return status ? statusMap[status] : 'Cart';
  };

  return (
    <button
      className={`${styles['floatingCart']} ${isHidden ? styles['floatingCart--hidden'] : ''}`}
      onClick={onClick}
      aria-label={`Open cart with ${cart.itemCount} items`}
    >
      <span className={styles['icon']}>🛒</span>

      <span className={styles['badge']}>{cart.itemCount}</span>

      {orderStatus ? (
        <div className={styles['status']}>
          <span className={styles['status__indicator']} />
          <span>{getStatusLabel(orderStatus)}</span>
        </div>
      ) : (
        <span className={styles['label']}>Cart</span>
      )}

      <span style={{ fontSize: '0.625rem' }}>ZA {cart.total?.toFixed(2)}</span>
    </button>
  );
}
