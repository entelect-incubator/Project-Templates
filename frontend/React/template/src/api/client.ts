/**
 * API Client with Network Status Awareness & Error Handling
 *
 * Features:
 * - Network status detection (online/offline)
 * - Automatic error handling and retries
 * - Request/response logging (dev mode)
 * - AbortSignal support for cancellation
 * - Type-safe requests and responses
 * - Proper HTTP status code handling
 * - Telemetry integration
 *
 * Phase 6: API Layer Integration
 * Provides the foundation for all API communication with network awareness
 */

import { addSpanAttributes, recordSpanEvent, withSpan } from '@/lib/telemetry';

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface FetchOptions {
  signal?: AbortSignal | null;
  /** Number of retry attempts (default: 3) */
  retries?: number;
  /** Delay between retries in ms (default: 1000) */
  retryDelay?: number;
}

/**
 * API Client - Handles all HTTP requests with network awareness
 * Integrates with NetworkContext for offline detection and retry logic
 */
class ApiClient {
  private baseUrl: string;
  private retries = 3;
  private retryDelay = 1000;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || import.meta.env['VITE_API_BASE_URL'] || 'https://localhost:7160';
  }

  /**
   * Helper to make API requests with error handling and network awareness
   */
  private async request<T>(
    endpoint: string,
    options: Record<string, unknown> & FetchOptions = {}
  ): Promise<T> {
    const {
      signal,
      retries = this.retries,
      retryDelay = this.retryDelay,
    } = options as FetchOptions & Record<string, unknown>;
    const url = `${this.baseUrl}${endpoint}`;

    // Check if online before making request
    if (!navigator.onLine) {
      throw new ApiError(0, 'No internet connection. Please check your network.');
    }

    return withSpan('api-request', async () => {
      // Log request in dev mode
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.log(`🔷 ${(options['method'] as string) || 'GET'} ${endpoint}`);
      }

      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const fetchInit = {
            ...options,
            headers: {
              'Content-Type': 'application/json',
              ...(options['headers'] as Record<string, string>),
            },
          };

          if (signal) {
            fetchInit.signal = signal;
          }

          const response = await fetch(url, fetchInit as Record<string, unknown>);

          addSpanAttributes({
            'http.status': response.status,
            'http.method': (options['method'] as string) || 'GET',
            'http.url': endpoint,
          });

          // Handle error responses
          if (!response.ok) {
            let errorData: unknown;
            try {
              errorData = await response.json();
            } catch {
              errorData = { message: response.statusText };
            }

            const error = new ApiError(
              response.status,
              ((errorData as Record<string, unknown>)['message'] as string) || response.statusText,
              errorData
            );

            if (import.meta.env.DEV) {
              // eslint-disable-next-line no-console
              console.error(`🔴 ${response.status} ${error.message}`);
            }

            // Retry on 5xx errors (server errors)
            if (response.status >= 500 && attempt < retries) {
              recordSpanEvent('api-retry', {
                'http.status': response.status,
                attempt: attempt + 1,
              });
              await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1)));
              continue;
            }

            recordSpanEvent('api-error', {
              'http.status': response.status,
              'error.message': error.message,
            });

            throw error;
          }

          // Handle 204 No Content
          if (response.status === 204) {
            if (import.meta.env.DEV) {
              // eslint-disable-next-line no-console
              console.log(`✓ ${response.status} (No Content)`);
            }
            recordSpanEvent('api-success', { 'http.status': 204 });
            return undefined as T;
          }

          const data = (await response.json()) as T;

          if (import.meta.env.DEV) {
            // eslint-disable-next-line no-console
            console.log(`✓ ${response.status} ${endpoint}`, data);
          }

          recordSpanEvent('api-success', { 'http.status': response.status });
          return data;
        } catch (error) {
          // Retry on network errors
          if (error instanceof TypeError && attempt < retries) {
            recordSpanEvent('api-network-error', {
              attempt: attempt + 1,
              'error.message': error instanceof Error ? error.message : 'Network error',
            });
            await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1)));
            continue;
          }

          if (error instanceof ApiError) {
            throw error;
          }

          // Network or unknown error
          throw new ApiError(0, error instanceof Error ? error.message : 'Unknown error', error);
        }
      }

      recordSpanEvent('api-max-retries', { endpoint: endpoint });
      throw new ApiError(0, 'Max retries exceeded');
    });
  }

  /**
   * GET request
   */
  async getTodos(page: number, pageSize: number, options?: FetchOptions) {
    return this.request<unknown>(`/api/todos?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      ...options,
    });
  }

  /**
   * GET single todo
   */
  async getTodoById(id: string, options?: FetchOptions) {
    return this.request<unknown>(`/api/todos/${id}`, {
      method: 'GET',
      ...options,
    });
  }

  /**
   * Search todos
   */
  async searchTodos(query: string, page: number, pageSize: number, options?: FetchOptions) {
    return this.request<unknown>(
      `/api/todos/search?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`,
      {
        method: 'GET',
        ...options,
      }
    );
  }

  /**
   * POST - Create todo
   */
  async createTodo(command: unknown, options?: FetchOptions) {
    return this.request<unknown>('/api/todos', {
      method: 'POST',
      body: JSON.stringify(command),
      ...options,
    });
  }

  /**
   * PUT - Update todo
   */
  async updateTodo(id: string, command: unknown, options?: FetchOptions) {
    return this.request<unknown>(`/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(command),
      ...options,
    });
  }

  /**
   * DELETE - Delete todo
   */
  async deleteTodo(id: string, options?: FetchOptions) {
    return this.request<void>(`/api/todos/${id}`, {
      method: 'DELETE',
      ...options,
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
