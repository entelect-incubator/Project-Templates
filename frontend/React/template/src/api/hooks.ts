import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/config/environment';
import type { CreateOrderCommand, Order, Pizza } from '@/features/pizzas/types';
import { recordSpanEvent, withSpanAndTelemetry } from '@/lib/telemetry';

const queryKeys = {
  all: ['api'] as const,
  pizzas: () => [...queryKeys.all, 'pizzas'] as const,
  orders: () => [...queryKeys.all, 'orders'] as const,
  order: (id: string | number) => [...queryKeys.orders(), id] as const,
};

async function apiFetch<T>(
  endpoint: string,
  options: { method?: 'GET' | 'POST'; body?: unknown } = {}
): Promise<T> {
  const method = options.method || 'GET';
  return withSpanAndTelemetry(
    `api-${method.toLowerCase()}`,
    async () => {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const fetchOptions: { method: string; headers: Headers; body?: string } = {
        method,
        headers,
      };
      if (options.body) {
        fetchOptions.body = JSON.stringify(options.body);
      }
      const response = await fetch(endpoint, fetchOptions);
      if (!response.ok) throw new Error(`API Error: Status ${response.status}`);
      return response.json() as Promise<T>;
    },
    {
      'api.endpoint': endpoint,
      'api.method': method,
    }
  );
}

async function fetchPizzas(): Promise<Pizza[]> {
  return apiFetch<Pizza[]>(API_ENDPOINTS.pizzas);
}

export function usePizzas() {
  return useSuspenseQuery({
    queryKey: queryKeys.pizzas(),
    queryFn: fetchPizzas,
    staleTime: 1000 * 60 * 5,
  });
}

export function usePizzasLegacy() {
  return useQuery({
    queryKey: queryKeys.pizzas(),
    queryFn: fetchPizzas,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (command: CreateOrderCommand) => {
      return apiFetch<Order>(API_ENDPOINTS.orders, {
        method: 'POST',
        body: command,
      });
    },
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders() });
      recordSpanEvent('order.created', { 'order.id': order.id });
    },
  });
}

export function useOrders() {
  return useQuery({
    queryKey: queryKeys.orders(),
    queryFn: () => apiFetch<Order[]>(API_ENDPOINTS.orders),
  });
}

export function useOrderById(id: string | null) {
  return useQuery({
    queryKey: id ? queryKeys.order(id) : ['disabled'],
    queryFn: async () => {
      if (!id) throw new Error('Order ID required');
      const endpoint = `${API_ENDPOINTS.orders}/${id}`;
      return apiFetch<Order>(endpoint);
    },
    enabled: !!id,
  });
}

export function useCompleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderId: string | number) => {
      const endpoint = `${API_ENDPOINTS.orders}/${orderId}/complete`;
      return apiFetch<Order>(endpoint, { method: 'POST' });
    },
    onSuccess: (order) => {
      queryClient.setQueryData(queryKeys.order(order.id), order);
      queryClient.invalidateQueries({ queryKey: queryKeys.orders() });
    },
  });
}
