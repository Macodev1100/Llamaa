import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="card-surface p-5" [formGroup]="form">
      <h2 class="mb-4 font-display text-lg">Método de pago</h2>
      <div class="flex flex-col gap-3">
        <label
          class="flex cursor-pointer items-center gap-3 rounded-lg border border-border
            bg-surface-2 px-4 py-3 transition has-[:checked]:border-brand has-[:checked]:shadow-neon"
        >
          <input type="radio" formControlName="paymentMethod" value="card" class="accent-brand" />
          <span>Tarjeta de crédito / débito</span>
        </label>

        <label
          class="flex cursor-pointer items-center gap-3 rounded-lg border border-border
            bg-surface-2 px-4 py-3 transition has-[:checked]:border-brand has-[:checked]:shadow-neon"
        >
          <input
            type="radio"
            formControlName="paymentMethod"
            value="transfer"
            class="accent-brand"
          />
          <span>Transferencia bancaria</span>
        </label>
      </div>
      <p class="mt-3 text-xs text-ink-muted">
        Demo: no se procesan pagos reales. Al confirmar se simula el pedido.
      </p>
    </div>
  `,
})
export class PaymentFormComponent {
  @Input({ required: true }) form!: FormGroup;
}
