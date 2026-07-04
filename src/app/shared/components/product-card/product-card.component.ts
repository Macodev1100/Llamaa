import { CurrencyPipe } from '@angular/common';
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/cart/cart.service';
import { pulseClick } from '../../animations/micro-interactions';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  animations: [
    pulseClick,
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(14px)' }),
        animate(
          '450ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
  template: `
    <article
      @fadeIn
      class="product-card group flex h-full flex-col overflow-hidden rounded-xl
        border border-border bg-surface transition duration-300
        hover:border-brand/60 hover:shadow-neon"
    >
      <a
        [routerLink]="['/product', product().id]"
        class="relative block overflow-hidden bg-surface-2"
      >
        <img
          [src]="image()"
          [alt]="name()"
          class="aspect-[3/2] w-full object-cover transition duration-500
            group-hover:scale-105"
          loading="lazy"
        />

        <div class="absolute left-3 top-3 flex flex-wrap gap-2">
          @if (seminuevo()) {
            <span
              class="rounded-full border border-brand-pink/40 bg-bg/85 px-2.5 py-1
                text-[11px] font-semibold uppercase tracking-wide text-brand-pink
                shadow-neon-pink backdrop-blur-sm"
            >
              Seminuevo
            </span>
          } @else {
            <span
              class="rounded-full border border-brand-accent/30 bg-bg/85 px-2.5 py-1
                text-[11px] font-semibold uppercase tracking-wide text-brand-accent
                backdrop-blur-sm"
            >
              Nuevo
            </span>
          }
        </div>
      </a>

      <div class="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <a
          [routerLink]="['/product', product().id]"
          class="block transition-colors hover:text-brand-glow"
        >
          <h3
            class="font-display text-sm font-semibold leading-snug tracking-wide
              text-ink sm:text-base"
          >
            {{ name() }}
          </h3>
        </a>

        <div class="mt-auto flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p class="font-display text-lg font-semibold text-brand-glow sm:text-xl">
            {{ price() | currency: 'USD':'symbol':'1.2-2' }}
          </p>

          <button
            type="button"
            class="add-to-cart-btn"
            [@pulseClick]="pulse()"
            (@pulseClick.done)="pulse.set('idle')"
            (click)="addToCart()"
            [attr.aria-label]="'Agregar ' + name() + ' al carrito'"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  `,
  styles: `
    .add-to-cart-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      border-radius: 0.5rem;
      border: 1px solid var(--color-border);
      background: transparent;
      padding: 0.5rem 0.875rem;
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--color-text);
      cursor: pointer;
      transition:
        background-color 200ms ease,
        border-color 200ms ease,
        box-shadow 200ms ease,
        color 200ms ease,
        transform 200ms ease;
    }

    @media (min-width: 640px) {
      .add-to-cart-btn {
        width: auto;
        white-space: nowrap;
      }
    }

    .add-to-cart-btn:hover {
      border-color: var(--color-primary);
      background: color-mix(in srgb, var(--color-primary) 22%, transparent);
      color: var(--color-primary-glow);
      box-shadow: 0 0 18px color-mix(in srgb, var(--color-primary) 45%, transparent);
      transform: translateY(-1px);
    }

    .add-to-cart-btn:active {
      transform: translateY(0);
    }

    .add-to-cart-btn:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  `,
})
export class ProductCardComponent {
  /** Producto completo recibido desde el padre. */
  readonly product = input.required<Product>();

  /** Estado derivado con Signals (nombre, precio, imagen, seminuevo). */
  readonly name = computed(() => this.product().name);
  readonly price = computed(() => this.product().price);
  readonly image = computed(() => this.product().image);
  readonly seminuevo = computed(() => this.product().seminuevo === true);

  private readonly cart = inject(CartService);
  readonly pulse = signal<'idle' | 'active'>('idle');

  addToCart(): void {
    this.pulse.set('active');
    this.cart.add(this.product());
  }
}
