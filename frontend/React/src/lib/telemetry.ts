/**
 * OpenTelemetry Configuration
 * Provides distributed tracing and observability for the React application
 */

import { context, SpanStatusCode, trace } from '@opentelemetry/api';

// Initialize the OpenTelemetry tracer
const tracer = trace.getTracer('react-app', '1.0.0');

/**
 * Create a span for tracking async operations
 * @param name - The name of the operation
 * @param fn - The async function to execute
 * @returns The result of the function
 */
export async function withSpan<T>(
  name: string,
  fn: (span: ReturnType<typeof tracer.startSpan>) => Promise<T>
): Promise<T> {
  const span = tracer.startSpan(name);

  return context.with(trace.setSpan(context.active(), span), async () => {
    try {
      const result = await fn(span);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
      span.recordException(error as Error);
      throw error;
    } finally {
      span.end();
    }
  });
}

/**
 * Add attributes to the current span
 * @param attributes - Object containing key-value pairs
 */
export function addSpanAttributes(attributes: Record<string, string | number | boolean>) {
  const span = trace.getActiveSpan();
  if (span) {
    Object.entries(attributes).forEach(([key, value]) => {
      span.setAttribute(key, value);
    });
  }
}

/**
 * Record an event on the current span
 * @param name - Event name
 * @param attributes - Optional event attributes
 */
export function recordSpanEvent(
  name: string,
  attributes?: Record<string, string | number | boolean>
) {
  const span = trace.getActiveSpan();
  if (span) {
    span.addEvent(name, attributes);
  }
}

/**
 * Execute an async operation with automatic span, telemetry, and error handling
 * Eliminates the need for try-catch blocks in telemetry code
 * @param spanName - The name of the operation span
 * @param fn - The async function to execute
 * @param attributes - Optional attributes to add to the span
 * @returns The result of the function
 */
export async function withSpanAndTelemetry<T>(
  spanName: string,
  fn: () => Promise<T>,
  attributes?: Record<string, string | number | boolean>
): Promise<T> {
  return withSpan(spanName, async () => {
    try {
      if (attributes) {
        addSpanAttributes(attributes);
      }
      const result = await fn();
      recordSpanEvent(`${spanName}.success`, attributes || {});
      return result;
    } catch (error) {
      recordSpanEvent(`${spanName}.exception`, {
        'error.message': error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  });
}

export { tracer };
