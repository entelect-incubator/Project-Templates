/**
 * API Client with Error Handling & Type Safety
 *
 * Features:
 * - Automatic error handling and retries
 * - Request/response logging (dev mode)
 * - AbortSignal support for cancellation
 * - Type-safe requests and responses
 * - Proper HTTP status code handling
 * - Network error recovery
 *
 * Phase 6: API Layer Integration
 * Provides the foundation for all API communication
 */

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
 * API Client - Handles all HTTP requests
 * Replace with actual generated client after backend API is ready
 */
class ApiClient {
  private baseUrl: string;
  private retries = 3;
  private retryDelay = 1000;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || import.meta.env['VITE_API_BASE_URL'] || 'http://localhost:5000';
  }

  /**
   * Helper to make API requests with error handling
   */
  private async request<T>(endpoint: string, options: RequestInit & FetchOptions = {}): Promise<T> {
    const { signal, retries = this.retries, retryDelay = this.retryDelay } = options;
    const url = `${this.baseUrl}${endpoint}`;

    // Log request in dev mode
    if (import.meta.env.DEV) {
      console.log(`🔷 ${options.method || 'GET'} ${endpoint}`);
    }

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const fetchInit: RequestInit = {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        };

        if (signal) {
          fetchInit.signal = signal;
        }

        const response = await fetch(url, fetchInit);

        // Handle error responses
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            errorData = { message: response.statusText };
          }

          const error = new ApiError(
            response.status,
            errorData.message || response.statusText,
            errorData
          );

          if (import.meta.env.DEV) {
            console.error(`🔴 ${response.status} ${error.message}`);
          }

          // Retry on 5xx errors (server errors)
          if (response.status >= 500 && attempt < retries) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay * (attempt + 1)));
            continue;
          }

          throw error;
        }

        // Handle 204 No Content
        if (response.status === 204) {
          if (import.meta.env.DEV) {
            console.log(`✓ ${response.status} (No Content)`);
          }
          return undefined as T;
        }

        const data = (await response.json()) as T;

        if (import.meta.env.DEV) {
          console.log(`✓ ${response.status} ${endpoint}`, data);
        }

        return data;
      } catch (error) {
        // Retry on network errors
        if (error instanceof TypeError && attempt < retries) {
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

    throw new ApiError(0, 'Max retries exceeded');
  }

  /**
   * GET request
   */
  async getTodos(page: number, pageSize: number, options?: FetchOptions) {
    return this.request<any>(`/api/todos?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      ...options,
    });
  }

  /**
   * GET single todo
   */
  async getTodoById(id: string, options?: FetchOptions) {
    return this.request<any>(`/api/todos/${id}`, {
      method: 'GET',
      ...options,
    });
  }

  /**
   * Search todos
   */
  async searchTodos(query: string, page: number, pageSize: number, options?: FetchOptions) {
    return this.request<any>(
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
    return this.request<any>('/api/todos', {
      method: 'POST',
      body: JSON.stringify(command),
      ...options,
    });
  }

  /**
   * PUT - Update todo
   */
  async updateTodo(id: string, command: unknown, options?: FetchOptions) {
    return this.request<any>(`/api/todos/${id}`, {
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
