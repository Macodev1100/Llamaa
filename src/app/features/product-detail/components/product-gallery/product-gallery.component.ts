import { Component, Input } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  template: `
    <div class="card-surface overflow-hidden">
      <img
        [src]="product.image"
        [alt]="product.name"
        class="aspect-[4/3] w-full object-cover"
      />
    </div>
  `,
})
export class ProductGalleryComponent {
  @Input({ required: true }) product!: Product;
}
