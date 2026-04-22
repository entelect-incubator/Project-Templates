import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WebTracerProvider, BatchSpanProcessor } from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { trace, metrics, DiagConsoleLogger, DiagLogLevel, diag } from '@opentelemetry/api';

@Injectable({
  providedIn: 'root',
})
export class TelemetryService {
  private tracerProvider: WebTracerProvider | null = null;
  private meterProvider: MeterProvider | null = null;
  private initialized = false;
  private platformId = inject(PLATFORM_ID);

  constructor() {
    // Only initialize in browser - skip during SSR
    if (isPlatformBrowser(this.platformId)) {
      this.initialize();
    }
  }

  initialize(): void {
    if (this.initialized || !isPlatformBrowser(this.platformId)) {
      return;
    }

    // Get OTLP endpoint from environment or use default Aspire endpoint
    const otlpEndpoint = this.getOtlpEndpoint();

    if (!otlpEndpoint) {
      console.warn('[Telemetry] No OTLP endpoint configured, telemetry disabled');
      return;
    }

    console.log('[Telemetry] Initializing with endpoint:', otlpEndpoint);

    // Enable debug logging in development
    if (this.isDevelopment()) {
      diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);
    }

    try {
      this.initializeTracing(otlpEndpoint);
      this.initializeMetrics(otlpEndpoint);
      this.initialized = true;
      console.log('[Telemetry] Initialized successfully');
    } catch (error) {
      console.error('[Telemetry] Failed to initialize:', error);
    }
  }

  private getOtlpEndpoint(): string | null {
    // Check for Aspire-injected environment variable (via window config)
    const windowConfig = (window as any).__OTEL_CONFIG__;
    if (windowConfig?.endpoint) {
      return windowConfig.endpoint;
    }

    // Check for services endpoint from Aspire (injected via index.html or environment)
    const servicesEndpoint = (window as any).OTEL_EXPORTER_OTLP_ENDPOINT;
    if (servicesEndpoint) {
      return servicesEndpoint;
    }

    // In development with Aspire, the OTLP HTTP endpoint is typically exposed
    // Aspire dashboard exposes OTLP on a dynamic port - check for it
    if (this.isDevelopment()) {
      // Aspire 13+ uses dynamic ports, check common patterns
      // The endpoint is injected by Aspire into environment
      // For browser, we need the HTTP endpoint (not gRPC)
      return 'http://localhost:18889'; // Default Aspire OTLP HTTP port
    }

    return null;
  }

  private isDevelopment(): boolean {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  }

  private initializeTracing(otlpEndpoint: string): void {
    const resource = resourceFromAttributes({
      [ATTR_SERVICE_NAME]: 'pizza-ordering-frontend',
      [ATTR_SERVICE_VERSION]: '1.0.0',
      'deployment.environment': this.isDevelopment() ? 'development' : 'production',
    });

    const traceExporter = new OTLPTraceExporter({
      url: `${otlpEndpoint}/v1/traces`,
      headers: {},
    });

    this.tracerProvider = new WebTracerProvider({
      resource,
      spanProcessors: [new BatchSpanProcessor(traceExporter)],
    });

    // Register without Zone context manager (Angular 21 zoneless mode)
    this.tracerProvider.register();

    // Register auto-instrumentations
    registerInstrumentations({
      tracerProvider: this.tracerProvider,
      instrumentations: [
        new FetchInstrumentation({
          propagateTraceHeaderCorsUrls: [/.*/], // Propagate to all URLs
          clearTimingResources: true,
        }),
        new XMLHttpRequestInstrumentation({
          propagateTraceHeaderCorsUrls: [/.*/],
        }),
        new DocumentLoadInstrumentation(),
        new UserInteractionInstrumentation({
          eventNames: ['click', 'submit'],
        }),
      ],
    });

    // Set global tracer provider
    trace.setGlobalTracerProvider(this.tracerProvider);
  }

  private initializeMetrics(otlpEndpoint: string): void {
    const resource = resourceFromAttributes({
      [ATTR_SERVICE_NAME]: 'pizza-ordering-frontend',
      [ATTR_SERVICE_VERSION]: '1.0.0',
    });

    const metricExporter = new OTLPMetricExporter({
      url: `${otlpEndpoint}/v1/metrics`,
      headers: {},
    });

    this.meterProvider = new MeterProvider({
      resource,
      readers: [
        new PeriodicExportingMetricReader({
          exporter: metricExporter,
          exportIntervalMillis: 10000, // Export every 10 seconds
        }),
      ],
    });

    // Set global meter provider
    metrics.setGlobalMeterProvider(this.meterProvider);
  }

  // Get a tracer for manual instrumentation
  getTracer(name: string = 'pizza-ordering-frontend') {
    return trace.getTracer(name);
  }

  // Get a meter for custom metrics
  getMeter(name: string = 'pizza-ordering-frontend') {
    return metrics.getMeter(name);
  }

  // Create a custom span
  startSpan(name: string) {
    return this.getTracer().startSpan(name);
  }

  // Record a custom metric
  recordMetric(name: string, value: number, attributes?: Record<string, string>) {
    const meter = this.getMeter();
    const counter = meter.createCounter(name);
    counter.add(value, attributes);
  }

  // Shutdown telemetry
  async shutdown(): Promise<void> {
    if (this.tracerProvider) {
      await this.tracerProvider.shutdown();
    }
    if (this.meterProvider) {
      await this.meterProvider.shutdown();
    }
  }
}
