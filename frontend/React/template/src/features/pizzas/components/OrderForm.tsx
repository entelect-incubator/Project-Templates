/**
 * Order Form Component
 * Refactored to use reusable components and toast notifications
 */

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateOrder } from '@/api/hooks';
import { CustomerInfoSection } from '@/components/Order/CustomerInfoSection';
import { OrderSummary } from '@/components/Order/OrderSummary';
import { Button, SubmitButton } from '@/components/ui';
import { cartActions, cartItems, cartTotal, customerInfo } from '@/stores/cart';
import { type CustomerInfoFormData, customerInfoSchema } from '../schemas/order';
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

  // Show toast on error
  useEffect(() => {
    if (createOrderMutation.isError) {
      // TODO: Replace with toast notification
      console.error('Order creation failed:', createOrderMutation.error);
    }
  }, [createOrderMutation.isError, createOrderMutation.error]);

  const onSubmit = async (data: CustomerInfoFormData) => {
    try {
      cartActions.updateCustomerInfo(data);

      const orderData = {
        items: cartItems.value.map((item) => ({
          pizzaId: item.pizzaId,
          quantity: item.quantity,
        })),
        customer: data,
      };

      await createOrderMutation.mutateAsync(orderData);

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
      <div className='order-form__empty'>
        <h3>Your cart is empty</h3>
        <p>Add some pizzas to your cart before placing an order.</p>
      </div>
    );
  }

  return (
    <div className='order-form'>
      <div className='order-form__header'>
        <h2>Complete Your Order</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='order-form__form'>
        {/* Order Summary */}
        <OrderSummary items={cartItems.value} total={cartTotal.value} />

        {/* Customer Information */}
        <CustomerInfoSection register={register} errors={errors} />

        {/* Form Actions */}
        <div className='order-form__actions'>
          {onCancel && (
            <Button type='button' onClick={onCancel} variant='secondary'>
              Cancel
            </Button>
          )}
          <SubmitButton
            label='Place Order'
            isLoading={isSubmitting || createOrderMutation.isPending}
            loadingLabel='Processing...'
            disabled={isSubmitting || createOrderMutation.isPending}
          />
        </div>
      </form>
    </div>
  );
}
