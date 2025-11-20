/**
 * Global error logging utility
 * Centralized error handling and logging for both client and server
 */

export interface ErrorContext {
  timestamp?: string;
  url?: string;
  userAgent?: string;
  userId?: string;
  sessionId?: string;
  component?: string;
  action?: string;
  // Allow any additional context
  [key: string]: unknown;
}

export interface LoggedError {
  message: string;
  stack?: string;
  context?: ErrorContext;
  level: 'error' | 'warn' | 'info';
}

/**
 * Global error logger that works in both SSR and client environments
 */
class ErrorLogger {
  private isServer = typeof window === 'undefined';

  /**
   * Log an error with context
   */
  error(error: Error | string, context?: ErrorContext): void {
    const loggedError = this.formatError(error, 'error', context);

    if (this.isServer) {
      this.logToServer(loggedError);
    } else {
      this.logToClient(loggedError);
    }
  }

  /**
   * Log a warning
   */
  warn(message: string, context?: ErrorContext): void {
    const loggedError = this.formatError(message, 'warn', context);

    if (this.isServer) {
      this.logToServer(loggedError);
    } else {
      this.logToClient(loggedError);
    }
  }

  /**
   * Log info
   */
  info(message: string, context?: ErrorContext): void {
    const loggedError = this.formatError(message, 'info', context);

    if (this.isServer) {
      this.logToServer(loggedError);
    } else {
      this.logToClient(loggedError);
    }
  }

  private formatError(
    error: Error | string,
    level: 'error' | 'warn' | 'info',
    context?: ErrorContext
  ): LoggedError {
    const message = error instanceof Error ? error.message : error;
    const stack = error instanceof Error ? error.stack : undefined;

    const enhancedContext: ErrorContext = {
      timestamp: new Date().toISOString(),
      ...(this.isServer
        ? {}
        : {
            url: window.location?.href,
            userAgent: navigator.userAgent,
          }),
      ...context,
    };

    const result: LoggedError = {
      message,
      context: enhancedContext,
      level,
    };

    if (stack) {
      result.stack = stack;
    }

    return result;
  }

  private logToServer(loggedError: LoggedError): void {
    // Server-side logging - intentional console usage for logging infrastructure
    /* eslint-disable no-console */
    if (loggedError.level === 'error') {
      console.error(`[ERROR] ${loggedError.message}`, loggedError.context);
    } else if (loggedError.level === 'warn') {
      console.warn(`[WARN] ${loggedError.message}`, loggedError.context);
    } else {
      console.log(`[INFO] ${loggedError.message}`, loggedError.context);
    }

    if (loggedError.stack) {
      console.error('Stack trace:', loggedError.stack);
    }
    /* eslint-enable no-console */
  }

  private logToClient(loggedError: LoggedError): void {
    // Client-side logging - intentional console usage for logging infrastructure
    /* eslint-disable no-console */
    if (loggedError.level === 'error') {
      console.error(`[ERROR] ${loggedError.message}`, loggedError.context);
    } else if (loggedError.level === 'warn') {
      console.warn(`[WARN] ${loggedError.message}`, loggedError.context);
    } else {
      console.log(`[INFO] ${loggedError.message}`, loggedError.context);
    }

    if (loggedError.stack) {
      console.error('Stack trace:', loggedError.stack);
    }
    /* eslint-enable no-console */

    // In production, you might want to send to external service
    if (import.meta.env.PROD && loggedError.level === 'error') {
      this.sendToExternalService(loggedError);
    }
  }

  private sendToExternalService(_loggedError: LoggedError): void {
    // Example: Send to external logging service
    // This could be Sentry, LogRocket, DataDog, etc.
    try {
      // Uncomment and configure for your logging service
      // fetch('/api/log-error', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(loggedError),
      // }).catch(() => {
      //   // Silently fail - don't create infinite loops
      // });
    } catch {
      // Silently fail to prevent infinite error loops
    }
  }
}

// Export singleton instance
export const logger = new ErrorLogger();

/**
 * Helper to create error context for API calls
 */
export function createApiErrorContext(
  endpoint: string,
  method: string = 'GET',
  additionalContext?: ErrorContext
): ErrorContext {
  return {
    component: 'API',
    action: `${method} ${endpoint}`,
    ...additionalContext,
  };
}

/**
 * Helper to create error context for components
 */
export function createComponentErrorContext(
  componentName: string,
  action: string,
  additionalContext?: ErrorContext
): ErrorContext {
  return {
    component: componentName,
    action,
    ...additionalContext,
  };
}
