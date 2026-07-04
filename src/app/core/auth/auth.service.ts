import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  AuthSession,
  AuthUser,
  LoginCredentials,
  RegisterPayload,
} from './auth.models';
import { TokenStorage } from './token-storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storage = inject(TokenStorage);

  private readonly sessionSignal = signal<AuthSession | null>(this.storage.get());

  readonly session = this.sessionSignal.asReadonly();
  readonly user = computed(() => this.sessionSignal()?.user ?? null);
  readonly isAuthenticated = computed(() => {
    const session = this.sessionSignal();
    return !!session && session.expiresAt > Date.now();
  });
  readonly accessToken = computed(() => {
    const session = this.sessionSignal();
    if (!session || session.expiresAt <= Date.now()) {
      return null;
    }
    return session.accessToken;
  });

  login(credentials: LoginCredentials): Observable<AuthSession> {
    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password;

    // Demo: credenciales inválidas simuladas
    if (password === 'WrongPass1!') {
      return throwError(() => new Error('Correo o contraseña incorrectos.')).pipe(
        delay(400)
      );
    }

    const session = this.buildSession({
      id: crypto.randomUUID(),
      email,
      fullName: email.split('@')[0],
    });

    return of(session).pipe(
      delay(450),
      tap((value) => this.persist(value))
    );
  }

  register(payload: RegisterPayload): Observable<AuthSession> {
    const email = payload.email.trim().toLowerCase();

    const session = this.buildSession({
      id: crypto.randomUUID(),
      email,
      fullName: payload.fullName.trim(),
    });

    return of(session).pipe(
      delay(500),
      tap((value) => this.persist(value))
    );
  }

  logout(): void {
    this.storage.clear();
    this.sessionSignal.set(null);
  }

  /** Para el interceptor HTTP. */
  getAccessToken(): string | null {
    return this.accessToken();
  }

  private persist(session: AuthSession): void {
    this.storage.set(session);
    this.sessionSignal.set(session);
  }

  private buildSession(user: AuthUser): AuthSession {
    // En producción el token lo emite el backend (JWT corto + refresh en cookie HttpOnly).
    const accessToken = btoa(
      JSON.stringify({
        sub: user.id,
        email: user.email,
        iat: Date.now(),
      })
    );

    return {
      accessToken,
      expiresAt: Date.now() + 60 * 60 * 1000, // 1h demo
      user,
    };
  }
}
