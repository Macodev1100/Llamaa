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
import { ShippingFormComponent } from '../../components/shipping-form/shipping-form.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    EmptyStateComponent,
    CartSummaryComponent,
    ShippingFormComponent,
    PaymentFormComponent,
  ],
  template: `
    <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header class="mb-8">
        <p class="mb-1 text-sm uppercase tracking-widest text-brand-accent">Checkout</p>
        <h1 class="section-title">Finalizar compra</h1>
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
        <form class="grid gap-8 lg:grid-cols-5" [formGroup]="form" (ngSubmit)="submit()">
          <div class="flex flex-col gap-6 lg:col-span-3">
            <app-shipping-form [form]="form" />
            <app-payment-form [form]="form" />
          </div>

          <div class="flex flex-col gap-4 lg:col-span-2">
            <app-cart-summary />
            <button
              type="submit"
              class="btn-accent w-full"
              [disabled]="form.invalid"
            >
              Confirmar pedido
            </button>
          </div>
        </form>
      }
    </section>
  `,
})
export class CheckoutPageComponent {
  readonly cart = inject(CartService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    zip: ['', Validators.required],
    paymentMethod: this.fb.nonNullable.control<'card' | 'transfer'>('card', Validators.required),
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
