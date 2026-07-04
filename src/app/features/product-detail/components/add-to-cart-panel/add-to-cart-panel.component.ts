import { Component, Input, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../../core/cart/cart.service';
import { pulseClick } from '../../../../shared/animations/micro-interactions';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-add-to-cart-panel',
  standalone: true,
  animations: [pulseClick],
  template: `
    <div class="panel">
      <button
        type="button"
        class="btn-cart"
        [@pulseClick]="addPulse()"
        (@pulseClick.done)="onPulseDone('add')"
        (click)="add()"
      >
        🛒 Agregar al carrito
      </button>

      <button
        type="button"
        class="btn-buy"
        [@pulseClick]="buyPulse()"
        (@pulseClick.done)="onPulseDone('buy')"
        (click)="buyNow()"
      >
        Comprar ahora
      </button>

      <button type="button" class="btn-fav" (click)="favorited.set(!favorited())">
        {{ favorited() ? '♥' : '♡' }} Agregar a favoritos
      </button>

      @if (added()) {
        <p class="added">✓ Añadido al carrito</p>
      }
    </div>
  `,
  styles: `
    .panel {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      margin-top: 0.5rem;
    }

    .btn-cart,
    .btn-buy,
    .btn-fav {
      width: 100%;
      border-radius: 0.55rem;
      padding: 0.85rem 1rem;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-cart {
      border: 0;
      background: var(--color-primary);
      color: #fff;
    }

    .btn-cart:hover {
      filter: brightness(1.08);
    }

    .btn-buy {
      border: 1px solid var(--color-border);
      background: transparent;
      color: #fff;
    }

    .btn-buy:hover {
      border-color: var(--color-text-muted);
    }

    .btn-fav {
      border: 0;
      background: transparent;
      color: var(--color-text-muted);
      font-weight: 500;
      padding: 0.35rem 0;
    }

    .btn-fav:hover {
      color: var(--color-accent);
    }

    .added {
      margin: 0;
      text-align: center;
      font-size: 0.85rem;
      color: var(--color-accent);
    }
  `,
})
export class AddToCartPanelComponent {
  @Input({ required: true }) product!: Product;

  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  readonly added = signal(false);
  readonly favorited = signal(false);
  readonly addPulse = signal<'idle' | 'active'>('idle');
  readonly buyPulse = signal<'idle' | 'active'>('idle');

  add(): void {
    this.addPulse.set('active');
    this.cart.add(this.product, 1);
    this.added.set(true);
    setTimeout(() => this.added.set(false), 2000);
  }

  buyNow(): void {
    this.buyPulse.set('active');
    this.cart.add(this.product, 1);
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
