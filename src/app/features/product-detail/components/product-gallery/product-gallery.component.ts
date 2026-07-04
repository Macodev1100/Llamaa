import { Component, Input, signal } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  template: `
    <div class="gallery">
      <div class="gallery-main">
        <button type="button" class="gallery-nav prev" (click)="prev()" aria-label="Anterior">
          ‹
        </button>
        <img [src]="currentImage" [alt]="product.name" />
        <button type="button" class="gallery-nav next" (click)="next()" aria-label="Siguiente">
          ›
        </button>
      </div>

      <div class="gallery-thumbs">
        @for (image of images; track image; let i = $index) {
          <button
            type="button"
            class="gallery-thumb"
            [class.active]="i === activeIndex()"
            (click)="activeIndex.set(i)"
          >
            <img [src]="image" [alt]="product.name + ' miniatura ' + (i + 1)" />
          </button>
        }
      </div>
    </div>
  `,
  styles: `
    .gallery {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }

    .gallery-main {
      position: relative;
      display: grid;
      place-items: center;
      border-radius: 0.9rem;
      background: var(--color-surface-2);
      border: 1px solid color-mix(in srgb, var(--color-primary) 30%, var(--color-border));
      min-height: 20rem;
      overflow: hidden;
      box-shadow:
        0 0 0 1px color-mix(in srgb, var(--color-primary) 12%, transparent),
        0 0 28px color-mix(in srgb, var(--color-primary) 14%, transparent);
    }

    .gallery-main img {
      max-height: 26rem;
      width: auto;
      max-width: 100%;
      object-fit: contain;
    }

    .gallery-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      border: 0;
      background: rgb(11 14 20 / 0.45);
      color: #fff;
      width: 2rem;
      height: 2rem;
      border-radius: 999px;
      font-size: 1.25rem;
      cursor: pointer;
      display: grid;
      place-items: center;
    }

    .gallery-nav.prev {
      left: 0.6rem;
    }

    .gallery-nav.next {
      right: 0.6rem;
    }

    .gallery-thumbs {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.55rem;
    }

    .gallery-thumb {
      border: 1px solid var(--color-border);
      border-radius: 0.55rem;
      overflow: hidden;
      padding: 0;
      background: var(--color-surface-2);
      cursor: pointer;
      aspect-ratio: 1;
    }

    .gallery-thumb.active {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 1px var(--color-accent);
    }

    .gallery-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  `,
})
export class ProductGalleryComponent {
  @Input({ required: true }) product!: Product;

  readonly activeIndex = signal(0);

  get images(): string[] {
    const list = this.product.images?.length
      ? this.product.images
      : [this.product.image, this.product.image, this.product.image, this.product.image];
    return list.slice(0, 4);
  }

  get currentImage(): string {
    return this.images[this.activeIndex()] ?? this.product.image;
  }

  prev(): void {
    const total = this.images.length;
    this.activeIndex.update((i) => (i - 1 + total) % total);
  }

  next(): void {
    const total = this.images.length;
    this.activeIndex.update((i) => (i + 1) % total);
  }
}
