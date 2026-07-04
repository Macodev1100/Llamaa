import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-shipping-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="card-surface p-5" [formGroup]="form">
      <h2 class="mb-4 font-display text-lg">Datos de envío</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block text-sm sm:col-span-2">
          <span class="mb-1.5 block text-ink-muted">Nombre completo</span>
          <input class="input-field" formControlName="fullName" autocomplete="name" />
        </label>

        <label class="block text-sm sm:col-span-2">
          <span class="mb-1.5 block text-ink-muted">Email</span>
          <input class="input-field" type="email" formControlName="email" autocomplete="email" />
        </label>

        <label class="block text-sm sm:col-span-2">
          <span class="mb-1.5 block text-ink-muted">Dirección</span>
          <input class="input-field" formControlName="address" autocomplete="street-address" />
        </label>

        <label class="block text-sm">
          <span class="mb-1.5 block text-ink-muted">Ciudad</span>
          <input class="input-field" formControlName="city" autocomplete="address-level2" />
        </label>

        <label class="block text-sm">
          <span class="mb-1.5 block text-ink-muted">Código postal</span>
          <input class="input-field" formControlName="zip" autocomplete="postal-code" />
        </label>
      </div>
    </div>
  `,
})
export class ShippingFormComponent {
  @Input({ required: true }) form!: FormGroup;
}
