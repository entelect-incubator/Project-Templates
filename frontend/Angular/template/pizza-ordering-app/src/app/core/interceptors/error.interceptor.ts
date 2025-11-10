import { inject } from '@angular/core';
import type { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

/**
 * Error interceptor for handling global HTTP errors
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'An unexpected error occurred';

      if (error.status === 0) {
        errorMessage = 'Unable to connect to server. Please check your connection.';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || 'Bad request';
      } else if (error.status === 401) {
        errorMessage = 'Authentication required';
        // TODO: Redirect to login page
      } else if (error.status === 403) {
        errorMessage = 'Access denied';
      } else if (error.status === 404) {
        errorMessage = 'Resource not found';
      } else if (error.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      }

      // Show error notification
      notificationService.showError(errorMessage);

      // Re-throw the error for component-specific handling
      return throwError(() => error);
    })
  );
};
