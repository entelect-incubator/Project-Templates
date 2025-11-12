/**
 * Application Configuration and Settings
 * Centralized configuration for the entire application
 * Single source of truth for magic numbers and constants
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
  /** Base URL for API calls - Default to .NET backend at https://localhost:7160 */
  BASE_URL: import.meta.env.VITE_API_URL || 'https://localhost:7160',

  /** Default timeout for API requests (ms) */
  REQUEST_TIMEOUT: 30000,

  /** Retry configuration */
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY_MS: 1000,
    BACKOFF_MULTIPLIER: 2,
  },
} as const;

/**
 * Pagination Configuration
 */
export const PAGINATION_CONFIG = {
  /** Default page size for list views */
  DEFAULT_PAGE_SIZE: 10,

  /** Available page size options */
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50] as const,

  /** Maximum page size allowed */
  MAX_PAGE_SIZE: 100,

  /** Minimum page size allowed */
  MIN_PAGE_SIZE: 1,
} as const;

/**
 * Search Configuration
 */
export const SEARCH_CONFIG = {
  /** Debounce delay for search input (ms) */
  DEBOUNCE_DELAY: 300,

  /** Minimum characters required to search */
  MIN_SEARCH_LENGTH: 1,

  /** Search result cache TTL (ms) */
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
} as const;

/**
 * React Query Configuration
 */
export const QUERY_CONFIG = {
  /** How long data is fresh before refetching (ms) */
  STALE_TIME: 1 * 60 * 1000, // 1 minute

  /** How long to keep unused data in cache (ms) */
  GC_TIME: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

  /** Retry failed requests */
  RETRY: 3,

  /** Delay before first retry (ms) */
  RETRY_DELAY: 1000,
} as const;

/**
 * Cache Configuration
 */
export const CACHE_CONFIG = {
  /** Default TTL for cached items (ms) */
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes

  /** Maximum cache size before cleanup */
  MAX_SIZE: 50,

  /** Cache invalidation patterns */
  PATTERNS: {
    TODOS: 'todos',
    TODOS_DETAIL: 'todos-detail',
    TODOS_SEARCH: 'todos-search',
  },
} as const;

/**
 * Toast Configuration
 */
export const TOAST_CONFIG = {
  /** Toast display duration (ms) */
  DURATION: 4000,

  /** Maximum number of toasts shown simultaneously */
  MAX_TOASTS: 5,

  /** Toast position on screen */
  POSITION: 'bottom-right' as const,

  /** Close button visibility */
  CLOSE_BUTTON: true,
} as const;

/**
 * Validation Configuration
 */
export const VALIDATION_CONFIG = {
  /** Max length for text inputs */
  MAX_TEXT_LENGTH: 255,

  /** Min length for text inputs */
  MIN_TEXT_LENGTH: 1,

  /** Max length for descriptions */
  MAX_DESCRIPTION_LENGTH: 1000,

  /** Min length for descriptions */
  MIN_DESCRIPTION_LENGTH: 0,

  /** Email validation regex */
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  /** URL validation regex */
  URL_REGEX: /^https?:\/\/.+/,
} as const;

/**
 * Performance Configuration
 */
export const PERFORMANCE_CONFIG = {
  /** Enable React Compiler optimization (controlled by Babel) */
  REACT_COMPILER_ENABLED: true,

  /** Enable automatic code splitting */
  CODE_SPLITTING_ENABLED: true,

  /** Enable lazy loading for routes */
  LAZY_LOADING_ENABLED: true,

  /** Bundle analysis enabled in development */
  BUNDLE_ANALYSIS_DEV: false,
} as const;

/**
 * Security Configuration
 */
export const SECURITY_CONFIG = {
  /** CSP headers (configured in server) */
  CSP_ENABLED: true,

  /** CORS allowed origins */
  CORS_ORIGINS: [import.meta.env.VITE_API_URL || 'http://localhost:5000'],

  /** Secure cookie settings */
  SECURE_COOKIES: !import.meta.env.DEV,

  /** X-Frame-Options header value */
  X_FRAME_OPTIONS: 'DENY' as const,

  /** X-Content-Type-Options header value */
  X_CONTENT_TYPE_OPTIONS: 'nosniff' as const,
} as const;

/**
 * Feature Flags
 */
export const FEATURE_FLAGS = {
  /** Enable debug mode with additional logging */
  DEBUG_MODE: import.meta.env.DEV,

  /** Enable telemetry collection */
  TELEMETRY_ENABLED: !import.meta.env.DEV,

  /** Enable error boundary */
  ERROR_BOUNDARY_ENABLED: true,

  /** Enable Suspense batching for SSR */
  SUSPENSE_BATCHING_ENABLED: true,
} as const;

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Invalid input. Please check your data.',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  DUPLICATE_ERROR: 'This resource already exists.',
  GENERIC_ERROR: 'An error occurred. Please try again.',
} as const;

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  CREATED: 'Successfully created.',
  UPDATED: 'Successfully updated.',
  DELETED: 'Successfully deleted.',
  SAVED: 'Successfully saved.',
  LOADED: 'Successfully loaded.',
} as const;

/**
 * Environment Variables
 * Type-safe access to environment variables with defaults
 */
export const ENV = {
  /** API base URL - Default to .NET backend at https://localhost:7160 */
  API_URL: import.meta.env.VITE_API_URL || 'https://localhost:7160',

  /** API timeout */
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10),

  /** App environment */
  ENVIRONMENT: (import.meta.env.VITE_ENV || 'development') as
    | 'development'
    | 'staging'
    | 'production',

  /** Is development mode */
  IS_DEV: import.meta.env.DEV,

  /** Is production mode */
  IS_PROD: import.meta.env.PROD,

  /** App version */
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
} as const;

/**
 * Export all configuration as a single object
 */
export const CONFIG = {
  API: API_CONFIG,
  PAGINATION: PAGINATION_CONFIG,
  SEARCH: SEARCH_CONFIG,
  QUERY: QUERY_CONFIG,
  CACHE: CACHE_CONFIG,
  TOAST: TOAST_CONFIG,
  VALIDATION: VALIDATION_CONFIG,
  PERFORMANCE: PERFORMANCE_CONFIG,
  SECURITY: SECURITY_CONFIG,
  FEATURE_FLAGS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ENV,
} as const;

export default CONFIG;
