import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/products/product.service';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [ProductCardComponent, RouterLink],
  template: `
    <section class="featured">
      <div class="featured-head">
        <h2>Productos destacados</h2>
        <a routerLink="/catalog">Ver todos</a>
      </div>

      <div class="featured-grid">
        @for (product of products; track product.id) {
          <app-product-card [product]="product" />
        }
      </div>
    </section>
  `,
  styles: `
    .featured {
      padding: 0.5rem 1rem 1.5rem;
    }

    @media (min-width: 640px) {
      .featured {
        padding: 0.5rem 1.25rem 1.75rem;
      }
    }

    .featured-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .featured-head h2 {
      margin: 0;
      font-size: 1.15rem;
      font-weight: 600;
      text-shadow: 0 0 14px color-mix(in srgb, var(--color-primary) 25%, transparent);
    }

    .featured-head a {
      color: var(--color-primary-glow);
      font-size: 0.9rem;
      font-weight: 600;
      text-shadow: 0 0 10px color-mix(in srgb, var(--color-primary) 35%, transparent);
      transition: color 160ms ease, text-shadow 160ms ease;
    }

    .featured-head a:hover {
      color: var(--color-accent);
      text-shadow: 0 0 12px color-mix(in srgb, var(--color-accent) 45%, transparent);
    }

    .featured-grid {
      display: grid;
      gap: 0.9rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 640px) {
      .featured-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    @media (min-width: 900px) {
      .featured-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    @media (min-width: 1200px) {
      .featured-grid {
        grid-template-columns: repeat(6, minmax(0, 1fr));
      }
    }
  `,
})
export class FeaturedProductsComponent {
  readonly products = inject(ProductService).getFeatured();
}
