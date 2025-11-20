/**
 * Pizza Hooks
 * React hooks for pizza menu management using generated API client
 */

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { extractResultData, getOrCreateApiClient } from '@/api/generated-client-factory';
import { recordSpanEvent, withSpanAndTelemetry } from '@/lib/telemetry';
import type { Pizza } from '../types';

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
 * Hook to fetch a single pizza by ID
 */
export function usePizza(pizzaId: string) {
  return useQuery({
    queryKey: ['pizza', pizzaId],
    queryFn: async () => {
      const pizzas = await fetchPizzas();
      return pizzas.find((pizza) => pizza.id === pizzaId);
    },
    enabled: !!pizzaId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
