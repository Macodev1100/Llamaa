import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="payment" [formGroup]="form">
      <h2>Método de pago</h2>

      <div class="payment-options">
        <label class="payment-option">
          <input type="radio" formControlName="paymentMethod" value="transfer" />
          <span class="payment-label">Transferencia Bancaria</span>
          <span class="payment-check" aria-hidden="true">✓</span>
        </label>

        <label class="payment-option">
          <input type="radio" formControlName="paymentMethod" value="yape" />
          <span class="payment-label">Yape</span>
          <span class="payment-check" aria-hidden="true">✓</span>
        </label>

        <label class="payment-option">
          <input type="radio" formControlName="paymentMethod" value="cash" />
          <span class="payment-label">Efectivo</span>
          <span class="payment-check" aria-hidden="true">✓</span>
        </label>
      </div>
    </div>
  `,
  styles: `
    .payment {
      border-radius: 0.9rem;
      border: 1px solid var(--color-border);
      background: var(--color-surface);
      padding: 1.1rem;
    }

    .payment h2 {
      margin: 0 0 0.9rem;
      font-size: 1.05rem;
      font-weight: 600;
    }

    .payment-options {
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
    }

    .payment-option {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.7rem;
      border: 1px solid var(--color-border);
      border-radius: 0.65rem;
      background: var(--color-surface-2);
      padding: 0.85rem 1rem;
      cursor: pointer;
      transition:
        border-color 160ms ease,
        background 160ms ease;
    }

    .payment-option:has(input:checked) {
      border-color: var(--color-accent);
      background: color-mix(in srgb, var(--color-accent) 10%, var(--color-surface-2));
    }

    .payment-option input {
      accent-color: var(--color-accent);
    }

    .payment-label {
      flex: 1;
      font-size: 0.92rem;
      font-weight: 500;
    }

    .payment-check {
      opacity: 0;
      color: var(--color-accent);
      font-weight: 700;
    }

    .payment-option:has(input:checked) .payment-check {
      opacity: 1;
    }
  `,
})
export class PaymentFormComponent {
  @Input({ required: true }) form!: FormGroup;
}
