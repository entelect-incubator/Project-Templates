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
import { useOrderTracking } from '../hooks';
import './OrderTrackingPage.scss';

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
    <div className="order-tracking-container">
      <div className="order-tracking-content">
        <h1 className="order-tracking-title">Order Tracking</h1>

        {/* Mode Selection */}
        <ModeSelection
          trackingMode={trackingMode}
          onModeChange={setTrackingMode}
          className="order-tracking-mode-selector"
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
            className="order-tracking-forms-container"
          />
        )}

        {/* Order Status Display */}
        {currentOrderValue && (
          <div className="order-tracking-status-card">
            <div className="order-tracking-header">
              <h2>Order #{currentOrderValue.id}</h2>
              <span className="order-tracking-customer-name">{currentOrderValue.customeName}</span>
            </div>

            <StatusTimeline
              currentStatus={currentOrderValue.status}
              className="order-tracking-timeline"
            />

            <CurrentStatus
              status={currentOrderValue.status}
              createdAt={currentOrderValue.createdAt}
              className="order-tracking-current-status"
            />

            <CompletionMessage
              status={currentOrderValue.status}
              className="order-tracking-completion-message"
            />

            <ShareLink orderId={currentOrderValue.id} className="order-tracking-share-section" />
          </div>
        )}

        {/* Empty State */}
        {!currentOrderValue && trackingMode !== 'lookup' && (
          <EmptyState className="order-tracking-empty-state" />
        )}
      </div>
    </div>
  );
}

export default OrderTrackingPage;
