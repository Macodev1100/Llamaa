import { Component, Input } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { PriceTagComponent } from '../../../../shared/components/price-tag/price-tag.component';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [PriceTagComponent],
  template: `
    <div class="info">
      <h1>{{ product.name }}</h1>

      <div class="info-meta">
        @if (product.seminuevo) {
          <span class="badge">Seminuevo</span>
        } @else {
          <span class="badge badge-new">Nuevo</span>
        }

        <span class="meta-item">🎮 {{ product.platform || 'Multi' }}</span>
        <span class="meta-item">🎒 {{ product.genre || product.category }}</span>
        <span class="meta-item">🛡 {{ product.ageRating || 'Todos' }}</span>
      </div>

      <div class="info-price">
        <app-price-tag [price]="product.price" size="lg" />
      </div>

      <p class="info-desc">{{ product.description }}</p>
    </div>
  `,
  styles: `
    .info h1 {
      margin: 0;
      font-size: clamp(1.4rem, 2.4vw, 2rem);
      font-weight: 700;
      line-height: 1.2;
    }

    .info-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.65rem 0.9rem;
      margin-top: 0.85rem;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      background: var(--color-accent);
      color: #04120a;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.28rem 0.7rem;
    }

    .badge-new {
      background: var(--color-primary);
      color: #fff;
    }

    .meta-item {
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }

    .info-price {
      margin-top: 1rem;
    }

    .info-desc {
      margin: 1rem 0 0;
      color: var(--color-text-muted);
      line-height: 1.55;
      font-size: 0.95rem;
    }
  `,
})
export class ProductInfoComponent {
  @Input({ required: true }) product!: Product;
}
