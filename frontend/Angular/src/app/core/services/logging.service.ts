import { Injectable, inject } from '@angular/core';
import { OpenTelemetryService } from '../observability/opentelemetry.service';

/**
 * Central Logging Service
 * Provides a unified logging API that:
 * - Logs to console (development)
 * - Sends logs to Aspire via OpenTelemetry (production)
 * - Tracks operations with spans
 * - Records custom metrics
 */
@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private otel = inject(OpenTelemetryService);

  /**
   * Log a debug message
   */
  debug(message: string, context?: Record<string, unknown>): void {
    this.otel.log('debug', message, context);
  }

  /**
   * Log an info message
   */
  info(message: string, context?: Record<string, unknown>): void {
    this.otel.log('info', message, context);
  }

  /**
   * Log a warning message
   */
  warn(message: string, context?: Record<string, unknown>): void {
    this.otel.log('warn', message, context);
  }

  /**
   * Log an error message
   */
  error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void {
    const errorContext: Record<string, unknown> = { ...context };

    if (error instanceof Error) {
      errorContext['error.name'] = error.name;
      errorContext['error.message'] = error.message;
      errorContext['error.stack'] = error.stack;
    } else if (error) {
      errorContext['error.details'] = String(error);
    }

    this.otel.log('error', message, errorContext);
  }

  /**
   * Track an operation with a span
   * Automatically records duration and status
   */
  async trackOperation<T>(
    operationName: string,
    operation: () => Promise<T> | T,
    context?: Record<string, unknown>
  ): Promise<T> {
    return this.otel.createSpan(operationName, operation, context);
  }

  /**
   * Record a custom metric
   */
  recordMetric(name: string, value: number, context?: Record<string, unknown>): void {
    this.otel.recordMetric(name, value, context);
  }

  /**
   * Log a user action (for analytics/UX tracking)
   */
  trackUserAction(action: string, details?: Record<string, unknown>): void {
    this.otel.log('info', `User Action: ${action}`, {
      'user_action.name': action,
      ...details,
    });
  }

  /**
   * Log a navigation event
   */
  trackNavigation(from: string, to: string): void {
    this.otel.log('info', 'Navigation', {
      'navigation.from': from,
      'navigation.to': to,
    });
  }

  /**
   * Log an API call result
   */
  trackApiCall(
    endpoint: string,
    method: string,
    status: number,
    duration: number,
    error?: string
  ): void {
    const level = status >= 400 ? 'error' : 'info';
    this.otel.log(level, `API ${method} ${endpoint}`, {
      'http.endpoint': endpoint,
      'http.method': method,
      'http.status_code': status,
      'http.duration_ms': duration,
      ...(error && { 'http.error': error }),
    });
  }
}
