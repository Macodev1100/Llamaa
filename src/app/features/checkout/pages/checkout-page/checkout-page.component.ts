import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../../core/cart/cart.service';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { CartSummaryComponent } from '../../components/cart-summary/cart-summary.component';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    EmptyStateComponent,
    CartSummaryComponent,
    PaymentFormComponent,
  ],
  template: `
    <section class="checkout">
      <header class="checkout-head">
        <h1>Checkout</h1>
      </header>

      @if (cart.count() === 0) {
        <app-empty-state
          icon="🛒"
          title="Tu carrito está vacío"
          message="Añade productos desde el catálogo para continuar."
          actionLabel="Ir al catálogo"
          actionLink="/catalog"
        />
      } @else {
        <form class="checkout-grid" [formGroup]="form" (ngSubmit)="submit()">
          <app-cart-summary />

          <div class="checkout-payment">
            <app-payment-form [form]="form" />

            <button
              type="submit"
              class="checkout-submit"
              [disabled]="form.invalid"
            >
              Realizar pedido
            </button>

            <p class="checkout-secure">🔒 Pago 100% seguro</p>
          </div>
        </form>
      }
    </section>
  `,
  styles: `
    .checkout {
      padding: 1rem;
    }

    @media (min-width: 640px) {
      .checkout {
        padding: 1.25rem;
      }
    }

    .checkout-head h1 {
      margin: 0 0 1.25rem;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .checkout-grid {
      display: grid;
      gap: 1.25rem;
    }

    @media (min-width: 900px) {
      .checkout-grid {
        grid-template-columns: 1.1fr 0.9fr;
        align-items: start;
      }
    }

    .checkout-payment {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .checkout-submit {
      width: 100%;
      border: 0;
      border-radius: 0.65rem;
      background: var(--color-accent);
      color: #04120a;
      font-weight: 700;
      font-size: 0.95rem;
      padding: 0.9rem 1rem;
      cursor: pointer;
    }

    .checkout-submit:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .checkout-submit:hover:not(:disabled) {
      filter: brightness(1.06);
    }

    .checkout-secure {
      margin: 0;
      text-align: center;
      font-size: 0.82rem;
      color: var(--color-text-muted);
    }
  `,
})
export class CheckoutPageComponent {
  readonly cart = inject(CartService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    paymentMethod: this.fb.nonNullable.control<'transfer' | 'yape' | 'cash'>(
      'transfer',
      Validators.required
    ),
  });

  submit(): void {
    if (this.form.invalid || this.cart.count() === 0) {
      this.form.markAllAsTouched();
      return;
    }

    const orderId = `SG-${Date.now().toString(36).toUpperCase()}`;
    this.cart.clear();
    void this.router.navigate(['/checkout/confirmation'], {
      queryParams: { orderId },
    });
  }
}
