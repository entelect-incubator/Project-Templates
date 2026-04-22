/**
 * Toast Banner Service
 *
 * Single Responsibility: Manage toast notifications state and lifecycle
 * Replaces MatSnackBar with custom banner-style toasts
 *
 * @see https://angular.dev/style-guide
 */
import { Injectable, signal, computed } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  action?: string;
  onAction?: () => void;
  dismissing?: boolean;
}

export interface ToastOptions {
  duration?: number;
  action?: string;
  onAction?: () => void;
}

const DEFAULT_DURATION = 5000;
const ERROR_DURATION = 8000;
const WARNING_DURATION = 6000;

@Injectable({
  providedIn: 'root',
})
export class ToastBannerService {
  private readonly _toasts = signal<Toast[]>([]);
  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();

  /** Read-only signal of active toasts */
  readonly toasts = computed(() => this._toasts());

  /**
   * Show a success toast
   */
  success(message: string, options?: ToastOptions): string {
    return this.show(message, 'success', {
      duration: DEFAULT_DURATION,
      ...options,
    });
  }

  /**
   * Show an error toast
   */
  error(message: string, options?: ToastOptions): string {
    return this.show(message, 'error', {
      duration: ERROR_DURATION,
      ...options,
    });
  }

  /**
   * Show a warning toast
   */
  warning(message: string, options?: ToastOptions): string {
    return this.show(message, 'warning', {
      duration: WARNING_DURATION,
      ...options,
    });
  }

  /**
   * Show an info toast
   */
  info(message: string, options?: ToastOptions): string {
    return this.show(message, 'info', {
      duration: DEFAULT_DURATION,
      ...options,
    });
  }

  /**
   * Show a toast with custom options
   */
  show(message: string, type: ToastType, options?: ToastOptions): string {
    const id = this.generateId();
    const toast: Toast = {
      id,
      message,
      type,
      duration: options?.duration,
      action: options?.action,
      onAction: options?.onAction,
    };

    this._toasts.update((toasts) => [...toasts, toast]);

    // Set up auto-dismiss if duration is specified
    if (options?.duration && options.duration > 0) {
      const timer = setTimeout(() => {
        this.dismiss(id);
      }, options.duration);
      this.timers.set(id, timer);
    }

    return id;
  }

  /**
   * Dismiss a toast by ID
   */
  dismiss(id: string): void {
    // Clear any pending timer
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }

    // Start dismissing animation
    this._toasts.update((toasts) =>
      toasts.map((t) => (t.id === id ? { ...t, dismissing: true } : t))
    );

    // Remove after animation completes
    setTimeout(() => {
      this._toasts.update((toasts) => toasts.filter((t) => t.id !== id));
    }, 300);
  }

  /**
   * Dismiss all toasts
   */
  dismissAll(): void {
    // Clear all timers
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();

    // Start dismissing animation for all
    this._toasts.update((toasts) => toasts.map((t) => ({ ...t, dismissing: true })));

    // Remove after animation
    setTimeout(() => {
      this._toasts.set([]);
    }, 300);
  }

  /**
   * Handle HTTP error responses
   */
  handleHttpError(error: unknown, customMessage?: string): string {
    let message = customMessage || 'An unexpected error occurred';

    if (this.isErrorWithMessage(error)) {
      if (error.error?.message) {
        message = error.error.message;
      } else if (error.message) {
        message = error.message;
      }
    } else if (typeof error === 'string') {
      message = error;
    }

    return this.error(message, {
      action: 'Dismiss',
      duration: 0, // Don't auto-dismiss error toasts with action
    });
  }

  /**
   * Handle network errors
   */
  handleNetworkError(): string {
    return this.error('Network error. Please check your connection.', {
      action: 'Dismiss',
      duration: 0,
    });
  }

  /**
   * Handle validation errors
   */
  handleValidationError(errors: string[] | string): string {
    const message = Array.isArray(errors) ? errors.join(', ') : errors;
    return this.warning(message);
  }

  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  private isErrorWithMessage(
    error: unknown
  ): error is { message?: string; error?: { message?: string } } {
    return typeof error === 'object' && error !== null;
  }
}
