/**
 * Pizza Hooks
 * React hooks for pizza menu and order management using generated API client
 * All API calls derived from NSwag-generated PizzaApiClient with network awareness
 */

import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import {
  extractResultData,
  getOrCreateApiClient,
  mapApiError,
} from '@/api/generated-client-factory';
import { recordSpanEvent, withSpanAndTelemetry } from '@/lib/telemetry';
import type { CreateOrderCommand, Order, Pizza } from '../types';

/**
 * Fetch pizzas from the generated API client with telemetry and error handling
 */
async function fetchPizzas(): Promise<Pizza[]> {
  return withSpanAndTelemetry('fetch-pizzas', async () => {
    const client = await getOrCreateApiClient();
    const result = await (client as unknown as { pizzasGet(): Promise<unknown> }).pizzasGet();
    const data = extractResultData<Pizza[]>(result);
    recordSpanEvent('pizza.count', { 'pizza.count': data.length });
    return data;
  });
}

/**
 * Hook to fetch all pizzas from the menu with React 19.2 Suspense support
 * This version uses useSuspenseQuery for better SSR batching
 */
export function usePizzas() {
  return useSuspenseQuery({
    queryKey: ['pizzas'],
    queryFn: fetchPizzas,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch all pizzas without Suspense (for legacy compatibility)
 */
export function usePizzasLegacy() {
  return useQuery({
    queryKey: ['pizzas'],
    queryFn: fetchPizzas,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to create a new order using the generated API client
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (command: CreateOrderCommand) => {
      return withSpanAndTelemetry('create-order', async () => {
        const client = await getOrCreateApiClient();
        const result = await (
          client as unknown as {
            ordersPost(body: CreateOrderCommand): Promise<unknown>;
          }
        ).ordersPost(command);
        const data = extractResultData<Order>(result);
        recordSpanEvent('order.created', { 'order.id': data.id });
        return data;
      });
    },
    onSuccess: (order) => {
      // Invalidate orders query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      recordSpanEvent('order.mutation.success', { 'order.id': order.id });
    },
    onError: (error) => {
      const apiError = mapApiError(error);
      recordSpanEvent('order.mutation.error', {
        'error.message': apiError.message,
      });
    },
  });
}

/**
 * Hook to fetch all orders using the generated API client
 */
export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      return withSpanAndTelemetry('fetch-orders', async () => {
        const client = await getOrCreateApiClient();
        const result = await (client as unknown as { ordersGet(): Promise<unknown> }).ordersGet();
        const data = extractResultData<Order[]>(result);
        recordSpanEvent('orders.count', { 'orders.count': data.length });
        return data;
      });
    },
  });
}

/**
 * Hook to fetch a single order by ID using the generated API client
 */
export function useOrderById(id: string | null) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      if (!id) throw new Error('Order ID required');

      return withSpanAndTelemetry('fetch-order-by-id', async () => {
        const client = await getOrCreateApiClient();
        const result = await (
          client as unknown as {
            ordersIdGet(id: string): Promise<unknown>;
          }
        ).ordersIdGet(id);
        const data = extractResultData<Order>(result);
        recordSpanEvent('order.fetched', { 'order.id': data.id });
        return data;
      });
    },
    enabled: !!id,
  });
}
