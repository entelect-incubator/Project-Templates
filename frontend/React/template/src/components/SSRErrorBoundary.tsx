/**
 * SSR Error Boundary for React 19.2
 * Handles errors during server-side rendering with proper logging
 */

import type { ErrorInfo, ReactNode } from 'react';
import React, { Component } from 'react';
import { logger } from '../lib/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  context?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary specifically designed for SSR
 * Provides graceful error handling and logging during server-side rendering
 */
export class SSRErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error with context
    logger.error('SSR Error Boundary caught an error', {
      component: 'SSRErrorBoundary',
      action: 'error-caught',
      context: this.props.context || 'unknown',
      errorMessage: error.message,
      errorStack: error.stack,
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });

    // In development, you might want to re-throw to get the stack trace
    if (process.env['NODE_ENV'] === 'development') {
      console.error('SSR Error Boundary - Full Error Details:');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback for SSR
      return (
        <div
          style={{
            padding: '20px',
            border: '1px solid #ff6b6b',
            borderRadius: '4px',
            backgroundColor: '#ffe0e0',
            color: '#c92a2a',
            margin: '20px 0',
          }}
        >
          <h3>Something went wrong</h3>
          <p>
            {process.env['NODE_ENV'] === 'development'
              ? `Error: ${this.state.error?.message || 'Unknown error'}`
              : 'An error occurred while rendering this component.'}
          </p>
          <details style={{ marginTop: '10px' }}>
            <summary>Error details</summary>
            <pre
              style={{
                fontSize: '12px',
                backgroundColor: '#fff',
                padding: '10px',
                overflow: 'auto',
                marginTop: '5px',
              }}
            >
              {process.env['NODE_ENV'] === 'development'
                ? this.state.error?.stack || 'No stack trace available'
                : 'Error details are only available in development mode.'}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Higher-order component to wrap components with SSR error boundary
 */
export function withSSRErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  context?: string,
  fallback?: ReactNode
) {
  const ComponentWithErrorBoundary = (props: P) => {
    const boundaryProps: Props = {
      children: <WrappedComponent {...props} />,
      ...(context && { context }),
      ...(fallback && { fallback }),
    };

    return <SSRErrorBoundary {...boundaryProps} />;
  };

  ComponentWithErrorBoundary.displayName = `withSSRErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return ComponentWithErrorBoundary;
}

/**
 * Hook to create error boundary props for functional components
 */
export interface SSRErrorBoundaryProps {
  context?: string;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * Custom error boundary hook for React 19.2 SSR
 */
export function useSSRErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
    logger.error('SSR Error captured by hook', {
      component: 'useSSRErrorBoundary',
      action: 'error-captured',
      errorMessage: error.message,
    });
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError, error };
}
