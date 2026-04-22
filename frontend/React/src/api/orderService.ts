/**
 * Order Service
 *
 * Wrapper around the generated PizzaApiClient for business logic
 * Handles order creation, status updates, and polling
 */

// import {
//   cartItems,
//   clearOrderError,
//   customerInfo,
//   setCurrentOrder,
//   setOrderError,
//   setOrderLoading,
//   updateOrderStatus,
// } from '../store/cartStore';

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
     * Create a new order (stubbed for now)
     */
    async createOrder() {
      const mockResponse = {
        id: Math.floor(Math.random() * 10000),
        status: 'pending',
      };

      return mockResponse;
    },

    /**
     * Get order status
     */
    async getOrderStatus(_orderId: number) {
      const statuses: Array<'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed'> = [
        'pending',
        'confirmed',
        'preparing',
        'ready',
        'completed',
      ];

      return statuses[Math.floor(Math.random() * statuses.length)];
    },

    /**
     * Poll order status at regular intervals
     * Returns a cleanup function to stop polling
     */
    pollOrderStatus(orderId: number, intervalMs = 3000) {
      const interval = setInterval(async () => {
        try {
          const status = await this.getOrderStatus(orderId);
          console.debug('Polled order status', status);

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
