import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../../core/products/product.service';
import { Product } from '../../../../shared/models/product.model';
import {
  CatalogFiltersComponent,
  CategoryFilter,
  SortOption,
} from '../../components/catalog-filters/catalog-filters.component';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';

@Component({
  selector: 'app-catalog-page',
  standalone: true,
  imports: [CatalogFiltersComponent, ProductGridComponent],
  template: `
    <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header class="mb-8">
        <p class="mb-1 text-sm uppercase tracking-widest text-brand-accent">Shop</p>
        <h1 class="section-title">Catálogo de productos</h1>
        <p class="mt-2 text-ink-muted">
          {{ products().length }} producto(s) encontrados
        </p>
      </header>

      <div class="mb-8">
        <app-catalog-filters
          [search]="search()"
          [category]="category()"
          [sort]="sort()"
          (searchChange)="onSearch($event)"
          (categoryChange)="onCategory($event)"
          (sortChange)="onSort($event)"
        />
      </div>

      <app-product-grid [products]="products()" />
    </section>
  `,
})
export class CatalogPageComponent {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly search = signal('');
  readonly category = signal<CategoryFilter>('all');
  readonly sort = signal<SortOption>('name');

  readonly products = computed(() => {
    let list = this.productService.getByCategory(this.category());
    const query = this.search().trim().toLowerCase();

    if (query) {
      list = list.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.includes(query))
      );
    }

    return this.sortProducts(list, this.sort());
  });

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const category = params.get('category') as CategoryFilter | null;
      const search = params.get('q') ?? '';
      const sort = (params.get('sort') as SortOption | null) ?? 'name';

      if (category) {
        this.category.set(category);
      }
      this.search.set(search);
      this.sort.set(sort);
    });
  }

  onSearch(value: string): void {
    this.search.set(value);
    this.syncQuery({ q: value || null });
  }

  onCategory(value: CategoryFilter): void {
    this.category.set(value);
    this.syncQuery({ category: value === 'all' ? null : value });
  }

  onSort(value: SortOption): void {
    this.sort.set(value);
    this.syncQuery({ sort: value === 'name' ? null : value });
  }

  private syncQuery(patch: Record<string, string | null>): void {
    const queryParams = {
      category: this.category() === 'all' ? null : this.category(),
      q: this.search() || null,
      sort: this.sort() === 'name' ? null : this.sort(),
      ...patch,
    };

    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private sortProducts(list: Product[], sort: SortOption): Product[] {
    const items = [...list];
    switch (sort) {
      case 'price-asc':
        return items.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return items.sort((a, b) => b.price - a.price);
      case 'rating':
        return items.sort((a, b) => b.rating - a.rating);
      default:
        return items.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}
