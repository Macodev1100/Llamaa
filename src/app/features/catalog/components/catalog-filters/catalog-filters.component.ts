import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductCategory } from '../../../../shared/models/product.model';

export type CategoryFilter = ProductCategory | 'all';
export type SortOption = 'name' | 'price-asc' | 'price-desc' | 'rating';

@Component({
  selector: 'app-catalog-filters',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="card-surface flex flex-col gap-4 p-4 sm:flex-row sm:items-end sm:justify-between">
      <div class="grid flex-1 gap-4 sm:grid-cols-3">
        <label class="block text-sm">
          <span class="mb-1.5 block text-ink-muted">Buscar</span>
          <input
            type="search"
            class="input-field"
            placeholder="Nombre o tag..."
            [ngModel]="search"
            (ngModelChange)="searchChange.emit($event)"
          />
        </label>

        <label class="block text-sm">
          <span class="mb-1.5 block text-ink-muted">Categoría</span>
          <select
            class="input-field"
            [ngModel]="category"
            (ngModelChange)="categoryChange.emit($event)"
          >
            <option value="all">Todas</option>
            <option value="gpus">GPUs</option>
            <option value="cpus">CPUs</option>
            <option value="peripherals">Periféricos</option>
            <option value="monitors">Monitores</option>
            <option value="accessories">Accesorios</option>
          </select>
        </label>

        <label class="block text-sm">
          <span class="mb-1.5 block text-ink-muted">Ordenar</span>
          <select
            class="input-field"
            [ngModel]="sort"
            (ngModelChange)="sortChange.emit($event)"
          >
            <option value="name">Nombre</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="rating">Valoración</option>
          </select>
        </label>
      </div>
    </div>
  `,
})
export class CatalogFiltersComponent {
  @Input() search = '';
  @Input() category: CategoryFilter = 'all';
  @Input() sort: SortOption = 'name';

  @Output() searchChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<CategoryFilter>();
  @Output() sortChange = new EventEmitter<SortOption>();
}
