import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, Injectable } from '@angular/core';

/**
 * Central Observability Service for client-side telemetry
 * Sends traces, logs, and metrics to Aspire's OTLP endpoint
 * Uses SSR-safe approach with browser-only initialization
 */
@Injectable({
  providedIn: 'root',
})
export class OpenTelemetryService {
  private platformId = inject(PLATFORM_ID);
  private isInitialized = false;
  private config!: TelemetryConfig;
  private pendingBatches: TelemetryPayload[] = [];
  private flushInterval?: ReturnType<typeof setInterval>;
  private otlpEnabled = true; // Disabled after connection failure

  /**
   * Initialize telemetry instrumentation (browser only)
   * Connects to Aspire's OTLP endpoint for centralized observability
   */
  async initializeTelemetry(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || this.isInitialized) {
      return;
    }

    try {
      this.config = this.getTelemetryConfig();

      // Set up instrumentation
      this.setupFetchInstrumentation();
      this.setupErrorInstrumentation();
      this.setupPerformanceMonitoring();

      // Start batch flush interval (every 5 seconds)
      this.flushInterval = setInterval(() => this.flushTelemetry(), 5000);

      this.isInitialized = true;
      this.log('info', 'OpenTelemetry initialized', { config: this.config });
    } catch (error) {
      console.warn('Failed to initialize telemetry:', error);
    }
  }

  /**
   * Get telemetry configuration from environment
   * Aspire provides OTLP endpoint via environment variables
   */
  private getTelemetryConfig(): TelemetryConfig {
    // Aspire Dashboard OTLP endpoint (default: 18889)
    // In development, uses OTEL_EXPORTER_OTLP_ENDPOINT env var from Aspire
    const otlpEndpoint =
      typeof window !== 'undefined'
        ? (window as unknown as { __OTEL_ENDPOINT__?: string }).__OTEL_ENDPOINT__ ||
          'http://localhost:18889'
        : 'http://localhost:18889';

    return {
      serviceName: 'pizza-ordering-frontend',
      serviceVersion: '1.0.0',
      environment: 'development',
      otlpEndpoint,
      otlpLogsEndpoint: `${otlpEndpoint}/v1/logs`,
      otlpTracesEndpoint: `${otlpEndpoint}/v1/traces`,
    };
  }

  /**
   * Central logging method - sends logs to both console and Aspire
   */
  log(level: LogLevel, message: string, attributes?: Record<string, unknown>): void {
    const logEntry: LogEntry = {
      timestamp: Date.now(),
      level,
      message,
      serviceName: this.config?.serviceName || 'pizza-ordering-frontend',
      attributes: {
        ...attributes,
        'browser.user_agent': typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
        'browser.url': typeof window !== 'undefined' ? window.location.href : undefined,
      },
    };

    // Always log to console
    const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
    console[consoleMethod](`[${level.toUpperCase()}]`, message, attributes || '');

    // Queue for OTLP export
    if (isPlatformBrowser(this.platformId)) {
      this.queueTelemetry({ type: 'log', data: logEntry });
    }
  }

  /**
   * Create a trace span for tracking operations
   */
  createSpan<T>(
    name: string,
    operation: () => Promise<T> | T,
    attributes?: Record<string, unknown>
  ): Promise<T> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve(operation() as T);
    }

    const spanId = this.generateId(8);
    const traceId = this.generateId(16);
    const startTime = performance.now();

    const spanData: SpanData = {
      name,
      traceId,
      spanId,
      startTime: Date.now(),
      attributes: {
        ...attributes,
        'service.name': this.config?.serviceName || 'pizza-ordering-frontend',
      },
    };

    this.log('debug', `Starting span: ${name}`, { spanId, traceId });

    const completeSpan = (status: 'ok' | 'error', error?: unknown) => {
      const endTime = performance.now();
      spanData.endTime = Date.now();
      spanData.duration = endTime - startTime;
      spanData.status = status;

      if (error) {
        spanData.attributes = {
          ...spanData.attributes,
          'error.message': error instanceof Error ? error.message : String(error),
          'error.type': error instanceof Error ? error.name : 'Error',
        };
      }

      this.queueTelemetry({ type: 'span', data: spanData });
      this.log(
        status === 'error' ? 'error' : 'debug',
        `Completed span: ${name} (${spanData.duration.toFixed(2)}ms)`,
        { spanId, status }
      );
    };

    try {
      const result = operation();

      if (result instanceof Promise) {
        return result
          .then((value) => {
            completeSpan('ok');
            return value;
          })
          .catch((error) => {
            completeSpan('error', error);
            throw error;
          });
      } else {
        completeSpan('ok');
        return Promise.resolve(result);
      }
    } catch (error) {
      completeSpan('error', error);
      throw error;
    }
  }

  /**
   * Track custom metrics
   */
  recordMetric(name: string, value: number, attributes?: Record<string, unknown>): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const metric: MetricData = {
      name,
      value,
      timestamp: Date.now(),
      attributes: {
        ...attributes,
        'service.name': this.config?.serviceName || 'pizza-ordering-frontend',
      },
    };

    this.queueTelemetry({ type: 'metric', data: metric });
  }

  /**
   * Set up fetch instrumentation to trace HTTP requests
   */
  private setupFetchInstrumentation(): void {
    if (typeof window === 'undefined') return;

    const self = this;
    const originalFetch = window.fetch;

    window.fetch = async function (...args): Promise<Response> {
      const url = args[0] instanceof Request ? args[0].url : args[0].toString();
      const method = args[1]?.method || (args[0] instanceof Request ? args[0].method : 'GET');

      // Skip OTLP endpoint requests to avoid recursion
      if (url.includes('/v1/logs') || url.includes('/v1/traces')) {
        return originalFetch.apply(this, args);
      }

      return self.createSpan(
        `HTTP ${method}`,
        async () => {
          const response = await originalFetch.apply(this, args);

          self.recordMetric('http.request.duration', 0, {
            'http.url': url,
            'http.method': method,
            'http.status_code': response.status,
          });

          return response;
        },
        {
          'http.url': url,
          'http.method': method,
        }
      ) as Promise<Response>;
    };
  }

  /**
   * Set up global error handling
   */
  private setupErrorInstrumentation(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('error', (event) => {
      this.log('error', event.message, {
        'error.filename': event.filename,
        'error.lineno': event.lineno,
        'error.colno': event.colno,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.log('error', 'Unhandled Promise rejection', {
        'error.reason': String(event.reason),
      });
    });
  }

  /**
   * Set up performance monitoring
   */
  private setupPerformanceMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Monitor page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;
        if (perfData) {
          this.recordMetric(
            'page.load.dom_content_loaded',
            perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart
          );
          this.recordMetric('page.load.complete', perfData.loadEventEnd - perfData.loadEventStart);
          this.recordMetric('page.load.total', perfData.loadEventEnd - perfData.fetchStart);

          this.log('info', 'Page load complete', {
            'page.load.total_ms': perfData.loadEventEnd - perfData.fetchStart,
          });
        }
      }, 100);
    });

    // Monitor Core Web Vitals if available
    this.observeWebVitals();
  }

  /**
   * Observe Core Web Vitals (LCP, FID, CLS)
   */
  private observeWebVitals(): void {
    if (typeof PerformanceObserver === 'undefined') return;

    // Largest Contentful Paint
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.recordMetric('web_vital.lcp', lastEntry.startTime);
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {
      /* Not supported */
    }

    // First Input Delay
    try {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming;
          this.recordMetric('web_vital.fid', fidEntry.processingStart - fidEntry.startTime);
        });
      }).observe({ type: 'first-input', buffered: true });
    } catch {
      /* Not supported */
    }

    // Cumulative Layout Shift
    try {
      let clsValue = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries() as (PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        })[];
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value || 0;
          }
        });
        this.recordMetric('web_vital.cls', clsValue);
      }).observe({ type: 'layout-shift', buffered: true });
    } catch {
      /* Not supported */
    }
  }

  /**
   * Queue telemetry for batch export
   */
  private queueTelemetry(payload: TelemetryPayload): void {
    this.pendingBatches.push(payload);

    // Flush immediately if batch is large
    if (this.pendingBatches.length >= 20) {
      this.flushTelemetry();
    }
  }

  /**
   * Flush telemetry to OTLP endpoint
   */
  private async flushTelemetry(): Promise<void> {
    if (this.pendingBatches.length === 0 || !this.config || !this.otlpEnabled) return;

    const batch = [...this.pendingBatches];
    this.pendingBatches = [];

    try {
      // Separate logs and spans
      const logs = batch.filter((p) => p.type === 'log').map((p) => p.data);
      const spans = batch.filter((p) => p.type === 'span').map((p) => p.data);

      // Send logs to OTLP endpoint
      if (logs.length > 0) {
        await this.sendToOtlp(
          this.config.otlpLogsEndpoint,
          this.formatLogsForOtlp(logs as LogEntry[])
        );
      }

      // Send traces to OTLP endpoint
      if (spans.length > 0) {
        await this.sendToOtlp(
          this.config.otlpTracesEndpoint,
          this.formatSpansForOtlp(spans as SpanData[])
        );
      }
    } catch (error) {
      // Re-queue on failure (but avoid infinite loop)
      if (batch.length < 100) {
        this.pendingBatches.push(...batch);
      }
      console.warn('Failed to flush telemetry:', error);
    }
  }

  /**
   * Send payload to OTLP endpoint
   */
  private async sendToOtlp(endpoint: string, payload: unknown): Promise<void> {
    if (!this.otlpEnabled) return;

    // Use native fetch to avoid instrumentation recursion
    const originalFetch =
      (window as unknown as { __originalFetch__?: typeof fetch }).__originalFetch__ || fetch;

    try {
      const response = await originalFetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`OTLP endpoint returned ${response.status}`);
      }
    } catch {
      // Disable OTLP on connection failure to prevent console spam
      this.otlpEnabled = false;
      // Silently fail - telemetry should not break the app
    }
  }

  /**
   * Format logs for OTLP JSON format
   */
  private formatLogsForOtlp(logs: LogEntry[]): object {
    return {
      resourceLogs: [
        {
          resource: {
            attributes: [
              { key: 'service.name', value: { stringValue: this.config.serviceName } },
              { key: 'service.version', value: { stringValue: this.config.serviceVersion } },
            ],
          },
          scopeLogs: [
            {
              scope: { name: 'angular-frontend' },
              logRecords: logs.map((log) => ({
                timeUnixNano: log.timestamp * 1_000_000,
                severityNumber: this.getSeverityNumber(log.level),
                severityText: log.level.toUpperCase(),
                body: { stringValue: log.message },
                attributes: Object.entries(log.attributes || {}).map(([key, value]) => ({
                  key,
                  value: { stringValue: String(value) },
                })),
              })),
            },
          ],
        },
      ],
    };
  }

  /**
   * Format spans for OTLP JSON format
   */
  private formatSpansForOtlp(spans: SpanData[]): object {
    return {
      resourceSpans: [
        {
          resource: {
            attributes: [
              { key: 'service.name', value: { stringValue: this.config.serviceName } },
              { key: 'service.version', value: { stringValue: this.config.serviceVersion } },
            ],
          },
          scopeSpans: [
            {
              scope: { name: 'angular-frontend' },
              spans: spans.map((span) => ({
                traceId: span.traceId,
                spanId: span.spanId,
                name: span.name,
                startTimeUnixNano: span.startTime * 1_000_000,
                endTimeUnixNano: (span.endTime || span.startTime) * 1_000_000,
                status: { code: span.status === 'error' ? 2 : 1 },
                attributes: Object.entries(span.attributes || {}).map(([key, value]) => ({
                  key,
                  value: { stringValue: String(value) },
                })),
              })),
            },
          ],
        },
      ],
    };
  }

  /**
   * Get OTLP severity number from log level
   */
  private getSeverityNumber(level: LogLevel): number {
    const levels: Record<LogLevel, number> = {
      debug: 5,
      info: 9,
      warn: 13,
      error: 17,
    };
    return levels[level];
  }

  /**
   * Generate random hex ID
   */
  private generateId(bytes: number): string {
    const array = new Uint8Array(bytes);
    crypto.getRandomValues(array);
    return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Cleanup on destroy
   */
  ngOnDestroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    // Final flush
    this.flushTelemetry();
  }
}

// Type definitions
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface TelemetryConfig {
  serviceName: string;
  serviceVersion: string;
  environment: string;
  otlpEndpoint: string;
  otlpLogsEndpoint: string;
  otlpTracesEndpoint: string;
}

interface LogEntry {
  timestamp: number;
  level: LogLevel;
  message: string;
  serviceName: string;
  attributes?: Record<string, unknown>;
}

interface SpanData {
  name: string;
  traceId: string;
  spanId: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  status?: 'ok' | 'error';
  attributes?: Record<string, unknown>;
}

interface MetricData {
  name: string;
  value: number;
  timestamp: number;
  attributes?: Record<string, unknown>;
}

interface TelemetryPayload {
  type: 'log' | 'span' | 'metric';
  data: LogEntry | SpanData | MetricData;
}
