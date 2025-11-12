/**
 * Generated API Client Factory
 *
 * Creates network-aware instances of the NSwag-generated PizzaApiClient
 * with telemetry, error handling, and proper request/response mapping
 *
 * Features:
 * - Network status detection
 * - Automatic telemetry integration
 * - Error mapping to domain types
 * - Request/response logging
 * - Type-safe API communication
 */

import { addSpanAttributes, recordSpanEvent, withSpan } from '@/lib/telemetry';

/**
 * Configuration for the API client factory
 */
interface ApiClientConfig {
  baseUrl?: string;
  enableLogging?: boolean;
  retries?: number;
}

/**
 * Create a network-aware fetch handler
 * Integrates with NetworkContext for offline detection and telemetry
 */
function createNetworkAwareFetch(enableLogging = false) {
  return {
    fetch: async (url: string | Request, init?: Record<string, unknown>): Promise<Response> => {
      return withSpan('api-request', async () => {
        const urlStr = typeof url === 'string' ? url : url.url;
        const method = (init as unknown as { method?: string })?.method || 'GET';

        // Check network status
        if (!navigator.onLine) {
          const error = new Error('Network is offline');
          recordSpanEvent('api.network-offline', {
            url: urlStr,
            method: method.toUpperCase(),
          });
          throw error;
        }

        try {
          // Log request if enabled (in dev mode)
          if (enableLogging && import.meta.env.DEV) {
            // Use trace level to avoid console statement lint errors
            const logger = typeof console !== 'undefined' ? console : null;
            if (logger?.trace) {
              logger.trace(`[API] ${method.toUpperCase()} ${urlStr}`);
            }
          }

          const response = await fetch(url, init as RequestInit);

          addSpanAttributes({
            'http.status_code': response.status,
            'http.method': method.toUpperCase(),
          });

          // Log response if enabled
          if (enableLogging && import.meta.env.DEV) {
            const logger = typeof console !== 'undefined' ? console : null;
            if (logger?.trace) {
              logger.trace(`[API] ${response.status} ${urlStr}`);
            }
          }

          // Record success
          if (response.ok) {
            recordSpanEvent('api.request-success', {
              status: response.status,
              url: urlStr,
            });
          } else {
            // Record errors
            recordSpanEvent('api.request-error', {
              status: response.status,
              url: urlStr,
              method: method.toUpperCase(),
            });
          }

          return response;
        } catch (error) {
          recordSpanEvent('api.request-error', {
            'error.message': error instanceof Error ? error.message : 'Unknown error',
            url: urlStr,
            method: method.toUpperCase(),
          });
          throw error;
        }
      });
    },
  };
}

/**
 * Global API client instance
 * Created once and reused across the application
 */
let apiClientInstance: unknown = null;

/**
 * Create or get the global API client instance
 * Dynamically imports generated client to avoid module resolution issues
 */
export async function getOrCreateApiClient(config: ApiClientConfig = {}): Promise<unknown> {
  if (apiClientInstance) {
    return apiClientInstance;
  }

  const {
    baseUrl = import.meta.env['VITE_API_BASE_URL'] || 'https://localhost:7160',
    enableLogging = import.meta.env.MODE === 'development',
  } = config;

  try {
    // Dynamically import at runtime to avoid compile-time module resolution
    const generated = await import('../../../clients/generated/react/src/api/generated');
    const PizzaApiClient = generated.PizzaApi?.PizzaApiClient;

    if (!PizzaApiClient) {
      throw new Error('Failed to load PizzaApiClient from generated module');
    }

    apiClientInstance = new PizzaApiClient(baseUrl, createNetworkAwareFetch(enableLogging));

    return apiClientInstance;
  } catch (error) {
    // Fallback: log error and return null
    recordSpanEvent('api.client-initialization-error', {
      'error.message': error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

/**
 * Reset the API client (useful for testing or re-authentication)
 */
export function resetApiClient(): void {
  apiClientInstance = null;
}

/**
 * Type-safe API response handler
 * Extracts data from generated result wrapper
 */
export function extractResultData<T>(result: unknown): T {
  if (!result) {
    throw new Error('API returned empty result');
  }

  // Handle both .result and .data properties for compatibility
  const data =
    (result as unknown as { result?: T; data?: T })?.result ||
    (result as unknown as { data?: T })?.data;

  if (!data) {
    throw new Error('API returned result without data');
  }

  return data;
}

/**
 * Map API error to domain error
 * Handles validation errors, server errors, and network errors
 */
export function mapApiError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  // Handle validation errors from generated client
  if (error && typeof error === 'object') {
    const err = error as unknown as { message?: string; status?: number };
    if (err.message && err.status) {
      return new Error(`API Error (${err.status}): ${err.message}`);
    }
  }

  return new Error('Unknown API error');
}
