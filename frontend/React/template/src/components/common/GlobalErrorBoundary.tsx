/**
 * Global Error Boundary
 * Catches React errors and provides fallback UI with logging
 */

import { Component, ErrorInfo, ReactNode } from 'react';
import { withSpan, addSpanAttributes, recordSpanEvent } from '@/lib/telemetry';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Global Error Boundary Component
 * Catches errors anywhere in the component tree
 */
export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error with telemetry
    withSpan('error-boundary-catch', async () => {
      this.setState({
        error,
        errorInfo,
      });

      addSpanAttributes({
        'error.type': error.name,
        'error.message': error.message,
        'component.stack': errorInfo.componentStack || 'unknown',
      });

      recordSpanEvent('global_error', {
        'error.type': error.name,
        'error.message': error.message,
      });

      // Send to error tracking service in production
      if (process.env['NODE_ENV'] === 'production') {
        console.error('Error caught by boundary:', error, errorInfo);
      }
    }).catch((err) => {
      console.error('Error in error boundary telemetry:', err);
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-content">
            <div className="error-icon">⚠️</div>
            <h1 className="error-boundary-title">Something went wrong</h1>
            <p className="error-boundary-message">
              An unexpected error occurred. Please try refreshing the page or contact support if the
              problem persists.
            </p>

            {process.env['NODE_ENV'] === 'development' && this.state.error && (
              <details className="error-boundary-details">
                <summary>Error Details</summary>
                <pre className="error-boundary-stack">
                  <code>
                    {this.state.error.toString()}
                    {'\n\n'}
                    {this.state.errorInfo?.componentStack}
                  </code>
                </pre>
              </details>
            )}

            <button className="error-boundary-button" onClick={this.handleReset}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
