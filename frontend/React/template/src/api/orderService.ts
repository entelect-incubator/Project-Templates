/**
 * Order Service
 *
 * Wrapper around the generated PizzaApiClient for business logic
 * Handles order creation, status updates, and polling
 */

import {
  cartItems,
  clearOrderError,
  customerInfo,
  setCurrentOrder,
  setOrderError,
  setOrderLoading,
  updateOrderStatus,
} from '../store/cartStore';

// Since we're using the generated client, we need to create a wrapper
// The actual client will be imported from @/api/generated
// For now, we'll create the interface

export interface IOrderService {
  createOrder(): Promise<{ id: number; status: string }>;
  getOrderStatus(orderId: number): Promise<string>;
  pollOrderStatus(orderId: number, intervalMs?: number): () => void;
}

/**
 * Create order service using generated API client
 */
export const createOrderService = (): IOrderService => {
  // This will be wired with the actual generated client later
  // For now, provide the interface

  return {
    /**
     * Create a new order
     */
    async createOrder() {
      try {
        setOrderLoading(true);
        clearOrderError();

        const customer = customerInfo.value;
        const items = cartItems.value;

        if (!customer) {
          throw new Error('Customer information not set');
        }

        if (items.length === 0) {
          throw new Error('Cart is empty');
        }

        // Call the generated API client
        // This will be: const apiClient = new PizzaApiClient();
        // const response = await apiClient.create_order(new CreateOrderCommand({ ... }));

        // For now, return a mock response
        const mockResponse = {
          id: Math.floor(Math.random() * 10000),
          status: 'pending',
        };

        setCurrentOrder({
          id: mockResponse.id,
          status: 'pending',
          createdAt: new Date().toISOString(),
          customeName: customer.name,
        });

        return mockResponse;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to create order';
        setOrderError(message);
        throw error;
      } finally {
        setOrderLoading(false);
      }
    },

    /**
     * Get order status
     */
    async getOrderStatus(_orderId: number) {
      try {
        // Call the generated API client
        // This will be: const apiClient = new PizzaApiClient();
        // const response = await apiClient.get_order_status(orderId);

        // For now, return mock status
        const statuses: Array<'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed'> = [
          'pending',
          'confirmed',
          'preparing',
          'ready',
          'completed',
        ];
        return statuses[Math.floor(Math.random() * statuses.length)];
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch order status';
        setOrderError(message);
        throw error;
      }
    },

    /**
     * Poll order status at regular intervals
     * Returns a cleanup function to stop polling
     */
    pollOrderStatus(orderId: number, intervalMs = 3000) {
      const interval = setInterval(async () => {
        try {
          const status = await this.getOrderStatus(orderId);
          updateOrderStatus(status);

          // Stop polling when order is completed
          if (status === 'completed') {
            clearInterval(interval);
          }
        } catch (error) {
          console.error('Error polling order status:', error);
        }
      }, intervalMs);

      // Return cleanup function
      return () => clearInterval(interval);
    },
  };
};

// Export singleton instance
export const orderService = createOrderService();
