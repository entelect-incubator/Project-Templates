/**
 * Client-side hydration entry point for React 19.2 SSR
 * Handles client-side hydration with prefetched server data
 */

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { queryClient } from './lib/queryClient';
import './styles/globals.scss';

/**
 * Initialize client-side hydration with server-prefetched data
 */
function initializeClientApp() {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root container not found');
  }

  // Check if there's server-prefetched data
  const dehydratedStateElement = document.getElementById('__REACT_QUERY_STATE__');
  if (dehydratedStateElement) {
    try {
      const dehydratedState = JSON.parse(dehydratedStateElement.textContent || '{}');
      // Hydrate the query client with server data
      queryClient.setQueryData(['pizzas'], dehydratedState);
    } catch (error) {
      console.warn('Failed to parse server state:', error);
    }
  }

  const AppWithProviders = () => (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </React.StrictMode>
  );

  // Use hydrateRoot for SSR, or createRoot for CSR
  if (container.hasChildNodes()) {
    // SSR hydration
    hydrateRoot(container, <AppWithProviders />);
  } else {
    // Client-side only rendering (fallback)
    const root = createRoot(container);
    root.render(<AppWithProviders />);
  }
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeClientApp);
} else {
  initializeClientApp();
}
