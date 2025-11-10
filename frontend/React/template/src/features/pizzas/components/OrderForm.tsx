/**
 * Order Form Component
 * React Hook Form + Zod validation for customer information
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { customerInfoSchema, type CustomerInfoFormData } from '../schemas/order';
import { cartItems, cartTotal, customerInfo, cartActions } from '@/stores/cart';
import { useCreateOrder } from '../hooks/usePizzas';
import './OrderForm.scss';

interface OrderFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function OrderForm({ onSuccess, onCancel }: OrderFormProps) {
  const createOrderMutation = useCreateOrder();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CustomerInfoFormData>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: customerInfo.value,
  });

  const onSubmit = async (data: CustomerInfoFormData) => {
    try {
      // Update customer info in store
      cartActions.updateCustomerInfo(data);

      // Create order
      const orderData = {
        items: cartItems.value.map((item) => ({
          pizzaId: item.pizzaId,
          quantity: item.quantity,
        })),
        customer: data,
      };

      await createOrderMutation.mutateAsync(orderData);

      // Clear cart and reset form
      cartActions.clearCart();
      cartActions.resetCustomerInfo();
      reset();

      onSuccess?.();
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  if (cartItems.value.length === 0) {
    return (
      <div className="order-form__empty">
        <h3>Your cart is empty</h3>
        <p>Add some pizzas to your cart before placing an order.</p>
      </div>
    );
  }

  return (
    <div className="order-form">
      <div className="order-form__header">
        <h2>Complete Your Order</h2>
        <p>
          Total: <strong>${cartTotal.value.toFixed(2)}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="order-form__form">
        {/* Order Summary */}
        <div className="order-form__summary">
          <h3>Order Summary</h3>
          <div className="order-items">
            {cartItems.value.map((item) => (
              <div key={item.pizzaId} className="order-item">
                <span className="order-item__name">{item.pizza.name}</span>
                <span className="order-item__quantity">×{item.quantity}</span>
                <span className="order-item__price">${item.subtotal.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Information */}
        <div className="order-form__section">
          <h3>Delivery Information</h3>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="phone">Phone *</label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-message">{errors.phone.message}</span>}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="address">Address *</label>
            <input
              id="address"
              type="text"
              {...register('address')}
              className={errors.address ? 'error' : ''}
            />
            {errors.address && <span className="error-message">{errors.address.message}</span>}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="city">City *</label>
              <input
                id="city"
                type="text"
                {...register('city')}
                className={errors.city ? 'error' : ''}
              />
              {errors.city && <span className="error-message">{errors.city.message}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="zipCode">Zip Code *</label>
              <input
                id="zipCode"
                type="text"
                {...register('zipCode')}
                className={errors.zipCode ? 'error' : ''}
              />
              {errors.zipCode && <span className="error-message">{errors.zipCode.message}</span>}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="order-form__actions">
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn btn--secondary">
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || createOrderMutation.isPending}
            className="btn btn--primary"
          >
            {isSubmitting || createOrderMutation.isPending ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>

      {createOrderMutation.isError && (
        <div className="order-form__error">
          <p>Failed to place order. Please try again.</p>
        </div>
      )}
    </div>
  );
}
