import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  fieldErrorPulse,
  formErrorShake,
  pulseClick,
} from '../../../../shared/animations/micro-interactions';
import {
  noWhitespaceValidator,
  strictEmailValidator,
} from '../../../../shared/validators/auth.validators';
import { AuthService } from '../../../../core/auth/auth.service';
import { BrandLogoComponent } from '../../../../shared/components/brand-logo/brand-logo.component';
import { NeonAmbientComponent } from '../../../../shared/components/neon-ambient/neon-ambient.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, BrandLogoComponent, NeonAmbientComponent],
  animations: [pulseClick, formErrorShake, fieldErrorPulse],
  template: `
    <div class="auth-page">
      <div class="auth-page-bg" aria-hidden="true"></div>
      <app-neon-ambient />

      <div class="auth-content">
        <app-brand-logo [stacked]="true" link="/" />

        <div class="auth-card">
          <h1 class="auth-title">INICIAR SESIÓN</h1>

          <form
            class="auth-form"
            [formGroup]="form"
            [@formErrorShake]="formShake()"
            (@formErrorShake.done)="formShake.set('idle')"
            (ngSubmit)="submit()"
            novalidate
          >
            <label class="auth-field">
              <span class="auth-input-wrap">
                <span class="auth-input-icon" aria-hidden="true">☺</span>
                <input
                  class="auth-input"
                  type="email"
                  formControlName="email"
                  autocomplete="email"
                  placeholder="Correo Electrónico"
                  [class.auth-input-invalid]="isInvalid('email')"
                  [@fieldErrorPulse]="fieldPulse()['email']"
                  (@fieldErrorPulse.done)="clearFieldPulse('email')"
                />
              </span>
              @if (isInvalid('email')) {
                <span class="auth-error">{{ errorMessage('email') }}</span>
              }
            </label>

            <label class="auth-field">
              <span class="auth-input-wrap">
                <span class="auth-input-icon" aria-hidden="true">🔒</span>
                <input
                  class="auth-input"
                  [type]="showPassword() ? 'text' : 'password'"
                  formControlName="password"
                  autocomplete="current-password"
                  placeholder="Contraseña"
                  [class.auth-input-invalid]="isInvalid('password')"
                  [@fieldErrorPulse]="fieldPulse()['password']"
                  (@fieldErrorPulse.done)="clearFieldPulse('password')"
                />
                <button
                  type="button"
                  class="auth-toggle-pass"
                  (click)="showPassword.set(!showPassword())"
                  [attr.aria-label]="showPassword() ? 'Ocultar contraseña' : 'Mostrar contraseña'"
                >
                  {{ showPassword() ? '🙈' : '👁' }}
                </button>
              </span>
              @if (isInvalid('password')) {
                <span class="auth-error">{{ errorMessage('password') }}</span>
              }
            </label>

            <div class="auth-row">
              <label class="auth-check">
                <input type="checkbox" formControlName="remember" />
                <span>Recordarme</span>
              </label>
              <a href="#" class="auth-forgot" (click)="$event.preventDefault()">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              class="auth-submit"
              [disabled]="loading()"
              [@pulseClick]="submitPulse()"
              (@pulseClick.done)="submitPulse.set('idle')"
            >
              {{ loading() ? 'Procesando…' : 'Iniciar Sesión' }}
            </button>

            @if (formError()) {
              <p class="auth-form-error" role="alert">{{ formError() }}</p>
            }
          </form>

          <p class="auth-switch">
            ¿No tienes cuenta?
            <a routerLink="/register">Regístrate aquí</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100svh;
    }

    .auth-page {
      position: relative;
      min-height: 100svh;
      display: grid;
      place-items: center;
      padding: 1.5rem 1rem;
      overflow: hidden;
    }

    .auth-page-bg {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(180deg, rgb(11 14 20 / 0.72), rgb(11 14 20 / 0.88)),
        url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&h=1000&fit=crop')
          center / cover no-repeat;
      filter: saturate(0.9);
    }

    .auth-content {
      position: relative;
      z-index: 1;
      width: min(100%, 26rem);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
    }

    .auth-card {
      width: 100%;
      border-radius: 1rem;
      border: 1px solid color-mix(in srgb, var(--color-primary) 40%, var(--color-border));
      background: color-mix(in srgb, var(--color-surface) 88%, transparent);
      backdrop-filter: blur(14px);
      padding: 1.75rem 1.5rem;
      box-shadow:
        0 20px 50px rgb(0 0 0 / 0.45),
        0 0 32px color-mix(in srgb, var(--color-primary) 22%, transparent);
    }

    .auth-title {
      margin: 0 0 1.25rem;
      text-align: center;
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #fff;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
    }

    .auth-field {
      display: block;
    }

    .auth-input-wrap {
      position: relative;
      display: block;
    }

    .auth-input-icon {
      position: absolute;
      left: 0.85rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.85rem;
      opacity: 0.7;
      pointer-events: none;
    }

    .auth-input {
      width: 100%;
      border-radius: 0.65rem;
      border: 1px solid var(--color-border);
      background: var(--color-surface-2);
      color: var(--color-text);
      padding: 0.8rem 2.5rem 0.8rem 2.4rem;
      font-size: 0.9375rem;
      outline: none;
    }

    .auth-input::placeholder {
      color: var(--color-text-muted);
    }

    .auth-input:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 25%, transparent);
    }

    .auth-input-invalid {
      border-color: var(--color-danger) !important;
    }

    .auth-toggle-pass {
      position: absolute;
      top: 50%;
      right: 0.55rem;
      transform: translateY(-50%);
      border: 0;
      background: transparent;
      cursor: pointer;
      font-size: 0.9rem;
      opacity: 0.75;
    }

    .auth-error {
      display: block;
      margin-top: 0.3rem;
      font-size: 0.75rem;
      color: var(--color-danger);
    }

    .auth-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      font-size: 0.8rem;
    }

    .auth-check {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--color-text-muted);
      cursor: pointer;
    }

    .auth-check input {
      accent-color: var(--color-primary);
    }

    .auth-forgot {
      color: var(--color-primary-glow);
      white-space: nowrap;
    }

    .auth-submit {
      width: 100%;
      border: 0;
      border-radius: 0.65rem;
      padding: 0.85rem 1rem;
      font-size: 0.95rem;
      font-weight: 600;
      color: #fff;
      cursor: pointer;
      background: var(--color-primary);
      box-shadow: 0 0 22px color-mix(in srgb, var(--color-primary) 40%, transparent);
      transition: filter 160ms ease, box-shadow 160ms ease, transform 160ms ease;
    }

    .auth-submit:hover:not(:disabled) {
      filter: brightness(1.08);
      transform: translateY(-1px);
      box-shadow: 0 0 32px color-mix(in srgb, var(--color-primary) 60%, transparent);
    }

    .auth-submit:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }

    .auth-form-error {
      margin: 0;
      text-align: center;
      font-size: 0.8125rem;
      color: var(--color-danger);
    }

    .auth-switch {
      margin: 1.1rem 0 0;
      text-align: center;
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }

    .auth-switch a {
      color: var(--color-accent);
      font-weight: 600;
    }
  `,
})
export class LoginPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly showPassword = signal(false);
  readonly formError = signal<string | null>(null);
  readonly submitPulse = signal<'idle' | 'active'>('idle');
  readonly formShake = signal<'idle' | 'error'>('idle');
  readonly fieldPulse = signal<Record<string, 'idle' | 'error'>>({
    email: 'idle',
    password: 'idle',
  });

  readonly form = this.fb.nonNullable.group({
    email: [
      '',
      [
        Validators.required,
        noWhitespaceValidator(),
        Validators.email,
        strictEmailValidator(),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    remember: [false],
  });

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      void this.router.navigate(['/']);
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  errorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control?.errors) {
      return '';
    }
    const errors = control.errors;
    if (errors['required']) {
      return 'Este campo es obligatorio.';
    }
    if (errors['whitespace']) {
      return 'No puede contener solo espacios.';
    }
    if (errors['email'] || errors['strictEmail']) {
      return 'Introduce un correo electrónico válido.';
    }
    if (errors['minlength']) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }
    return 'Campo inválido.';
  }

  clearFieldPulse(field: string): void {
    this.fieldPulse.update((state) => ({ ...state, [field]: 'idle' }));
  }

  submit(): void {
    this.formError.set(null);
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.formShake.set('error');
      this.submitPulse.set('active');
      this.fieldPulse.set({
        email: this.isInvalid('email') ? 'error' : 'idle',
        password: this.isInvalid('password') ? 'error' : 'idle',
      });
      return;
    }

    this.loading.set(true);
    this.submitPulse.set('active');

    const { email, password } = this.form.getRawValue();
    this.auth.login({ email, password }).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigate(['/']);
      },
      error: (err: Error) => {
        this.loading.set(false);
        this.formError.set(err.message || 'No se pudo iniciar sesión.');
        this.formShake.set('error');
      },
    });
  }
}
