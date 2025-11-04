/**
 * Debounce and Caching Utilities
 * Provides utilities for debouncing functions and managing request caching
 */

/**
 * Creates a debounced version of a function
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Creates a debounced async function with result caching
 * @param fn - The async function to debounce
 * @param delay - Delay in milliseconds
 * @returns Object with debounced function and signal controller
 */
export function debouncedAsync<T extends (...args: any[]) => Promise<any>>(fn: T, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastAbortController: AbortController | null = null;
  const cache = new Map<string, any>();

  const debouncedFn = (...args: Parameters<T>) => {
    // Cancel previous request
    if (lastAbortController) {
      lastAbortController.abort();
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const cacheKey = JSON.stringify(args);

    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        // Check cache first
        if (cache.has(cacheKey)) {
          resolve(cache.get(cacheKey));
          return;
        }

        lastAbortController = new AbortController();

        try {
          const result = await fn(...args);
          cache.set(cacheKey, result);
          resolve(result);
        } catch (error) {
          if (error instanceof Error && error.name !== 'AbortError') {
            reject(error);
          }
        }
      }, delay);
    });
  };

  return {
    debouncedFn,
    clearCache: () => cache.clear(),
    getSignal: () => lastAbortController?.signal,
  };
}

/**
 * CacheSignal helper for React Query integration
 * Provides a way to invalidate cache and abort requests
 */
export class CacheSignal {
  private abortController: AbortController;
  private cacheMap: Map<string, any>;
  private cacheTimers: Map<string, NodeJS.Timeout>;

  constructor(private cacheDuration: number = 5 * 60 * 1000) {
    // 5 minutes default
    this.abortController = new AbortController();
    this.cacheMap = new Map();
    this.cacheTimers = new Map();
  }

  /**
   * Get or create cache entry
   */
  getOrSet<T>(key: string, fn: () => T | Promise<T>, duration?: number): T | Promise<T> {
    if (this.cacheMap.has(key)) {
      return this.cacheMap.get(key);
    }

    const result = fn();
    const cacheDuration = duration ?? this.cacheDuration;

    if (result instanceof Promise) {
      return result.then((value) => {
        this.setCacheEntry(key, value, cacheDuration);
        return value;
      });
    } else {
      this.setCacheEntry(key, result, cacheDuration);
      return result;
    }
  }

  /**
   * Set cache entry with auto-expiration
   */
  private setCacheEntry<T>(key: string, value: T, duration: number) {
    // Clear existing timer
    const existingTimer = this.cacheTimers.get(key);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    this.cacheMap.set(key, value);

    // Set auto-expiration
    const timer = setTimeout(() => {
      this.cacheMap.delete(key);
      this.cacheTimers.delete(key);
    }, duration);

    this.cacheTimers.set(key, timer);
  }

  /**
   * Invalidate specific cache entry
   */
  invalidate(key: string) {
    const timer = this.cacheTimers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.cacheTimers.delete(key);
    }
    this.cacheMap.delete(key);
  }

  /**
   * Invalidate all cache entries matching a pattern
   */
  invalidatePattern(pattern: RegExp) {
    Array.from(this.cacheMap.keys()).forEach((key) => {
      if (pattern.test(key)) {
        this.invalidate(key);
      }
    });
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cacheTimers.forEach((timer) => clearTimeout(timer));
    this.cacheMap.clear();
    this.cacheTimers.clear();
  }

  /**
   * Get abort signal for fetch requests
   */
  getSignal(): AbortSignal {
    return this.abortController.signal;
  }

  /**
   * Abort all in-flight requests
   */
  abort() {
    this.abortController.abort();
    this.abortController = new AbortController();
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cacheMap.size;
  }

  /**
   * Get all cached keys
   */
  keys(): string[] {
    return Array.from(this.cacheMap.keys());
  }
}

export const globalCacheSignal = new CacheSignal();
