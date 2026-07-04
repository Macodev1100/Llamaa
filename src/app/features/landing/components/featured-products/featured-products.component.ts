import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../../core/products/product.service';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [ProductCardComponent, RouterLink],
  template: `
    <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div class="mb-8 flex items-end justify-between gap-4">
        <div>
          <p class="mb-1 text-sm uppercase tracking-widest text-brand-accent">Top picks</p>
          <h2 class="section-title">Productos destacados</h2>
        </div>
        <a routerLink="/catalog" class="text-sm font-medium text-brand-glow hover:underline">
          Ver todos →
        </a>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        @for (product of products; track product.id) {
          <app-product-card [product]="product" />
        }
      </div>
    </section>
  `,
})
export class FeaturedProductsComponent {
  readonly products = inject(ProductService).getFeatured();
}
