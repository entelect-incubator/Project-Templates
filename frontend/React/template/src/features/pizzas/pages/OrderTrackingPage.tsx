/**
 * Order Tracking Page Component
 * Allows users to track order status by ID or by Name + Order Number
 * Refactored with modern React patterns and separation of concerns
 */

import { CompletionMessage } from '../components/CompletionMessage';
import { CurrentStatus } from '../components/CurrentStatus';
import { EmptyState } from '../components/EmptyState';
import { ModeSelection } from '../components/ModeSelection';
import { OrderLookupForms } from '../components/OrderLookupForms';
import { ShareLink } from '../components/ShareLink';
import { StatusTimeline } from '../components/StatusTimeline';
import { useOrderTracking } from '../hooks/useOrderTracking';
import styles from './OrderTrackingPage.module.scss';

interface OrderTrackingPageProps {
  orderId?: number | string;
}

export function OrderTrackingPage({ orderId: initialOrderId }: OrderTrackingPageProps) {
  const {
    trackingMode,
    setTrackingMode,
    orderIdInput,
    setOrderIdInput,
    customerNameInput,
    setCustomerNameInput,
    isLoading,
    error,
    currentOrderValue,
    handleTrackByID,
    handleTrackByName,
    clearError,
  } = useOrderTracking(initialOrderId ? { initialOrderId } : {});

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Order Tracking</h1>

        {/* Mode Selection */}
        <ModeSelection
          trackingMode={trackingMode}
          onModeChange={setTrackingMode}
          className={styles.modeSelector}
        />

        {/* Order Lookup Forms */}
        {trackingMode === 'lookup' && (
          <OrderLookupForms
            orderIdInput={orderIdInput}
            customerNameInput={customerNameInput}
            isLoading={isLoading}
            error={error}
            onOrderIdChange={setOrderIdInput}
            onCustomerNameChange={setCustomerNameInput}
            onTrackById={handleTrackByID}
            onTrackByName={handleTrackByName}
            onClearError={clearError}
            className={styles.formsContainer}
          />
        )}

        {/* Order Status Display */}
        {currentOrderValue && (
          <div className={styles.statusCard}>
            <div className={styles.header}>
              <h2>Order #{currentOrderValue.id}</h2>
              <span className={styles.customerName}>{currentOrderValue.customeName}</span>
            </div>

            <StatusTimeline currentStatus={currentOrderValue.status} className={styles.timeline} />

            <CurrentStatus
              status={currentOrderValue.status}
              createdAt={currentOrderValue.createdAt}
              className={styles.currentStatus}
            />

            <CompletionMessage
              status={currentOrderValue.status}
              className={styles.completionMessage}
            />

            <ShareLink orderId={currentOrderValue.id} className={styles.shareSection} />
          </div>
        )}

        {/* Empty State */}
        {!currentOrderValue && trackingMode !== 'lookup' && (
          <EmptyState className={styles.emptyState} />
        )}
      </div>
    </div>
  );
}

export default OrderTrackingPage;
