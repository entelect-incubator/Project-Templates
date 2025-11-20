import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * Service for showing notifications throughout the application
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private toastr = inject(ToastrService);

  /**
   * Show success notification
   */
  showSuccess(message: string, title?: string): void {
    this.toastr.success(message, title);
  }

  /**
   * Show error notification
   */
  showError(message: string, title?: string): void {
    this.toastr.error(message, title);
  }

  /**
   * Show warning notification
   */
  showWarning(message: string, title?: string): void {
    this.toastr.warning(message, title);
  }

  /**
   * Show info notification
   */
  showInfo(message: string, title?: string): void {
    this.toastr.info(message, title);
  }
}
