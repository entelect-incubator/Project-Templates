import { Injectable, signal } from '@angular/core';

/**
 * Service for managing loading state throughout the application
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingCount = 0;
  private readonly _isLoading = signal(false);

  /**
   * Read-only signal for the loading state
   */
  readonly isLoading = this._isLoading.asReadonly();

  /**
   * Show loading indicator
   */
  show(): void {
    this.loadingCount++;
    this._isLoading.set(true);
  }

  /**
   * Hide loading indicator
   */
  hide(): void {
    this.loadingCount--;
    if (this.loadingCount <= 0) {
      this.loadingCount = 0;
      this._isLoading.set(false);
    }
  }

  /**
   * Force hide loading indicator
   */
  forceHide(): void {
    this.loadingCount = 0;
    this._isLoading.set(false);
  }
}
