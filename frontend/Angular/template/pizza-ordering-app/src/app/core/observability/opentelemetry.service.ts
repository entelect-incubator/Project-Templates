import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

/**
 * OpenTelemetry instrumentation service for client-side only observability
 * Uses SSR-safe approach with environment configuration
 */
export class OpenTelemetryService {
  private platformId = inject(PLATFORM_ID);
  private isInitialized = false;

  /**
   * Initialize OpenTelemetry instrumentation (browser only)
   * Call this from a browser-only context to avoid SSR issues
   */
  async initializeTelemetry(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || this.isInitialized) {
      return;
    }

    try {
      // Only load OpenTelemetry modules in the browser
      const { Resource } = await import('@opentelemetry/resources');
      const { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } = await import(
        '@opentelemetry/semantic-conventions'
      );
      const { WebSDK } = await import('@opentelemetry/sdk-web');
      const { getWebAutoInstrumentations } = await import(
        '@opentelemetry/auto-instrumentations-web'
      );
      const { OTLPTraceExporter } = await import('@opentelemetry/exporter-otlp-http');

      // Get configuration from environment or default values
      const config = this.getTelemetryConfig();

      // Create OTLP exporter with SSR-safe configuration
      const traceExporter = new OTLPTraceExporter({
        url: config.otelExporterOtlpEndpoint,
        headers: config.otelExporterOtlpHeaders,
      });

      // Create resource with service information
      const resource = new Resource({
        [ATTR_SERVICE_NAME]: config.serviceName,
        [ATTR_SERVICE_VERSION]: config.serviceVersion,
      });

      // Initialize the WebSDK with auto-instrumentations
      const sdk = new WebSDK({
        resource,
        traceExporter,
        instrumentations: [
          getWebAutoInstrumentations({
            '@opentelemetry/instrumentation-document-load': {},
            '@opentelemetry/instrumentation-user-interaction': {},
            '@opentelemetry/instrumentation-fetch': {
              propagateTraceHeaderCorsUrls: [config.backendUrl],
            },
            '@opentelemetry/instrumentation-xml-http-request': {
              propagateTraceHeaderCorsUrls: [config.backendUrl],
            },
          }),
        ],
      });

      // Start the SDK
      sdk.start();
      this.isInitialized = true;

      console.log('OpenTelemetry initialized successfully');
    } catch (error) {
      console.warn('Failed to initialize OpenTelemetry:', error);
    }
  }

  /**
   * Get telemetry configuration from environment variables or defaults
   * This method is SSR-safe as it doesn't access browser-specific APIs
   */
  private getTelemetryConfig() {
    // In a real application, these would come from environment configuration
    // For SSR safety, avoid accessing window or other browser-specific objects here
    return {
      serviceName: 'pizza-ordering-frontend',
      serviceVersion: '1.0.0',
      backendUrl: 'https://localhost:7160',
      // OTEL endpoint should be configured via environment variables in production
      // For development, using a local collector or direct export
      otelExporterOtlpEndpoint: 'http://localhost:4318/v1/traces',
      otelExporterOtlpHeaders: {
        // Headers should be configured securely in production
        // Avoid exposing sensitive tokens in client-side code
      },
    };
  }
}

/**
 * Factory function to provide OpenTelemetry service
 */
export function provideOpenTelemetry() {
  return {
    provide: OpenTelemetryService,
    useClass: OpenTelemetryService,
  };
}
