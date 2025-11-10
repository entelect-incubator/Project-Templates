/**
 * Order Tracking Page Component
 * Allows users to track order status by ID or by Name + Order Number
 */

import { useEffect, useState } from 'react';
import { currentOrder, loadOrderFromCookie } from '../../../store/cartStore';
import { orderService } from '../../../api/orderService';
import styles from './OrderTrackingPage.module.scss';

interface OrderTrackingPageProps {
  orderId?: number | string;
}

type TrackingMode = 'current' | 'lookup' | 'cookie';

export const OrderTrackingPage = ({ orderId: initialOrderId }: OrderTrackingPageProps) => {
  const [trackingMode, setTrackingMode] = useState<TrackingMode>(
    initialOrderId ? 'current' : 'cookie'
  );
  const [orderIdInput, setOrderIdInput] = useState<string>(initialOrderId?.toString() || '');
  const [customerNameInput, setCustomerNameInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stopPolling, setStopPolling] = useState<(() => void) | null>(null);

  const currentOrderValue = currentOrder.value;

  // Load from cookie on mount
  useEffect(() => {
    if (trackingMode === 'cookie') {
      const savedOrder = loadOrderFromCookie();
      if (savedOrder) {
        setOrderIdInput(savedOrder.id.toString());
        setCustomerNameInput(savedOrder.customeName || '');
        startPolling(savedOrder.id);
      }
    }
  }, [trackingMode]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (stopPolling) {
        stopPolling();
      }
    };
  }, [stopPolling]);

  const startPolling = (id: number) => {
    setIsLoading(true);
    const cleanup = orderService.pollOrderStatus(id);
    setStopPolling(() => cleanup);
    setIsLoading(false);
  };

  const handleTrackByID = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) {
      setError('Order ID is required');
      return;
    }

    const id = parseInt(orderIdInput, 10);
    if (isNaN(id)) {
      setError('Invalid Order ID');
      return;
    }

    setError(null);
    startPolling(id);
  };

  const handleTrackByName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerNameInput.trim() || !orderIdInput.trim()) {
      setError('Please enter both name and order ID');
      return;
    }

    const id = parseInt(orderIdInput, 10);
    if (isNaN(id)) {
      setError('Invalid Order ID');
      return;
    }

    setError(null);
    startPolling(id);
  };

  const getStatusIcon = (status?: string) => {
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
        return '?';
    }
  };

  const getStatusColor = (status?: string): string => {
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
        return '';
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleString();
  };

  const isCompleted = currentOrderValue?.status === 'completed';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Order Tracking</h1>

        {/* Mode Selection */}
        <div className={styles.modeSelector}>
          <button
            className={`${styles.modeButton} ${trackingMode === 'current' ? styles.active : ''}`}
            onClick={() => setTrackingMode('current')}
          >
            Current Order
          </button>
          <button
            className={`${styles.modeButton} ${trackingMode === 'lookup' ? styles.active : ''}`}
            onClick={() => setTrackingMode('lookup')}
          >
            Look Up Order
          </button>
        </div>

        {/* Track by ID Form */}
        {trackingMode === 'lookup' && (
          <form onSubmit={handleTrackByID} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="orderId">Order ID</label>
              <input
                id="orderId"
                type="text"
                placeholder="Enter your order ID"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !orderIdInput.trim()}
              className={styles.searchButton}
            >
              {isLoading ? 'Loading...' : 'Track Order'}
            </button>
          </form>
        )}

        {/* Track by Name + ID Form */}
        {trackingMode === 'lookup' && (
          <form onSubmit={handleTrackByName} className={styles.form}>
            <h3 className={styles.formTitle}>Or track by name and ID</h3>

            <div className={styles.formGroup}>
              <label htmlFor="customerName">Customer Name</label>
              <input
                id="customerName"
                type="text"
                placeholder="Enter your name"
                value={customerNameInput}
                onChange={(e) => setCustomerNameInput(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="orderIdByName">Order ID</label>
              <input
                id="orderIdByName"
                type="text"
                placeholder="Enter order ID"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !customerNameInput.trim() || !orderIdInput.trim()}
              className={styles.searchButton}
            >
              {isLoading ? 'Loading...' : 'Find Order'}
            </button>
          </form>
        )}

        {/* Error Message */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Order Status Display */}
        {currentOrderValue && (
          <div className={styles.statusCard}>
            <div className={styles.header}>
              <h2>Order #{currentOrderValue.id}</h2>
              <span className={styles.customerName}>{currentOrderValue.customeName}</span>
            </div>

            {/* Status Timeline */}
            <div className={styles.timeline}>
              {(['pending', 'confirmed', 'preparing', 'ready', 'completed'] as const).map(
                (status) => {
                  const isActive = currentOrderValue.status === status;
                  const isPast =
                    ['pending', 'confirmed', 'preparing', 'ready', 'completed'].indexOf(
                      currentOrderValue.status
                    ) >=
                    ['pending', 'confirmed', 'preparing', 'ready', 'completed'].indexOf(status);

                  return (
                    <div
                      key={status}
                      className={`${styles.timelineItem} ${isActive ? styles.active : ''} ${isPast ? styles.completed : ''}`}
                    >
                      <div className={styles.dot}>{isPast && <span>✓</span>}</div>
                      <div className={styles.label}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            {/* Current Status */}
            <div
              className={`${styles.currentStatus} ${styles[getStatusColor(currentOrderValue.status)]}`}
            >
              <div className={styles.statusIcon}>{getStatusIcon(currentOrderValue.status)}</div>
              <div className={styles.statusInfo}>
                <p className={styles.statusLabel}>
                  {currentOrderValue.status
                    .replace(/_/g, ' ')
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </p>
                <p className={styles.statusTime}>
                  Ordered: {formatDate(currentOrderValue.createdAt)}
                </p>
              </div>
            </div>

            {/* Completion Message */}
            {isCompleted && (
              <div className={styles.completionMessage}>
                <p>🎉 Your order has been completed!</p>
                <p>Thank you for your order. Enjoy your pizza!</p>
              </div>
            )}

            {/* Share Link */}
            <div className={styles.shareSection}>
              <p>Share your tracking link:</p>
              <input
                type="text"
                readonly
                value={`${window.location.origin}/order/${currentOrderValue.id}`}
                className={styles.shareLink}
              />
              <button
                className={styles.copyButton}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/order/${currentOrderValue.id}`
                  );
                }}
              >
                Copy Link
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!currentOrderValue && trackingMode !== 'lookup' && (
          <div className={styles.emptyState}>
            <p>No active order</p>
            <p>Switch to "Look Up Order" to find a previous order</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;
