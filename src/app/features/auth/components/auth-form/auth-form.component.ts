import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  fieldErrorPulse,
  formErrorShake,
  pulseClick,
} from '../../../../shared/animations/micro-interactions';
import {
  fullNameValidator,
  noWhitespaceValidator,
  passwordMatchValidator,
  passwordStrengthValidator,
  strictEmailValidator,
} from '../../../../shared/validators/auth.validators';
import { AuthService } from '../../../../core/auth/auth.service';

type AuthMode = 'login' | 'register';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  animations: [pulseClick, formErrorShake, fieldErrorPulse],
  template: `
    <div class="auth-shell">
      <div class="auth-brand">
        <div class="auth-logo" aria-hidden="true">R</div>
        <div>
          <p class="auth-brand-name">Rydex Store Industries</p>
          <p class="auth-brand-tag">Premium gaming gear</p>
        </div>
      </div>

      <div class="auth-tabs" role="tablist" aria-label="Modo de autenticación">
        <button
          type="button"
          role="tab"
          class="auth-tab"
          [class.auth-tab-active]="mode() === 'login'"
          [attr.aria-selected]="mode() === 'login'"
          (click)="switchMode('login')"
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          role="tab"
          class="auth-tab"
          [class.auth-tab-active]="mode() === 'register'"
          [attr.aria-selected]="mode() === 'register'"
          (click)="switchMode('register')"
        >
          Crear cuenta
        </button>
      </div>

      <form
        class="auth-form"
        [formGroup]="form"
        [@formErrorShake]="formShake()"
        (@formErrorShake.done)="formShake.set('idle')"
        (ngSubmit)="submit()"
        novalidate
      >
        @if (mode() === 'register') {
          <label class="auth-field">
            <span class="auth-label">Nombre completo</span>
            <input
              class="auth-input"
              type="text"
              formControlName="fullName"
              autocomplete="name"
              placeholder="Alex Rivera"
              [class.auth-input-invalid]="isInvalid('fullName')"
              [@fieldErrorPulse]="fieldPulse()['fullName']"
              (@fieldErrorPulse.done)="clearFieldPulse('fullName')"
            />
            @if (isInvalid('fullName')) {
              <span class="auth-error">{{ errorMessage('fullName') }}</span>
            }
          </label>
        }

        <label class="auth-field">
          <span class="auth-label">Correo electrónico</span>
          <input
            class="auth-input"
            type="email"
            formControlName="email"
            autocomplete="email"
            placeholder="tu@correo.com"
            [class.auth-input-invalid]="isInvalid('email')"
            [@fieldErrorPulse]="fieldPulse()['email']"
            (@fieldErrorPulse.done)="clearFieldPulse('email')"
          />
          @if (isInvalid('email')) {
            <span class="auth-error">{{ errorMessage('email') }}</span>
          }
        </label>

        <label class="auth-field">
          <span class="auth-label">Contraseña</span>
          <div class="auth-password-wrap">
            <input
              class="auth-input"
              [type]="showPassword() ? 'text' : 'password'"
              formControlName="password"
              [attr.autocomplete]="mode() === 'login' ? 'current-password' : 'new-password'"
              placeholder="••••••••"
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
              {{ showPassword() ? 'Ocultar' : 'Ver' }}
            </button>
          </div>
          @if (isInvalid('password')) {
            <span class="auth-error">{{ errorMessage('password') }}</span>
          }
          @if (mode() === 'register' && form.controls.password.value) {
            <ul class="auth-strength" aria-label="Requisitos de contraseña">
              <li [class.ok]="hasLength()">8+ caracteres</li>
              <li [class.ok]="hasUpper()">Mayúscula</li>
              <li [class.ok]="hasLower()">Minúscula</li>
              <li [class.ok]="hasNumber()">Número</li>
              <li [class.ok]="hasSpecial()">Símbolo</li>
            </ul>
          }
        </label>

        @if (mode() === 'register') {
          <label class="auth-field">
            <span class="auth-label">Confirmar contraseña</span>
            <input
              class="auth-input"
              [type]="showPassword() ? 'text' : 'password'"
              formControlName="confirmPassword"
              autocomplete="new-password"
              placeholder="Repite tu contraseña"
              [class.auth-input-invalid]="isInvalid('confirmPassword')"
              [@fieldErrorPulse]="fieldPulse()['confirmPassword']"
              (@fieldErrorPulse.done)="clearFieldPulse('confirmPassword')"
            />
            @if (isInvalid('confirmPassword')) {
              <span class="auth-error">{{ errorMessage('confirmPassword') }}</span>
            }
          </label>

          <label class="auth-check">
            <input type="checkbox" formControlName="acceptTerms" />
            <span>Acepto los términos y la política de privacidad de Rydex.</span>
          </label>
          @if (isInvalid('acceptTerms')) {
            <span class="auth-error auth-error-block">{{ errorMessage('acceptTerms') }}</span>
          }
        }

        <button
          type="submit"
          class="auth-submit"
          [disabled]="loading()"
          [@pulseClick]="submitPulse()"
          (@pulseClick.done)="submitPulse.set('idle')"
        >
          @if (loading()) {
            Procesando…
          } @else if (mode() === 'login') {
            Entrar a Rydex
          } @else {
            Crear cuenta
          }
        </button>

        @if (formError()) {
          <p class="auth-form-error" role="alert">{{ formError() }}</p>
        }
      </form>
    </div>
  `,
  styles: `
    .auth-shell {
      width: 100%;
      border-radius: 1rem;
      border: 1px solid var(--color-border);
      background: linear-gradient(
        165deg,
        color-mix(in srgb, var(--color-surface) 92%, var(--color-primary)),
        var(--color-surface)
      );
      box-shadow: 0 0 40px color-mix(in srgb, var(--color-primary) 18%, transparent);
      padding: 1.5rem;
    }

    @media (min-width: 640px) {
      .auth-shell {
        padding: 2rem;
      }
    }

    .auth-brand {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      margin-bottom: 1.5rem;
    }

    .auth-logo {
      display: grid;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 0.75rem;
      font-family: Orbitron, sans-serif;
      font-weight: 700;
      color: #fff;
      background: linear-gradient(135deg, #7c3aed 0%, #a855f7 45%, #22d3ee 100%);
      box-shadow: 0 0 20px color-mix(in srgb, var(--color-primary) 45%, transparent);
    }

    .auth-brand-name {
      margin: 0;
      font-family: Orbitron, sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .auth-brand-tag {
      margin: 0.15rem 0 0;
      font-size: 0.75rem;
      color: var(--color-text-muted);
    }

    .auth-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.35rem;
      margin-bottom: 1.25rem;
      padding: 0.3rem;
      border-radius: 0.75rem;
      background: var(--color-surface-2);
      border: 1px solid var(--color-border);
    }

    .auth-tab {
      border: 0;
      border-radius: 0.55rem;
      background: transparent;
      color: var(--color-text-muted);
      font-size: 0.875rem;
      font-weight: 500;
      padding: 0.55rem 0.75rem;
      cursor: pointer;
      transition:
        background 180ms ease,
        color 180ms ease,
        box-shadow 180ms ease;
    }

    .auth-tab-active {
      color: var(--color-text);
      background: color-mix(in srgb, var(--color-primary) 22%, var(--color-surface));
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-primary) 45%, transparent);
    }

    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .auth-field {
      display: block;
    }

    .auth-label {
      display: block;
      margin-bottom: 0.4rem;
      font-size: 0.8125rem;
      color: var(--color-text-muted);
    }

    .auth-input {
      width: 100%;
      border-radius: 0.65rem;
      border: 1px solid var(--color-border);
      background: var(--color-bg);
      color: var(--color-text);
      padding: 0.7rem 0.9rem;
      font-size: 0.9375rem;
      outline: none;
      transition:
        border-color 160ms ease,
        box-shadow 160ms ease;
    }

    .auth-input::placeholder {
      color: color-mix(in srgb, var(--color-text-muted) 70%, transparent);
    }

    .auth-input:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 28%, transparent);
    }

    .auth-input-invalid {
      border-color: var(--color-danger) !important;
    }

    .auth-password-wrap {
      position: relative;
    }

    .auth-password-wrap .auth-input {
      padding-right: 4.25rem;
    }

    .auth-toggle-pass {
      position: absolute;
      top: 50%;
      right: 0.55rem;
      transform: translateY(-50%);
      border: 0;
      background: transparent;
      color: var(--color-primary-glow);
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
    }

    .auth-error {
      display: block;
      margin-top: 0.35rem;
      font-size: 0.75rem;
      color: var(--color-danger);
    }

    .auth-error-block {
      margin-top: -0.35rem;
    }

    .auth-strength {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin: 0.5rem 0 0;
      padding: 0;
      list-style: none;
    }

    .auth-strength li {
      border-radius: 999px;
      border: 1px solid var(--color-border);
      padding: 0.15rem 0.5rem;
      font-size: 0.68rem;
      color: var(--color-text-muted);
    }

    .auth-strength li.ok {
      border-color: color-mix(in srgb, var(--color-accent) 50%, transparent);
      color: var(--color-accent);
    }

    .auth-check {
      display: flex;
      align-items: flex-start;
      gap: 0.55rem;
      font-size: 0.8125rem;
      color: var(--color-text-muted);
      cursor: pointer;
    }

    .auth-check input {
      margin-top: 0.15rem;
      accent-color: var(--color-primary);
    }

    .auth-submit {
      margin-top: 0.35rem;
      width: 100%;
      border: 0;
      border-radius: 0.75rem;
      padding: 0.8rem 1rem;
      font-size: 0.9375rem;
      font-weight: 600;
      color: #fff;
      cursor: pointer;
      background: linear-gradient(135deg, #6d28d9 0%, #a855f7 42%, #22d3ee 100%);
      box-shadow: 0 0 24px color-mix(in srgb, var(--color-primary) 40%, transparent);
      transition:
        filter 180ms ease,
        transform 180ms ease,
        box-shadow 180ms ease;
    }

    .auth-submit:hover:not(:disabled) {
      filter: brightness(1.08);
      box-shadow: 0 0 32px color-mix(in srgb, var(--color-primary) 55%, transparent);
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
  `,
})
export class AuthFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly mode = signal<AuthMode>('login');
  readonly loading = signal(false);
  readonly showPassword = signal(false);
  readonly formError = signal<string | null>(null);
  readonly submitPulse = signal<'idle' | 'active'>('idle');
  readonly formShake = signal<'idle' | 'error'>('idle');
  readonly fieldPulse = signal<Record<string, 'idle' | 'error'>>({
    fullName: 'idle',
    email: 'idle',
    password: 'idle',
    confirmPassword: 'idle',
    acceptTerms: 'idle',
  });

  readonly form = this.fb.nonNullable.group({
    fullName: [''],
    email: [
      '',
      [
        Validators.required,
        noWhitespaceValidator(),
        Validators.email,
        strictEmailValidator(),
      ],
    ],
    password: ['', [Validators.required]],
    confirmPassword: [''],
    acceptTerms: [false],
  });

  ngOnInit(): void {
    this.applyModeValidators('login');
  }

  switchMode(mode: AuthMode): void {
    this.mode.set(mode);
    this.formError.set(null);
    this.form.reset({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    });
    this.applyModeValidators(mode);
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
    if (errors['fullName']) {
      return 'Escribe nombre y apellido.';
    }
    if (errors['fullNameChars']) {
      return 'Solo letras, espacios, apóstrofes o guiones.';
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
    if (errors['passwordMismatch']) {
      return 'Las contraseñas no coinciden.';
    }
    if (errors['requiredTrue']) {
      return 'Debes aceptar los términos para continuar.';
    }

    return 'Campo inválido.';
  }

  hasLength(): boolean {
    return (this.form.controls.password.value?.length ?? 0) >= 8;
  }

  hasUpper(): boolean {
    return /[A-Z]/.test(this.form.controls.password.value ?? '');
  }

  hasLower(): boolean {
    return /[a-z]/.test(this.form.controls.password.value ?? '');
  }

  hasNumber(): boolean {
    return /\d/.test(this.form.controls.password.value ?? '');
  }

  hasSpecial(): boolean {
    return /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
      this.form.controls.password.value ?? ''
    );
  }

  clearFieldPulse(field: string): void {
    this.fieldPulse.update((state) => ({ ...state, [field]: 'idle' }));
  }

  submit(): void {
    this.formError.set(null);
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      this.formShake.set('error');
      this.submitPulse.set('active');
      this.pulseInvalidFields();
      return;
    }

    this.loading.set(true);
    this.submitPulse.set('active');

    const { email, password, fullName } = this.form.getRawValue();
    const request$ =
      this.mode() === 'login'
        ? this.auth.login({ email, password })
        : this.auth.register({ email, password, fullName });

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigate(['/catalog']);
      },
      error: (err: Error) => {
        this.loading.set(false);
        this.formError.set(err.message || 'No se pudo completar la operación.');
        this.formShake.set('error');
      },
    });
  }

  private applyModeValidators(mode: AuthMode): void {
    const fullName = this.form.controls.fullName;
    const password = this.form.controls.password;
    const confirmPassword = this.form.controls.confirmPassword;
    const acceptTerms = this.form.controls.acceptTerms;

    if (mode === 'register') {
      fullName.setValidators([
        Validators.required,
        noWhitespaceValidator(),
        fullNameValidator(),
      ]);
      password.setValidators([Validators.required, passwordStrengthValidator()]);
      confirmPassword.setValidators([Validators.required]);
      acceptTerms.setValidators([Validators.requiredTrue]);
      this.form.setValidators([passwordMatchValidator()]);
    } else {
      fullName.clearValidators();
      password.setValidators([Validators.required, Validators.minLength(8)]);
      confirmPassword.clearValidators();
      acceptTerms.clearValidators();
      this.form.clearValidators();
    }

    fullName.updateValueAndValidity({ emitEvent: false });
    password.updateValueAndValidity({ emitEvent: false });
    confirmPassword.updateValueAndValidity({ emitEvent: false });
    acceptTerms.updateValueAndValidity({ emitEvent: false });
    this.form.updateValueAndValidity({ emitEvent: false });
  }

  private pulseInvalidFields(): void {
    const pulses: Record<string, 'idle' | 'error'> = { ...this.fieldPulse() };
    (['fullName', 'email', 'password', 'confirmPassword', 'acceptTerms'] as const).forEach(
      (key) => {
        const control = this.form.get(key);
        if (control && control.invalid && this.isControlActive(key)) {
          pulses[key] = 'error';
        }
      }
    );
    this.fieldPulse.set(pulses);
  }

  private isControlActive(key: string): boolean {
    if (this.mode() === 'login') {
      return key === 'email' || key === 'password';
    }
    return true;
  }
}
