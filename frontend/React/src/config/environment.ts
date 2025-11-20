/**
 * Environment configuration
 * Centralizes environment variables and default values
 */

export interface EnvironmentConfig {
  apiBaseUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
  isServer: boolean;
}

/**
 * Get environment configuration
 */
export function getEnvironment(): EnvironmentConfig {
  const isDevelopment = import.meta.env.DEV;
  const isProduction = import.meta.env.PROD;
  const isServer = typeof window === 'undefined';

  // API Base URL configuration
  // Defaults to localhost:5001 for development
  const defaultApiUrl = isDevelopment ? 'https://localhost:5001' : 'https://api.pizzatracker.com'; // Replace with your production API URL

  const apiBaseUrl = import.meta.env['VITE_API_BASE_URL'] || defaultApiUrl;

  return {
    apiBaseUrl,
    isDevelopment,
    isProduction,
    isServer,
  };
}

/**
 * Environment constants
 */
export const ENV = getEnvironment();

/**
 * API endpoints builder
 */
export const API_ENDPOINTS = {
  pizzas: `${ENV.apiBaseUrl}/api/pizzas`,
  orders: `${ENV.apiBaseUrl}/api/orders`,
  health: `${ENV.apiBaseUrl}/health`,
} as const;

/**
 * Validate environment configuration
 * Should be called during application startup
 */
export function validateEnvironment(): void {
  const { apiBaseUrl } = ENV;

  if (!apiBaseUrl) {
    throw new Error('API_BASE_URL or VITE_API_BASE_URL environment variable is required');
  }

  if (!apiBaseUrl.startsWith('http')) {
    throw new Error('API_BASE_URL must be a valid HTTP/HTTPS URL');
  }
}
