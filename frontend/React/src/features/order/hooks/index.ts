/**
 * Order Management Hooks
 * React hooks for order creation, tracking, and cart management
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  extractResultData,
  getOrCreateApiClient,
  mapApiError,
} from '@/api/generated-client-factory';
import { recordSpanEvent, withSpanAndTelemetry } from '@/lib/telemetry';
import { orderService } from '@/api/orderService';
import { parseOrderId } from '@/lib/utils';
import { currentOrder } from '@/store';
import type { Order as StoreOrder } from '@/store/types';
import { loadOrderFromCookie } from '../utils/orderCookie';
import type { CreateOrderCommand, Order } from '../types';

// ==================== Order Creation Hooks ====================

/**
 * Create a new order using the generated API client
 */
async function createOrder(command: CreateOrderCommand): Promise<Order> {
  return withSpanAndTelemetry('create-order', async () => {
    const client = await getOrCreateApiClient();
    const result = await (
      client as unknown as {
        ordersPost(command: CreateOrderCommand): Promise<unknown>;
      }
    ).ordersPost(command);

    const data = extractResultData<Order>(result);
    recordSpanEvent('order.created', {
      'order.id': data.id,
      'order.itemCount': data.items.length,
      'order.total': data.total,
    });
    return data;
  });
}

/**
 * Hook to create a new order
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      // Invalidate and refetch order queries
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.setQueryData(['order', order.id], order);
    },
    onError: mapApiError,
  });
}

// ==================== Order Tracking Hooks ====================

export type TrackingMode = 'current' | 'lookup' | 'cookie';

interface UseOrderTrackingState {
  // UI State
  trackingMode: TrackingMode;
  orderIdInput: string;
  customerNameInput: string;

  // Async State
  isLoading: boolean;
  error: string | null;

  // Data
  currentOrderValue: StoreOrder | null;
}

interface UseOrderTrackingActions {
  setTrackingMode: (mode: TrackingMode) => void;
  setOrderIdInput: (id: string) => void;
  setCustomerNameInput: (name: string) => void;
  handleTrackByID: (e: React.FormEvent) => Promise<void>;
  handleTrackByName: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;
  stopTracking: () => void;
}

export type UseOrderTrackingReturn = UseOrderTrackingState & UseOrderTrackingActions;

interface UseOrderTrackingProps {
  initialOrderId?: number | string;
}

/**
 * Main hook for order tracking with page visibility awareness
 * Polling only occurs when the browser tab is active (performance optimization)
 */
export function useOrderTracking({
  initialOrderId,
}: UseOrderTrackingProps = {}): UseOrderTrackingReturn {
  // UI State
  const [trackingMode, setTrackingMode] = useState<TrackingMode>(
    initialOrderId ? 'current' : 'cookie'
  );
  const [orderIdInput, setOrderIdInput] = useState<string>(initialOrderId?.toString() || '');
  const [customerNameInput, setCustomerNameInput] = useState('');

  // Async State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Polling Management
  const stopPollingRef = useRef<(() => void) | null>(null);
  const isTabActiveRef = useRef(true);

  // Data
  const currentOrderValue = currentOrder.value;

  // ==================== Polling Management ====================
  const startPolling = useCallback(async (id: number) => {
    try {
      // Stop any existing polling
      if (stopPollingRef.current) {
        stopPollingRef.current();
      }

      setIsLoading(true);
      setError(null);

      // Start polling - only proceeds if browser tab is active
      if (!isTabActiveRef.current) {
        setError('Polling paused - please bring this tab to focus');
        setIsLoading(false);
        return;
      }

      // Poll every 2 seconds (optimized for performance)
      const cleanup = orderService.pollOrderStatus(id, 2000);
      stopPollingRef.current = cleanup;
      setIsLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start polling';
      setError(`Polling error: ${errorMessage}`);
      setIsLoading(false);
    }
  }, []);

  // ==================== Page Visibility Detection ====================
  useEffect(() => {
    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // ==================== Load from Cookie ====================
  useEffect(() => {
    if (trackingMode !== 'cookie') return;

    const savedOrder = loadOrderFromCookie();
    if (!savedOrder) return;

    // Update inputs
    setOrderIdInput(savedOrder.orderId);
    setCustomerNameInput(savedOrder.customerName || '');

    // Auto-start tracking
    const handleAutoTrack = async () => {
      await startPolling(Number(savedOrder.orderId));
    };

    handleAutoTrack().catch((err) => {
      setError(`Failed to auto-load order: ${err instanceof Error ? err.message : String(err)}`);
    });
  }, [trackingMode, startPolling]);

  const stopTracking = useCallback(() => {
    if (stopPollingRef.current) {
      stopPollingRef.current();
      stopPollingRef.current = null;
    }
    setError(null);
    setIsLoading(false);
  }, []);

  // Cleanup polling on unmount
  useEffect(() => {
    return stopTracking;
  }, [stopTracking]);

  // ==================== Form Handlers ====================
  const clearError = useCallback(() => setError(null), []);

  const validateAndTrack = useCallback(
    async (orderId: string, customerName?: string): Promise<boolean> => {
      try {
        // Validate order ID
        const { id, isValid, error: parseError } = parseOrderId(orderId);

        if (!isValid || !id) {
          setError(parseError || 'Invalid Order ID');
          return false;
        }

        // Validate customer name if provided
        if (customerName !== undefined && !customerName.trim()) {
          setError('Customer name is required');
          return false;
        }

        // Clear previous errors and start polling
        clearError();
        await startPolling(id);
        return true;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`Validation failed: ${errorMessage}`);
        return false;
      }
    },
    [startPolling, clearError]
  );

  const handleTrackByID = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await validateAndTrack(orderIdInput);
    },
    [orderIdInput, validateAndTrack]
  );

  const handleTrackByName = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await validateAndTrack(orderIdInput, customerNameInput);
    },
    [orderIdInput, customerNameInput, validateAndTrack]
  );

  // ==================== Return organized state + actions ====================
  return {
    // State
    trackingMode,
    orderIdInput,
    customerNameInput,
    isLoading,
    error,
    currentOrderValue,

    // Actions
    setTrackingMode,
    setOrderIdInput,
    setCustomerNameInput,
    handleTrackByID,
    handleTrackByName,
    clearError,
    stopTracking,
  };
}

/**
 * Hook to fetch a single order by ID
 */
export function useOrder(orderId: string) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const client = await getOrCreateApiClient();
      const result = await (
        client as unknown as {
          ordersGet(id: string): Promise<unknown>;
        }
      ).ordersGet(orderId);
      return extractResultData<Order>(result);
    },
    enabled: !!orderId,
    staleTime: 1000 * 30, // 30 seconds (orders change frequently)
  });
}
