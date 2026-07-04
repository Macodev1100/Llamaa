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
  fullNameValidator,
  noWhitespaceValidator,
  passwordStrengthValidator,
  strictEmailValidator,
} from '../../../../shared/validators/auth.validators';
import { AuthService } from '../../../../core/auth/auth.service';
import { BrandLogoComponent } from '../../../../shared/components/brand-logo/brand-logo.component';
import { NeonAmbientComponent } from '../../../../shared/components/neon-ambient/neon-ambient.component';

@Component({
  selector: 'app-register-page',
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
          <h1 class="auth-title">REGÍSTRATE</h1>

          <form
            class="auth-form"
            [formGroup]="form"
            [@formErrorShake]="formShake()"
            (@formErrorShake.done)="formShake.set('idle')"
            (ngSubmit)="submit()"
            novalidate
          >
            <div class="auth-grid">
              <label class="auth-field">
                <input
                  class="auth-input"
                  type="text"
                  formControlName="fullName"
                  autocomplete="name"
                  placeholder="Nombre completo"
                  [class.auth-input-invalid]="isInvalid('fullName')"
                  [@fieldErrorPulse]="fieldPulse()['fullName']"
                  (@fieldErrorPulse.done)="clearFieldPulse('fullName')"
                />
                @if (isInvalid('fullName')) {
                  <span class="auth-error">{{ errorMessage('fullName') }}</span>
                }
              </label>

              <label class="auth-field">
                <input
                  class="auth-input"
                  type="email"
                  formControlName="email"
                  autocomplete="email"
                  placeholder="Correo electrónico"
                  [class.auth-input-invalid]="isInvalid('email')"
                  [@fieldErrorPulse]="fieldPulse()['email']"
                  (@fieldErrorPulse.done)="clearFieldPulse('email')"
                />
                @if (isInvalid('email')) {
                  <span class="auth-error">{{ errorMessage('email') }}</span>
                }
              </label>

              <label class="auth-field">
                <input
                  class="auth-input"
                  type="text"
                  formControlName="username"
                  autocomplete="username"
                  placeholder="Nombre de usuario"
                  [class.auth-input-invalid]="isInvalid('username')"
                  [@fieldErrorPulse]="fieldPulse()['username']"
                  (@fieldErrorPulse.done)="clearFieldPulse('username')"
                />
                @if (isInvalid('username')) {
                  <span class="auth-error">{{ errorMessage('username') }}</span>
                }
              </label>

              <label class="auth-field">
                <span class="auth-input-wrap">
                  <input
                    class="auth-input auth-input-iconed"
                    [type]="showPassword() ? 'text' : 'password'"
                    formControlName="password"
                    autocomplete="new-password"
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

              <label class="auth-field">
                <input
                  class="auth-input"
                  type="tel"
                  formControlName="phone"
                  autocomplete="tel"
                  placeholder="Teléfono"
                  [class.auth-input-invalid]="isInvalid('phone')"
                  [@fieldErrorPulse]="fieldPulse()['phone']"
                  (@fieldErrorPulse.done)="clearFieldPulse('phone')"
                />
                @if (isInvalid('phone')) {
                  <span class="auth-error">{{ errorMessage('phone') }}</span>
                }
              </label>

              <label class="auth-field">
                <span class="auth-input-wrap">
                  <input
                    class="auth-input auth-input-iconed"
                    type="date"
                    formControlName="birthDate"
                    [class.auth-input-invalid]="isInvalid('birthDate')"
                    [@fieldErrorPulse]="fieldPulse()['birthDate']"
                    (@fieldErrorPulse.done)="clearFieldPulse('birthDate')"
                  />
                </span>
                @if (isInvalid('birthDate')) {
                  <span class="auth-error">{{ errorMessage('birthDate') }}</span>
                }
              </label>

              <label class="auth-field">
                <span class="auth-input-wrap">
                  <input
                    class="auth-input auth-input-iconed"
                    type="text"
                    formControlName="address"
                    autocomplete="street-address"
                    placeholder="Dirección"
                    [class.auth-input-invalid]="isInvalid('address')"
                    [@fieldErrorPulse]="fieldPulse()['address']"
                    (@fieldErrorPulse.done)="clearFieldPulse('address')"
                  />
                  <span class="auth-trailing-icon" aria-hidden="true">📍</span>
                </span>
                @if (isInvalid('address')) {
                  <span class="auth-error">{{ errorMessage('address') }}</span>
                }
              </label>

              <label class="auth-field">
                <span class="auth-input-wrap">
                  <select
                    class="auth-input auth-input-iconed"
                    formControlName="city"
                    [class.auth-input-invalid]="isInvalid('city')"
                    [@fieldErrorPulse]="fieldPulse()['city']"
                    (@fieldErrorPulse.done)="clearFieldPulse('city')"
                  >
                    <option value="" disabled>Ciudad</option>
                    @for (city of cities; track city) {
                      <option [value]="city">{{ city }}</option>
                    }
                  </select>
                </span>
                @if (isInvalid('city')) {
                  <span class="auth-error">{{ errorMessage('city') }}</span>
                }
              </label>
            </div>

            <label class="auth-check">
              <input type="checkbox" formControlName="acceptTerms" />
              <span>
                Acepto los
                <a href="#" class="auth-terms" (click)="$event.preventDefault()">
                  Términos y Condiciones
                </a>
              </span>
            </label>
            @if (isInvalid('acceptTerms')) {
              <span class="auth-error">{{ errorMessage('acceptTerms') }}</span>
            }

            <button
              type="submit"
              class="auth-submit"
              [disabled]="loading()"
              [@pulseClick]="submitPulse()"
              (@pulseClick.done)="submitPulse.set('idle')"
            >
              {{ loading() ? 'Procesando…' : 'Crear cuenta' }}
            </button>

            @if (formError()) {
              <p class="auth-form-error" role="alert">{{ formError() }}</p>
            }
          </form>

          <p class="auth-switch">
            ¿Ya tienes cuenta?
            <a routerLink="/login">Inicia sesión aquí</a>
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
        radial-gradient(ellipse at 20% 20%, rgb(123 66 246 / 0.22), transparent 45%),
        radial-gradient(ellipse at 80% 80%, rgb(46 204 113 / 0.12), transparent 40%),
        var(--color-bg);
    }

    .auth-content {
      position: relative;
      z-index: 1;
      width: min(100%, 42rem);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .auth-card {
      width: 100%;
      border-radius: 1rem;
      border: 1px solid color-mix(in srgb, var(--color-primary) 40%, var(--color-border));
      background: color-mix(in srgb, var(--color-surface) 90%, transparent);
      backdrop-filter: blur(14px);
      padding: 1.5rem;
      box-shadow:
        0 20px 50px rgb(0 0 0 / 0.45),
        0 0 32px color-mix(in srgb, var(--color-primary) 22%, transparent);
    }

    @media (min-width: 640px) {
      .auth-card {
        padding: 1.75rem 1.75rem 1.5rem;
      }
    }

    .auth-title {
      margin: 0 0 1.15rem;
      text-align: center;
      font-size: 1.2rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #fff;
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .auth-grid {
      display: grid;
      gap: 0.85rem;
    }

    @media (min-width: 640px) {
      .auth-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    .auth-field {
      display: block;
    }

    .auth-input-wrap {
      position: relative;
      display: block;
    }

    .auth-input {
      width: 100%;
      border-radius: 0.65rem;
      border: 1px solid var(--color-border);
      background: var(--color-surface-2);
      color: var(--color-text);
      padding: 0.75rem 0.9rem;
      font-size: 0.9rem;
      outline: none;
    }

    .auth-input-iconed {
      padding-right: 2.4rem;
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

    select.auth-input {
      appearance: none;
      cursor: pointer;
    }

    .auth-toggle-pass,
    .auth-trailing-icon {
      position: absolute;
      top: 50%;
      right: 0.65rem;
      transform: translateY(-50%);
      border: 0;
      background: transparent;
      cursor: pointer;
      font-size: 0.9rem;
      opacity: 0.75;
    }

    .auth-trailing-icon {
      pointer-events: none;
      cursor: default;
    }

    .auth-error {
      display: block;
      margin-top: 0.3rem;
      font-size: 0.75rem;
      color: var(--color-danger);
    }

    .auth-check {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: var(--color-text-muted);
      cursor: pointer;
    }

    .auth-check input {
      margin-top: 0.15rem;
      accent-color: var(--color-primary);
    }

    .auth-terms {
      color: var(--color-accent);
      font-weight: 600;
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
      margin: 1rem 0 0;
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
export class RegisterPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly cities = [
    'Cajamarca',
    'Lima',
    'Arequipa',
    'Trujillo',
    'Chiclayo',
    'Cusco',
  ];

  readonly loading = signal(false);
  readonly showPassword = signal(false);
  readonly formError = signal<string | null>(null);
  readonly submitPulse = signal<'idle' | 'active'>('idle');
  readonly formShake = signal<'idle' | 'error'>('idle');
  readonly fieldPulse = signal<Record<string, 'idle' | 'error'>>({
    fullName: 'idle',
    email: 'idle',
    username: 'idle',
    password: 'idle',
    phone: 'idle',
    birthDate: 'idle',
    address: 'idle',
    city: 'idle',
    acceptTerms: 'idle',
  });

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, noWhitespaceValidator(), fullNameValidator()]],
    email: [
      '',
      [
        Validators.required,
        noWhitespaceValidator(),
        Validators.email,
        strictEmailValidator(),
      ],
    ],
    username: ['', [Validators.required, noWhitespaceValidator(), Validators.minLength(3)]],
    password: ['', [Validators.required, passwordStrengthValidator()]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s-]{7,15}$/)]],
    birthDate: ['', [Validators.required]],
    address: ['', [Validators.required, noWhitespaceValidator()]],
    city: ['', [Validators.required]],
    acceptTerms: [false, [Validators.requiredTrue]],
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
    if (errors['required'] || errors['requiredTrue']) {
      return controlName === 'acceptTerms'
        ? 'Debes aceptar los términos para continuar.'
        : 'Este campo es obligatorio.';
    }
    if (errors['whitespace']) {
      return 'No puede contener solo espacios.';
    }
    if (errors['email'] || errors['strictEmail']) {
      return 'Introduce un correo electrónico válido.';
    }
    if (errors['fullName'] || errors['fullNameChars']) {
      return 'Escribe nombre y apellido válidos.';
    }
    if (errors['minlength']) {
      return 'Mínimo 3 caracteres.';
    }
    if (errors['pattern']) {
      return 'Teléfono inválido.';
    }
    if (errors['minLengthPassword']) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (errors['missingUppercase']) {
      return 'Incluye al menos una mayúscula.';
    }
    if (errors['missingLowercase']) {
      return 'Incluye al menos una minúscula.';
    }
    if (errors['missingNumber']) {
      return 'Incluye al menos un número.';
    }
    if (errors['missingSpecial']) {
      return 'Incluye al menos un símbolo (!@#$…).';
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
      const pulses = { ...this.fieldPulse() };
      for (const key of Object.keys(pulses)) {
        pulses[key] = this.isInvalid(key) ? 'error' : 'idle';
      }
      this.fieldPulse.set(pulses);
      return;
    }

    this.loading.set(true);
    this.submitPulse.set('active');

    const { email, password, fullName } = this.form.getRawValue();
    this.auth.register({ email, password, fullName }).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigate(['/']);
      },
      error: (err: Error) => {
        this.loading.set(false);
        this.formError.set(err.message || 'No se pudo crear la cuenta.');
        this.formShake.set('error');
      },
    });
  }
}
