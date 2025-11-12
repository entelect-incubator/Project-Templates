/**
 * Checkout Page
 * Multi-step checkout flow with order review and customer information
 */

import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cartItems } from '../../../store/cartStore';
import { CheckoutSteps } from '../components/CheckoutSteps';
import { CustomerInfoStep } from '../components/CustomerInfoStep';
import { EmptyCart } from '../components/EmptyCart';
import { OrderReviewStep } from '../components/OrderReviewStep';
import './CheckoutPage.scss';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'review' | 'customer-info' | 'confirmation'>('review');

  const items = cartItems.value;

  const handleBackToCart = () => {
    navigate('/pizzas');
  };

  const proceedToCustomerInfo = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/pizzas');
      return;
    }
    setStep('customer-info');
  };

  // Empty cart state
  if (items.length === 0) {
    return <EmptyCart onBrowse={handleBackToCart} />;
  }

  // Main checkout flow
  return (
    <div className='checkout-page'>
      <CheckoutSteps currentStep={step} />

      {step === 'review' && (
        <OrderReviewStep
          items={items}
          onBack={handleBackToCart}
          onContinue={proceedToCustomerInfo}
        />
      )}

      {step === 'customer-info' && (
        <CustomerInfoStep items={items} onBack={() => setStep('review')} />
      )}
    </div>
  );
};

export default CheckoutPage;
