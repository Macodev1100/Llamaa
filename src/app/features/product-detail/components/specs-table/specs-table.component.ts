import { KeyValuePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-specs-table',
  standalone: true,
  imports: [KeyValuePipe],
  template: `
    @if (product.specs) {
      <div class="card-surface overflow-hidden">
        <h2 class="border-b border-border px-5 py-4 font-display text-lg">Especificaciones</h2>
        <dl class="divide-y divide-border">
          @for (spec of product.specs | keyvalue; track spec.key) {
            <div class="grid grid-cols-2 gap-4 px-5 py-3 text-sm">
              <dt class="text-ink-muted">{{ spec.key }}</dt>
              <dd class="font-medium">{{ spec.value }}</dd>
            </div>
          }
        </dl>
      </div>
    }
  `,
})
export class SpecsTableComponent {
  @Input({ required: true }) product!: Product;
}
