import type { HttpInterceptorFn } from '@angular/common/http';

/**
 * Auth interceptor for adding authentication headers
 * Currently placeholder - add your auth logic here
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: Add authentication token to requests
  // Example:
  // const authToken = inject(AuthService).getToken();
  // if (authToken) {
  //   req = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${authToken}`
  //     }
  //   });
  // }

  return next(req);
};
