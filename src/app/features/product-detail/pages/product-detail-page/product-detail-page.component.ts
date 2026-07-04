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
import { SpecsTableComponent } from '../../components/specs-table/specs-table.component';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [
    RouterLink,
    EmptyStateComponent,
    ProductGalleryComponent,
    ProductInfoComponent,
    AddToCartPanelComponent,
    SpecsTableComponent,
    RelatedProductsComponent,
  ],
  template: `
    <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <a routerLink="/catalog" class="mb-6 inline-block text-sm text-brand-glow hover:underline">
        ← Volver al catálogo
      </a>

      @if (product(); as product) {
        <div class="grid gap-8 lg:grid-cols-2">
          <app-product-gallery [product]="product" />
          <div class="flex flex-col gap-6">
            <app-product-info [product]="product" />
            <app-add-to-cart-panel [product]="product" />
          </div>
        </div>

        <div class="mt-10 grid gap-8 lg:grid-cols-2">
          <app-specs-table [product]="product" />
        </div>

        <div class="mt-14">
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
