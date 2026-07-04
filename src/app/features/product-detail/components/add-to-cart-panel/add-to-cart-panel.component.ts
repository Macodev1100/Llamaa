import { Component, Input, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../../core/cart/cart.service';
import { pulseClick } from '../../../../shared/animations/micro-interactions';
import { QuantitySelectorComponent } from '../../../../shared/components/quantity-selector/quantity-selector.component';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-add-to-cart-panel',
  standalone: true,
  imports: [QuantitySelectorComponent, RouterLink],
  animations: [pulseClick],
  template: `
    <div class="card-surface flex flex-col gap-4 p-5">
      <p class="font-display text-sm uppercase tracking-wide text-ink-muted">
        Añadir al carrito
      </p>

      <app-quantity-selector
        [value]="quantity()"
        [max]="product.stock"
        (valueChange)="quantity.set($event)"
      />

      <button
        type="button"
        class="btn-primary w-full"
        [@pulseClick]="addPulse()"
        (@pulseClick.done)="onPulseDone('add')"
        (click)="add()"
      >
        Añadir {{ quantity() }} unidad(es)
      </button>

      <button
        type="button"
        class="btn-accent buy-now-btn w-full"
        [@pulseClick]="buyPulse()"
        (@pulseClick.done)="onPulseDone('buy')"
        (click)="buyNow()"
      >
        Comprar ahora
      </button>

      <a routerLink="/checkout" class="btn-secondary w-full text-center">
        Ir al checkout
      </a>

      @if (added()) {
        <p class="text-center text-sm text-brand-accent">✓ Añadido al carrito</p>
      }
    </div>
  `,
  styles: `
    .buy-now-btn {
      transition:
        box-shadow 200ms ease,
        filter 200ms ease,
        transform 200ms ease;
    }

    .buy-now-btn:hover {
      filter: brightness(1.08);
      box-shadow: 0 0 22px color-mix(in srgb, var(--color-accent) 45%, transparent);
    }
  `,
})
export class AddToCartPanelComponent {
  @Input({ required: true }) product!: Product;

  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  readonly quantity = signal(1);
  readonly added = signal(false);
  readonly addPulse = signal<'idle' | 'active'>('idle');
  readonly buyPulse = signal<'idle' | 'active'>('idle');

  add(): void {
    this.addPulse.set('active');
    this.cart.add(this.product, this.quantity());
    this.added.set(true);
    setTimeout(() => this.added.set(false), 2000);
  }

  buyNow(): void {
    this.buyPulse.set('active');
    this.cart.add(this.product, this.quantity());
    void this.router.navigate(['/checkout']);
  }

  onPulseDone(target: 'add' | 'buy'): void {
    if (target === 'add') {
      this.addPulse.set('idle');
    } else {
      this.buyPulse.set('idle');
    }
  }
}
