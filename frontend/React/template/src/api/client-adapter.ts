/**
 * API Client Adapter
 *
 * Serves as a bridge between the React application and the OpenAPI-generated client.
 *
 * Features:
 * - Error handling and retries
 * - Request/response logging (dev mode)
 * - Type safety with custom error types
 * - Integration with React Query
 * - Switchable between manual and generated implementations
 *
 * To use the auto-generated client from OpenAPI:
 * 1. Run: npm run generate:client in the React project
 * 2. Uncomment the import from '@/api/generated'
 * 3. Replace the manual implementation with calls to generatedClient
 *
 * Architecture:
 * - This adapter provides a consistent interface
 * - The underlying implementation can be manual or generated
 * - Generated client is wrapped for retry logic and error handling
 */

import type {
  TodoDto,
  CreateTodoCommand,
  UpdateTodoCommand,
  PaginatedTodosDto,
} from '@/features/todos/types';

/**
 * Custom API Error with enhanced information
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Fetch options for API requests
 */
export interface FetchOptions {
  signal?: AbortSignal | null;
  /** Number of retry attempts (default: 3) */
  retries?: number;
  /** Delay between retries in ms (default: 1000) */
  retryDelay?: number;
}

/**
 * API Client Adapter
 *
 * Provides a consistent interface for API communication.
 * Can be backed by either manual implementation or generated OpenAPI client.
 *
 * Current: Manual implementation
 * Future: Auto-generated from OpenAPI specification
 */
export class ApiClientAdapter {
  private baseUrl: string;
  private retries = 3;
  private retryDelay = 1000;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || import.meta.env['VITE_API_BASE_URL'] || 'http://localhost:5000';
  }

  /**
   * Get all todos with pagination
   */
  async getTodos(
    page: number = 1,
    pageSize: number = 10,
    options?: FetchOptions
  ): Promise<PaginatedTodosDto> {
    return this.executeWithRetry(
      async () => {
        if (import.meta.env.DEV) {
          console.log(`🔷 GET /api/todos?page=${page}&pageSize=${pageSize}`);
        }
        const response = await fetch(
          `${this.baseUrl}/api/todos?page=${page}&pageSize=${pageSize}`,
          { signal: options?.signal || null }
        );
        return this.handleResponse<PaginatedTodosDto>(response);
      },
      'getTodos',
      options
    );
  }

  /**
   * Get a single todo by ID
   */
  async getTodoById(id: string, options?: FetchOptions): Promise<TodoDto> {
    return this.executeWithRetry(
      async () => {
        if (import.meta.env.DEV) {
          console.log(`🔷 GET /api/todos/${id}`);
        }
        const response = await fetch(`${this.baseUrl}/api/todos/${id}`, {
          signal: options?.signal || null,
        });
        return this.handleResponse<TodoDto>(response);
      },
      'getTodoById',
      options
    );
  }

  /**
   * Create a new todo
   */
  async createTodo(command: CreateTodoCommand, options?: FetchOptions): Promise<TodoDto> {
    return this.executeWithRetry(
      async () => {
        if (import.meta.env.DEV) {
          console.log(`🔷 POST /api/todos`, command);
        }
        const response = await fetch(`${this.baseUrl}/api/todos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(command),
          signal: options?.signal || null,
        });
        return this.handleResponse<TodoDto>(response);
      },
      'createTodo',
      options
    );
  }

  /**
   * Update an existing todo
   */
  async updateTodo(
    id: string,
    command: UpdateTodoCommand,
    options?: FetchOptions
  ): Promise<TodoDto> {
    return this.executeWithRetry(
      async () => {
        if (import.meta.env.DEV) {
          console.log(`🔷 PUT /api/todos/${id}`, command);
        }
        const response = await fetch(`${this.baseUrl}/api/todos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(command),
          signal: options?.signal || null,
        });
        return this.handleResponse<TodoDto>(response);
      },
      'updateTodo',
      options
    );
  }

  /**
   * Delete a todo
   */
  async deleteTodo(id: string, options?: FetchOptions): Promise<void> {
    return this.executeWithRetry(
      async () => {
        if (import.meta.env.DEV) {
          console.log(`🔷 DELETE /api/todos/${id}`);
        }
        const response = await fetch(`${this.baseUrl}/api/todos/${id}`, {
          method: 'DELETE',
          signal: options?.signal || null,
        });
        if (!response.ok) {
          throw new ApiError(response.status, response.statusText);
        }
      },
      'deleteTodo',
      options
    );
  }

  /**
   * Search todos
   */
  async searchTodos(
    query: string,
    page: number = 1,
    pageSize: number = 10,
    options?: FetchOptions
  ): Promise<PaginatedTodosDto> {
    return this.executeWithRetry(
      async () => {
        if (import.meta.env.DEV) {
          console.log(`🔷 GET /api/todos/search?query=${query}&page=${page}&pageSize=${pageSize}`);
        }
        const response = await fetch(
          `${this.baseUrl}/api/todos/search?query=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`,
          { signal: options?.signal || null }
        );
        return this.handleResponse<PaginatedTodosDto>(response);
      },
      'searchTodos',
      options
    );
  }

  /**
   * Execute a request with retry logic and error handling
   */
  private async executeWithRetry<T>(
    fn: () => Promise<T>,
    operationName: string,
    options?: FetchOptions
  ): Promise<T> {
    const maxRetries = options?.retries ?? this.retries;
    const delay = options?.retryDelay ?? this.retryDelay;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        // Check abort signal
        if (options?.signal?.aborted) {
          throw new Error('Request was cancelled');
        }

        const result = await fn();
        if (import.meta.env.DEV) {
          console.log(`🟢 ${operationName} succeeded`);
        }
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        if (import.meta.env.DEV) {
          console.error(`🔴 ${operationName} failed:`, errorMessage);
        }

        // Only retry on network-related errors, not on client errors (4xx)
        const isNetworkError = !(error instanceof Error && error.message.includes('4'));
        const shouldRetry = attempt < maxRetries && isNetworkError;

        if (shouldRetry) {
          const waitTime = delay * (attempt + 1);
          if (import.meta.env.DEV) {
            console.log(`⏳ Retrying in ${waitTime}ms (attempt ${attempt + 1}/${maxRetries})`);
          }
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }

        // Convert error to ApiError if not already
        if (error instanceof ApiError) {
          throw error;
        }

        throw new ApiError(500, errorMessage, { originalError: error });
      }
    }

    throw new ApiError(500, `Failed to complete ${operationName} after ${maxRetries} retries`);
  }

  /**
   * Helper to handle HTTP responses
   */
  private async handleResponse<T>(response: Response): Promise<T> {
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

      throw error;
    }

    return response.json();
  }
}

/**
 * Export singleton instance for use throughout the application
 */
export const apiClient = new ApiClientAdapter();

/**
 * Re-export types for convenience
 */
export type { TodoDto, CreateTodoCommand, UpdateTodoCommand, PaginatedTodosDto };

export default apiClient;
