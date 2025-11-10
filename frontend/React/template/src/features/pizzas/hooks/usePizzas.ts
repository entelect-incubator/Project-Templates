/**
 * Pizza Hooks
 * React hooks for pizza menu and order management
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Pizza, CreateOrderCommand, Order } from '../types';

/**
 * Hook to fetch all pizzas from the menu
 */
export function usePizzas() {
  return useQuery({
    queryKey: ['pizzas'],
    queryFn: async () => {
      const response = await fetch('https://localhost:7160/api/pizzas');
      if (!response.ok) throw new Error('Failed to fetch pizzas');
      return response.json() as Promise<Pizza[]>;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to create a new order
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (command: CreateOrderCommand) => {
      const response = await fetch('https://localhost:7160/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(command),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      return response.json() as Promise<Order>;
    },
    onSuccess: () => {
      // Invalidate orders query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

/**
 * Hook to fetch all orders
 */
export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await fetch('https://localhost:7160/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      return response.json() as Promise<Order[]>;
    },
  });
}

/**
 * Hook to fetch a single order by ID
 */
export function useOrderById(id: string | null) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      if (!id) throw new Error('Order ID required');
      const response = await fetch(`https://localhost:7160/api/orders/${id}`);
      if (!response.ok) throw new Error('Failed to fetch order');
      return response.json() as Promise<Order>;
    },
    enabled: !!id,
  });
}
