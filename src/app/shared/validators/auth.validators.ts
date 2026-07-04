import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

/** Email con formato estricto (no solo el validador nativo). */
export function strictEmailValidator(): ValidatorFn {
  const pattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '').trim();
    if (!value) {
      return null;
    }
    return pattern.test(value) ? null : { strictEmail: true };
  };
}

/** Sin espacios al inicio/final ni solo espacios. */
export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value == null || value === '') {
      return null;
    }
    return String(value).trim().length === 0 || String(value) !== String(value).trim()
      ? { whitespace: true }
      : null;
  };
}

/**
 * Contraseña fuerte:
 * mín. 8, mayúscula, minúscula, número y carácter especial.
 */
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '');
    if (!value) {
      return null;
    }

    const errors: ValidationErrors = {};

    if (value.length < 8) {
      errors['minLengthPassword'] = { requiredLength: 8, actualLength: value.length };
    }
    if (!/[A-Z]/.test(value)) {
      errors['missingUppercase'] = true;
    }
    if (!/[a-z]/.test(value)) {
      errors['missingLowercase'] = true;
    }
    if (!/\d/.test(value)) {
      errors['missingNumber'] = true;
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
      errors['missingSpecial'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  };
}

/** Nombre completo: al menos 2 palabras, solo letras y espacios. */
export function fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '').trim();
    if (!value) {
      return null;
    }
    const parts = value.split(/\s+/).filter(Boolean);
    if (parts.length < 2) {
      return { fullName: true };
    }
    return /^[\p{L}\s'-]+$/u.test(value) ? null : { fullNameChars: true };
  };
}

/** Confirmar contraseña: debe coincidir con el control `password`. */
export function passwordMatchValidator(
  passwordKey = 'password',
  confirmKey = 'confirmPassword'
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey);
    const confirm = group.get(confirmKey);
    if (!password || !confirm) {
      return null;
    }

    const mismatch = password.value !== confirm.value;
    const current = confirm.errors ?? {};

    if (mismatch) {
      confirm.setErrors({ ...current, passwordMismatch: true });
      return { passwordMismatch: true };
    }

    if (current['passwordMismatch']) {
      const { passwordMismatch: _, ...rest } = current;
      confirm.setErrors(Object.keys(rest).length ? rest : null);
    }

    return null;
  };
}
