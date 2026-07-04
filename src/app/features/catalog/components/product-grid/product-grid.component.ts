import { Component, Input } from '@angular/core';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductCardComponent, EmptyStateComponent],
  template: `
    @if (products.length === 0) {
      <app-empty-state
        title="Sin resultados"
        message="Prueba con otros filtros o términos de búsqueda."
        actionLabel="Limpiar vista"
        actionLink="/catalog"
      />
    } @else {
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        @for (product of products; track product.id) {
          <app-product-card [product]="product" />
        }
      </div>
    }
  `,
})
export class ProductGridComponent {
  @Input({ required: true }) products: Product[] = [];
}
