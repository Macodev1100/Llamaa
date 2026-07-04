import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ProductService } from '../../../../core/products/product.service';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { AddToCartPanelComponent } from '../../components/add-to-cart-panel/add-to-cart-panel.component';
import { ProductGalleryComponent } from '../../components/product-gallery/product-gallery.component';
import { ProductInfoComponent } from '../../components/product-info/product-info.component';
import { RelatedProductsComponent } from '../../components/related-products/related-products.component';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [
    RouterLink,
    EmptyStateComponent,
    ProductGalleryComponent,
    ProductInfoComponent,
    AddToCartPanelComponent,
    RelatedProductsComponent,
  ],
  template: `
    <section class="detail">
      @if (product(); as product) {
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a routerLink="/">Inicio</a>
          <span>/</span>
          <a routerLink="/catalog">Productos</a>
          <span>/</span>
          <span class="current">{{ product.name }}</span>
        </nav>

        <div class="detail-grid">
          <app-product-gallery [product]="product" />
          <div class="detail-info">
            <app-product-info [product]="product" />
            <app-add-to-cart-panel [product]="product" />
          </div>
        </div>

        <div class="detail-related">
          <app-related-products [products]="related()" />
        </div>
      } @else {
        <app-empty-state
          title="Producto no encontrado"
          message="El producto que buscas no existe o fue retirado."
          actionLabel="Ir al catálogo"
          actionLink="/catalog"
        />
      }
    </section>
  `,
  styles: `
    .detail {
      padding: 1rem;
    }

    @media (min-width: 640px) {
      .detail {
        padding: 1.25rem;
      }
    }

    .breadcrumbs {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.4rem;
      margin-bottom: 1.1rem;
      font-size: 0.82rem;
      color: var(--color-text-muted);
    }

    .breadcrumbs a:first-child {
      color: var(--color-accent);
      font-weight: 600;
    }

    .breadcrumbs .current {
      color: var(--color-text-muted);
    }

    .detail-grid {
      display: grid;
      gap: 1.5rem;
    }

    @media (min-width: 900px) {
      .detail-grid {
        grid-template-columns: 1.05fr 1fr;
        gap: 2rem;
        align-items: start;
      }
    }

    .detail-related {
      margin-top: 2rem;
    }
  `,
})
export class ProductDetailPageComponent {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);

  private readonly productId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '')),
    { initialValue: '' }
  );

  readonly product = computed(() => this.productService.getById(this.productId()));
  readonly related = computed(() => {
    const product = this.product();
    return product ? this.productService.getRelated(product) : [];
  });
}
