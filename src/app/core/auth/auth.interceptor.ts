import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

/**
 * Adjunta `Authorization: Bearer <token>` cuando hay sesión.
 * Con cookies HttpOnly este interceptor no haría falta para el access token
 * (el navegador envía la cookie automáticamente con `withCredentials: true`).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getAccessToken();

  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};
