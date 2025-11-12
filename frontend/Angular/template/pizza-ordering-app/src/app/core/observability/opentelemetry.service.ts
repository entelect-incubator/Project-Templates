import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject, Injectable } from '@angular/core';

/**
 * Simplified telemetry service for client-side observability
 * Uses SSR-safe approach with basic performance monitoring
 * Can be extended with full OpenTelemetry packages when available
 */
@Injectable({
  providedIn: 'root',
})
export class OpenTelemetryService {
  private platformId = inject(PLATFORM_ID);
  private isInitialized = false;

  /**
   * Initialize basic telemetry instrumentation (browser only)
   * Call this from a browser-only context to avoid SSR issues
   */
  async initializeTelemetry(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || this.isInitialized) {
      return;
    }

    try {
      // Basic telemetry setup - can be expanded with full OpenTelemetry packages
      const config = this.getTelemetryConfig();

      console.log('Telemetry configuration:', config);

      // Set up basic performance monitoring using browser APIs
      this.setupBasicPerformanceMonitoring();

      this.isInitialized = true;
      console.log('Basic telemetry initialized successfully');
    } catch (error) {
      console.warn('Failed to initialize telemetry:', error);
    }
  }

  /**
   * Set up basic performance monitoring using browser APIs
   */
  private setupBasicPerformanceMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Monitor page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;
        if (perfData) {
          console.log('Page load metrics:', {
            domContentLoaded:
              perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
            totalPageLoad: perfData.loadEventEnd - perfData.fetchStart,
          });
        }
      }, 100);
    });

    // Monitor fetch requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      const url = args[0].toString();

      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();

        console.log('HTTP Request:', {
          url,
          method: args[1]?.method || 'GET',
          status: response.status,
          duration: endTime - startTime,
        });

        return response;
      } catch (error) {
        const endTime = performance.now();

        console.error('HTTP Request failed:', {
          url,
          method: args[1]?.method || 'GET',
          duration: endTime - startTime,
          error: error instanceof Error ? error.message : String(error),
        });

        throw error;
      }
    };
  }

  /**
   * Get telemetry configuration from environment variables or defaults
   * This method is SSR-safe as it doesn't access browser-specific APIs
   */
  private getTelemetryConfig() {
    return {
      serviceName: 'pizza-ordering-frontend',
      serviceVersion: '1.0.0',
      backendUrl: 'https://localhost:7160',
      // In production, these should come from environment configuration
      otelExporterOtlpEndpoint: 'http://localhost:4318/v1/traces',
      otelExporterOtlpHeaders: {},
    };
  }

  /**
   * Create a custom span for tracking operations
   */
  createSpan<T>(name: string, operation: () => Promise<T> | T): Promise<T> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve(operation() as T);
    }

    const startTime = performance.now();

    console.log(`Starting operation: ${name}`);

    try {
      const result = operation();

      if (result instanceof Promise) {
        return result
          .then((value) => {
            const endTime = performance.now();
            console.log(`Operation completed: ${name} (${endTime - startTime}ms)`);
            return value;
          })
          .catch((error) => {
            const endTime = performance.now();
            console.error(`Operation failed: ${name} (${endTime - startTime}ms)`, error);
            throw error;
          });
      } else {
        const endTime = performance.now();
        console.log(`Operation completed: ${name} (${endTime - startTime}ms)`);
        return Promise.resolve(result);
      }
    } catch (error) {
      const endTime = performance.now();
      console.error(`Operation failed: ${name} (${endTime - startTime}ms)`, error);
      throw error;
    }
  }
}
