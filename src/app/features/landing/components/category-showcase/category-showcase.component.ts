import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CategoryItem {
  label: string;
  slug: string;
  emoji: string;
  description: string;
}

@Component({
  selector: 'app-category-showcase',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="border-y border-border bg-surface/50 py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 class="section-title mb-8 text-center">Explora por categoría</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          @for (category of categories; track category.slug) {
            <a
              [routerLink]="['/catalog']"
              [queryParams]="{ category: category.slug }"
              class="card-surface group p-6 transition hover:border-brand-accent hover:shadow-neon-accent"
            >
              <span class="mb-3 block text-3xl">{{ category.emoji }}</span>
              <h3 class="font-display text-lg font-semibold group-hover:text-brand-glow">
                {{ category.label }}
              </h3>
              <p class="mt-1 text-sm text-ink-muted">{{ category.description }}</p>
            </a>
          }
        </div>
      </div>
    </section>
  `,
})
export class CategoryShowcaseComponent {
  readonly categories: CategoryItem[] = [
    { label: 'GPUs', slug: 'gpus', emoji: '🖥️', description: 'Ray tracing y DLSS/FSR' },
    { label: 'CPUs', slug: 'cpus', emoji: '⚡', description: 'Potencia multi-núcleo' },
    { label: 'Periféricos', slug: 'peripherals', emoji: '⌨️', description: 'Teclados y ratones' },
    { label: 'Monitores', slug: 'monitors', emoji: '📺', description: 'OLED y alta tasa' },
  ];
}
