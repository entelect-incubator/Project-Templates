// CheckoutPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CustomerInfoForm } from '../components/CustomerInfoForm';
import { cart, clearCart, customerInfo, currentOrder } from '../../../store/cartStore';
import { createOrder } from '../../../api/orderService';
import { saveOrderToCookie } from '../utils/orderCookie';
import './CheckoutPage.scss';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'review' | 'customer-info' | 'confirmation'>('review');

  const cartItems = cart.value;
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCustomerInfoSubmit = async (customerData: {
    name: string;
    email: string;
    phone: string;
  }) => {
    setIsSubmitting(true);

    try {
      // Update customer info in global state
      customerInfo.value = customerData;

      // Create order
      const orderData = await createOrder(cartItems, customerData);

      // Update current order in global state
      currentOrder.value = {
        id: orderData.id,
        status: orderData.status || 'pending',
        createdAt: new Date().toISOString(),
      };

      // Save to cookie for later access
      saveOrderToCookie();

      // Clear cart
      clearCart();

      // Show success message
      toast.success('Order placed successfully!');

      // Navigate to order tracking
      navigate(`/order/${orderData.id}`);
    } catch (error) {
      console.error('Order creation failed:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToCart = () => {
    navigate('/pizzas');
  };

  const proceedToCustomerInfo = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      navigate('/pizzas');
      return;
    }
    setStep('customer-info');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-page__empty">
          <h1>Your cart is empty</h1>
          <p>Add some delicious pizzas to your cart before checking out!</p>
          <button onClick={handleBackToCart} className="btn btn--primary">
            Browse Pizzas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-page__header">
        <h1>Checkout</h1>
        <div className="checkout-page__steps">
          <div className={`step ${step === 'review' ? 'active' : 'completed'}`}>
            <span className="step-number">1</span>
            <span className="step-label">Review Order</span>
          </div>
          <div className={`step ${step === 'customer-info' ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Customer Info</span>
          </div>
          <div className={`step ${step === 'confirmation' ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Confirmation</span>
          </div>
        </div>
      </div>

      {step === 'review' && (
        <div className="checkout-page__content">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.pizzaId} className="order-item">
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="item-quantity">Quantity: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    <span className="price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax (10%):</span>
                <span>${(cartTotal * 0.1).toFixed(2)}</span>
              </div>
              <div className="total-row total-final">
                <span>Total:</span>
                <span>${(cartTotal * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="checkout-actions">
            <button onClick={handleBackToCart} className="btn btn--secondary">
              Back to Cart
            </button>
            <button onClick={proceedToCustomerInfo} className="btn btn--primary">
              Continue to Customer Info
            </button>
          </div>
        </div>
      )}

      {step === 'customer-info' && (
        <div className="checkout-page__content">
          <div className="customer-info-section">
            <h2>Customer Information</h2>
            <CustomerInfoForm onSubmit={handleCustomerInfoSubmit} isSubmitting={isSubmitting} />
          </div>

          <div className="order-summary-sidebar">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.pizzaId} className="summary-item">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <strong>Total: ${(cartTotal * 1.1).toFixed(2)}</strong>
            </div>
          </div>

          <div className="checkout-actions">
            <button
              onClick={() => setStep('review')}
              className="btn btn--secondary"
              disabled={isSubmitting}
            >
              Back to Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
