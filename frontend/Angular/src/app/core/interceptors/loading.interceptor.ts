import { inject } from '@angular/core';
import type { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

/**
 * Loading interceptor for showing loading states during HTTP requests
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Show loading indicator
  loadingService.show();

  return next(req).pipe(
    finalize(() => {
      // Hide loading indicator when request completes (success or error)
      loadingService.hide();
    })
  );
};
