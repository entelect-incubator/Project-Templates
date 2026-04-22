/**
 * Toast Banner Component
 *
 * Single Responsibility: Display banner-style toast notifications
 * Accessible, responsive, centered notifications with progress indicator
 *
 * @see https://angular.dev/style-guide
 */
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ToastBannerService } from './toast-banner.service';

@Component({
  selector: 'app-toast-banner',
  standalone: true,
  templateUrl: './toast-banner.component.html',
  styleUrl: './toast-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastBannerComponent {
  private readonly toastService = inject(ToastBannerService);

  /** Get all active toasts */
  readonly toasts = this.toastService.toasts;

  /**
   * Dismiss a toast by ID
   */
  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  /**
   * Handle action button click
   */
  onAction(toast: { id: string; onAction?: () => void }): void {
    toast.onAction?.();
    this.dismiss(toast.id);
  }
}
