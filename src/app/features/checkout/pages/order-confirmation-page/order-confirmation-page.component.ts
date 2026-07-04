import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-order-confirmation-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <div class="card-surface px-8 py-12 shadow-neon-accent">
        <div class="mb-4 text-5xl">✓</div>
        <h1 class="section-title mb-3">¡Pedido confirmado!</h1>
        <p class="text-ink-muted">
          Gracias por tu compra. Tu número de pedido es:
        </p>
        <p class="mt-3 font-display text-xl text-brand-glow">
          {{ orderId() || 'SG-DEMO' }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <a routerLink="/" class="btn-primary">Volver al inicio</a>
          <a routerLink="/catalog" class="btn-secondary">Seguir comprando</a>
        </div>
      </div>
    </section>
  `,
})
export class OrderConfirmationPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly orderId = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('orderId') ?? '')),
    { initialValue: '' }
  );
}
