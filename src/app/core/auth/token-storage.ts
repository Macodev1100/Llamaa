import { Injectable } from '@angular/core';
import { AuthSession } from './auth.models';

/**
 * Almacenamiento de sesión en memoria (principal).
 *
 * Producción recomendada: el access/refresh token viven en cookies
 * HttpOnly + Secure + SameSite=Strict/Lax emitidas por el backend.
 * Angular NO debería poder leer el token con JS.
 *
 * Este storage es un fallback para SPAs demo sin backend de cookies:
 * - Memoria: no sobrevive a F5, inmune a lectura desde otra pestaña.
 * - sessionStorage (opcional): sobrevive a F5 en la misma pestaña,
 *   pero sigue expuesto a XSS (nunca uses localStorage para tokens).
 */
@Injectable({ providedIn: 'root' })
export class TokenStorage {
  private static readonly SESSION_KEY = 'rydex.auth.session';

  private memorySession: AuthSession | null = null;

  get(): AuthSession | null {
    if (this.memorySession) {
      return this.memorySession;
    }

    try {
      const raw = sessionStorage.getItem(TokenStorage.SESSION_KEY);
      if (!raw) {
        return null;
      }
      const session = JSON.parse(raw) as AuthSession;
      if (session.expiresAt <= Date.now()) {
        this.clear();
        return null;
      }
      this.memorySession = session;
      return session;
    } catch {
      this.clear();
      return null;
    }
  }

  set(session: AuthSession): void {
    this.memorySession = session;
    try {
      sessionStorage.setItem(TokenStorage.SESSION_KEY, JSON.stringify(session));
    } catch {
      // Private mode / quota — la sesión sigue en memoria.
    }
  }

  clear(): void {
    this.memorySession = null;
    try {
      sessionStorage.removeItem(TokenStorage.SESSION_KEY);
    } catch {
      // ignore
    }
  }
}
