import { Component, Input } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { PriceTagComponent } from '../../../../shared/components/price-tag/price-tag.component';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [PriceTagComponent],
  template: `
    <div>
      <p class="mb-2 text-sm uppercase tracking-widest text-brand-accent">
        {{ product.category }}
      </p>
      <h1 class="font-display text-3xl font-bold md:text-4xl">{{ product.name }}</h1>
      <p class="mt-2 text-ink-muted">★ {{ product.rating }} · {{ product.stock }} en stock</p>
      <div class="mt-4">
        <app-price-tag [price]="product.price" size="lg" />
      </div>
      <p class="mt-6 leading-relaxed text-ink-muted">{{ product.description }}</p>

      <div class="mt-4 flex flex-wrap gap-2">
        @for (tag of product.tags; track tag) {
          <span
            class="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs
              text-brand-glow"
          >
            #{{ tag }}
          </span>
        }
      </div>
    </div>
  `,
})
export class ProductInfoComponent {
  @Input({ required: true }) product!: Product;
}
