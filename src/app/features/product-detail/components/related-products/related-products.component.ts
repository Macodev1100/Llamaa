import { Component, Input } from '@angular/core';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    @if (products.length > 0) {
      <section>
        <h2 class="section-title mb-6 text-xl">Productos relacionados</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (product of products; track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
      </section>
    }
  `,
})
export class RelatedProductsComponent {
  @Input({ required: true }) products: Product[] = [];
}
