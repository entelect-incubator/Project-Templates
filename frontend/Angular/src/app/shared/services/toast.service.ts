/**
 * Toast Service
 * Global toast notifications for success, error, warning, and info messages
 */

import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions extends Partial<MatSnackBarConfig> {
  type?: ToastType;
  action?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly snackBar = inject(MatSnackBar);

  private readonly defaultConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
  };

  /**
   * Show a success toast
   */
  success(message: string, options?: ToastOptions): MatSnackBarRef<any> {
    return this.show(message, { ...options, type: 'success' });
  }

  /**
   * Show an error toast
   */
  error(message: string, options?: ToastOptions): MatSnackBarRef<any> {
    return this.show(message, {
      ...options,
      type: 'error',
      duration: options?.duration ?? 8000, // Longer duration for errors
    });
  }

  /**
   * Show a warning toast
   */
  warning(message: string, options?: ToastOptions): MatSnackBarRef<any> {
    return this.show(message, {
      ...options,
      type: 'warning',
      duration: options?.duration ?? 6000,
    });
  }

  /**
   * Show an info toast
   */
  info(message: string, options?: ToastOptions): MatSnackBarRef<any> {
    return this.show(message, { ...options, type: 'info' });
  }

  /**
   * Show a custom toast with full control
   */
  show(message: string, options?: ToastOptions): MatSnackBarRef<any> {
    const config: MatSnackBarConfig = {
      ...this.defaultConfig,
      ...options,
      panelClass: [`toast-${options?.type || 'info'}`],
    };

    return this.snackBar.open(message, options?.action, config);
  }

  /**
   * Dismiss all active toasts
   */
  dismiss(): void {
    this.snackBar.dismiss();
  }

  /**
   * Handle HTTP error responses
   */
  handleHttpError(error: any, customMessage?: string): void {
    let message = customMessage || 'An unexpected error occurred';

    if (error?.error?.message) {
      message = error.error.message;
    } else if (error?.message) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }

    this.error(message, {
      action: 'Retry',
      duration: 0, // Don't auto-dismiss error toasts
    });
  }

  /**
   * Handle network errors
   */
  handleNetworkError(): void {
    this.error('Network error. Please check your connection.', {
      action: 'Retry',
      duration: 0,
    });
  }

  /**
   * Handle validation errors
   */
  handleValidationError(errors: string[] | string): void {
    const message = Array.isArray(errors) ? errors.join(', ') : errors;

    this.warning(message, {
      duration: 8000,
    });
  }
}
