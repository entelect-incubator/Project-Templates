/**
 * Server-side rendering entry point for React 19.2
 * Handles SSR with Suspense batching for optimized data fetching
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './app/App';
import { SSRErrorBoundary } from './components/SSRErrorBoundary';
import { API_ENDPOINTS, validateEnvironment } from './config/environment';
import { logger } from './lib/logger';

/**
 * Render the application on the server with React 19.2 streaming SSR
 * @param url - The requested URL
 * @param queryClient - Pre-configured QueryClient with prefetched data
 * @returns Pipeable stream for server-side rendering
 */
export function render(url: string, queryClient?: QueryClient) {
  // Validate environment configuration on startup
  try {
    validateEnvironment();
  } catch (error) {
    logger.error('Environment validation failed', {
      component: 'entry-server',
      action: 'environment-validation',
      url,
    });
    throw error;
  }

  const client =
    queryClient ||
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
          retry: false, // Don't retry on server
        },
      },
    });

  const AppWithProviders = () => (
    <React.StrictMode>
      <SSRErrorBoundary
        context='SSR-Root'
        fallback={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Server Error</h2>
            <p>An error occurred while rendering the application on the server.</p>
          </div>
        }
      >
        <QueryClientProvider client={client}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </QueryClientProvider>
      </SSRErrorBoundary>
    </React.StrictMode>
  );

  return renderToPipeableStream(<AppWithProviders />, {
    onShellReady() {
      // Stream the initial shell immediately for better perceived performance
      logger.info('SSR shell ready for streaming', {
        component: 'entry-server',
        action: 'shell-ready',
        url,
      });
    },
    onShellError(error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error('SSR shell error occurred', {
        component: 'entry-server',
        action: 'shell-error',
        url,
        errorMessage,
      });
    },
    onAllReady() {
      // All Suspense boundaries have resolved
      logger.info('All SSR suspense boundaries resolved', {
        component: 'entry-server',
        action: 'all-ready',
        url,
      });
    },
    onError(error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error('SSR rendering error occurred', {
        component: 'entry-server',
        action: 'render-error',
        url,
        errorMessage,
      });
    },
  });
}

/**
 * Prefetch pizza data for server-side rendering
 * This enables React 19.2 Suspense batching for optimal performance
 */
export async function prefetchPizzaData(): Promise<QueryClient> {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false, // Don't retry on server
      },
    },
  });

  try {
    // Prefetch pizza data for SSR using configured API endpoint
    await queryClient.prefetchQuery({
      queryKey: ['pizzas'],
      queryFn: async () => {
        logger.info('Prefetching pizza data for SSR', {
          component: 'entry-server',
          action: 'prefetch-pizzas',
          endpoint: API_ENDPOINTS.pizzas,
        });

        const response = await fetch(API_ENDPOINTS.pizzas);
        if (!response.ok) {
          const errorMessage = `Failed to fetch pizzas: ${response.status} ${response.statusText}`;
          logger.error('Pizza data prefetch failed', {
            component: 'entry-server',
            action: 'prefetch-error',
            endpoint: API_ENDPOINTS.pizzas,
            status: response.status,
            statusText: response.statusText,
          });
          throw new Error(errorMessage);
        }

        const data = await response.json();
        logger.info('Successfully prefetched pizza data', {
          component: 'entry-server',
          action: 'prefetch-success',
          endpoint: API_ENDPOINTS.pizzas,
          dataCount: Array.isArray(data) ? data.length : 'unknown',
        });

        return data;
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error('Failed to prefetch pizza data for SSR', {
      component: 'entry-server',
      action: 'prefetch-failure',
      endpoint: API_ENDPOINTS.pizzas,
      errorMessage,
    });
    // Continue with empty cache - client will fetch on hydration
  }

  return queryClient;
}

/**
 * Get dehydrated state for client hydration
 */
export function getDehydratedState(queryClient: QueryClient) {
  return queryClient.getQueryData(['pizzas']) || null;
}
