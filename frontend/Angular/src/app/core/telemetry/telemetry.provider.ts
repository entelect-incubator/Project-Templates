import { APP_INITIALIZER, Provider } from '@angular/core';
import { TelemetryService } from './telemetry.service';

export function initializeTelemetry(telemetryService: TelemetryService): () => void {
  return () => {
    // Telemetry is initialized in constructor, but we ensure it's ready
    console.log('[Telemetry] Provider initialized');
  };
}

export function provideTelemetry(): Provider[] {
  return [
    TelemetryService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTelemetry,
      deps: [TelemetryService],
      multi: true,
    },
  ];
}
