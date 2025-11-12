/**
 * API Client Adapter
 *
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
 * Export singleton instance for use throughout the application
 */
export const apiClient = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7160',
};

export default apiClient;
