import { DecimalPipe } from '@angular/common';
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(12px) scale(0.98)' }),
        animate(
          '420ms cubic-bezier(0.22, 1, 0.36, 1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        ),
      ]),
    ]),
  ],
  template: `
    <article
      @fadeIn
      class="product-card"
      (pointermove)="onMove($event)"
      (pointerleave)="onLeave()"
      [style.--gx]="gx() + 'px'"
      [style.--gy]="gy() + 'px'"
    >
      <div class="product-card-glow" aria-hidden="true"></div>

      <a [routerLink]="['/product', product().id]" class="product-card-media">
        <img [src]="image()" [alt]="name()" loading="lazy" />
        <div class="product-card-shine" aria-hidden="true"></div>
        <button
          type="button"
          class="product-card-fav"
          [class.active]="favorited()"
          (click)="toggleFavorite($event)"
          [attr.aria-label]="favorited() ? 'Quitar de favoritos' : 'Agregar a favoritos'"
        >
          {{ favorited() ? '♥' : '♡' }}
        </button>
        @if (seminuevo()) {
          <span class="product-card-badge">Seminuevo</span>
        }
      </a>

      <div class="product-card-body">
        <a [routerLink]="['/product', product().id]">
          <h3>{{ name() }}</h3>
        </a>
        <p class="product-card-price">S/ {{ price() | number: '1.2-2' }}</p>
      </div>
    </article>
  `,
  styles: `
    .product-card {
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border-radius: 0.9rem;
      border: 1px solid var(--color-border);
      background: var(--color-surface);
      height: 100%;
      isolation: isolate;
      transition:
        border-color 200ms ease,
        transform 220ms ease,
        box-shadow 220ms ease;
    }

    .product-card-glow {
      pointer-events: none;
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      opacity: 0;
      background: radial-gradient(
        180px circle at var(--gx, 50%) var(--gy, 50%),
        color-mix(in srgb, var(--color-primary) 35%, transparent),
        color-mix(in srgb, var(--color-accent) 12%, transparent) 35%,
        transparent 65%
      );
      transition: opacity 180ms ease;
      z-index: 0;
    }

    .product-card:hover {
      border-color: color-mix(in srgb, var(--color-primary) 55%, var(--color-border));
      transform: translateY(-4px);
      box-shadow:
        0 0 0 1px color-mix(in srgb, var(--color-primary) 25%, transparent),
        0 12px 28px rgb(0 0 0 / 0.35),
        0 0 28px color-mix(in srgb, var(--color-primary) 22%, transparent);
    }

    .product-card:hover .product-card-glow {
      opacity: 1;
    }

    .product-card-media,
    .product-card-body {
      position: relative;
      z-index: 1;
    }

    .product-card-media {
      position: relative;
      display: block;
      aspect-ratio: 2 / 3;
      background: var(--color-surface-2);
      overflow: hidden;
    }

    .product-card-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 350ms ease, filter 350ms ease;
    }

    .product-card:hover .product-card-media img {
      transform: scale(1.06);
      filter: brightness(1.08) saturate(1.08);
    }

    .product-card-shine {
      pointer-events: none;
      position: absolute;
      inset: 0;
      background: linear-gradient(
        115deg,
        transparent 35%,
        color-mix(in srgb, #fff 18%, transparent) 48%,
        transparent 62%
      );
      transform: translateX(-120%);
      transition: transform 500ms ease;
    }

    .product-card:hover .product-card-shine {
      transform: translateX(120%);
    }

    .product-card-fav {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 1.85rem;
      height: 1.85rem;
      border: 1px solid color-mix(in srgb, #fff 15%, transparent);
      border-radius: 999px;
      background: rgb(11 14 20 / 0.55);
      backdrop-filter: blur(6px);
      color: #fff;
      cursor: pointer;
      font-size: 0.9rem;
      display: grid;
      place-items: center;
      transition:
        color 160ms ease,
        box-shadow 160ms ease,
        transform 160ms ease;
    }

    .product-card-fav:hover,
    .product-card-fav.active {
      color: var(--color-accent);
      box-shadow: 0 0 14px color-mix(in srgb, var(--color-accent) 45%, transparent);
      transform: scale(1.08);
    }

    .product-card-badge {
      position: absolute;
      left: 0.5rem;
      bottom: 0.5rem;
      border-radius: 999px;
      background: var(--color-accent);
      color: #04120a;
      font-size: 0.68rem;
      font-weight: 700;
      padding: 0.22rem 0.55rem;
      box-shadow: 0 0 12px color-mix(in srgb, var(--color-accent) 45%, transparent);
    }

    .product-card-body {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      padding: 0.75rem 0.8rem 0.9rem;
    }

    .product-card-body h3 {
      margin: 0;
      font-size: 0.82rem;
      font-weight: 500;
      line-height: 1.3;
      color: var(--color-text);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: 2.15em;
      transition: color 160ms ease, text-shadow 160ms ease;
    }

    .product-card:hover .product-card-body h3 {
      color: #fff;
      text-shadow: 0 0 12px color-mix(in srgb, var(--color-primary) 40%, transparent);
    }

    .product-card-price {
      margin: 0;
      font-size: 0.98rem;
      font-weight: 700;
      color: var(--color-accent);
      text-shadow: 0 0 12px color-mix(in srgb, var(--color-accent) 40%, transparent);
    }
  `,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();

  readonly name = computed(() => this.product().name);
  readonly price = computed(() => this.product().price);
  readonly image = computed(() => this.product().image);
  readonly seminuevo = computed(() => this.product().seminuevo === true);

  readonly favorited = signal(false);
  readonly gx = signal(80);
  readonly gy = signal(80);

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favorited.update((value) => !value);
  }

  onMove(event: PointerEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.gx.set(event.clientX - rect.left);
    this.gy.set(event.clientY - rect.top);
  }

  onLeave(): void {
    this.gx.set(80);
    this.gy.set(80);
  }
}
