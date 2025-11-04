/**
 * Custom React Hooks - React 19.2+ Optimized
 * Reusable hooks for common functionality
 *
 * Note: useEvent (useEffectEvent) is in React 19.2 experimental.
 * Removing unnecessary effects and simplifying hook logic.
 */

import { useEffect, useRef, useState } from 'react';
import { debounce } from '@/lib/helpers/cache';

/**
 * Hook for debounced search with React Query integration
 * Optimized for React 19.2+ - simplified effect dependencies
 *
 * @param searchFn - Async function to call for search
 * @param delay - Debounce delay in milliseconds
 * @returns Search state and handlers
 */
export function useDebouncedSearch<T>(
  searchFn: (query: string, signal?: AbortSignal) => Promise<T>,
  delay: number = 300
) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Store searchFn and delay in refs to avoid dependency array issues
  const searchFnRef = useRef(searchFn);
  const delayRef = useRef(delay);

  useEffect(() => {
    searchFnRef.current = searchFn;
    delayRef.current = delay;
  }, [searchFn, delay]);

  // Single effect for debounced search - cleaner and more efficient
  useEffect(() => {
    // Create debounced search function inside effect
    const debouncedSearch = debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults(null);
        setError(null);
        return;
      }

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setIsLoading(true);
      setError(null);

      try {
        const data = await searchFnRef.current(searchQuery, abortControllerRef.current.signal);
        setResults(data);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }, delayRef.current);

    // Only perform search when query changes
    if (query) {
      debouncedSearch(query);
    }

    // Cleanup on unmount or query change
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query]);

  return {
    query,
    results,
    isLoading,
    error,
    setQuery,
    clearResults: () => {
      setQuery('');
      setResults(null);
      setError(null);
    },
  };
}

/**
 * Hook for async state management with loading and error states
 * Optimized for React 19.2+ - cleaner abort handling
 *
 * @param asyncFn - Async function to execute
 * @param deps - Dependency array
 * @returns Data, loading, and error state
 */
export function useAsync<T>(
  asyncFn: (signal: AbortSignal) => Promise<T>,
  deps: React.DependencyList = []
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const executeAsync = async () => {
      try {
        setIsLoading(true);
        const result = await asyncFn(abortController.signal);

        // Only update if not aborted
        if (!abortController.signal.aborted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    executeAsync();

    // Clean up by aborting the request
    return () => {
      abortController.abort();
    };
  }, deps);

  return { data, isLoading, error };
}

/**
 * Hook for media query matching
 * Optimized for React 19.2+ - single effect with cleanup
 *
 * @param query - CSS media query
 * @returns Boolean indicating if media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Update on change
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Use addEventListener instead of deprecated addListener
    mediaQueryList.addEventListener('change', handleChange);

    // Return cleanup function
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

/**
 * Hook for local storage with type safety
 * Optimized for React 19.2+ - no unnecessary effects
 *
 * @param key - Storage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns Tuple of [value, setValue]
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return initialValue;

      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // setValue doesn't need useCallback since key dependency is stable
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Hook for previous value
 * @param value - Current value
 * @returns Previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * Hook for mounted state (for SSR compatibility)
 * @returns Boolean indicating if component is mounted
 */
export function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}
