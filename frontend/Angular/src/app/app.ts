import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PizzaMenuComponent } from './features/pizza-menu/pizza-menu.component';
import { OpenTelemetryService } from './core/observability/opentelemetry.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PizzaMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Pizza Paradise 🍕');
  protected readonly description = signal('Delicious pizzas delivered fresh to your door!');

  private telemetryService = inject(OpenTelemetryService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    // Initialize telemetry only in browser
    if (isPlatformBrowser(this.platformId)) {
      this.telemetryService.initializeTelemetry();
    }
  }
}
