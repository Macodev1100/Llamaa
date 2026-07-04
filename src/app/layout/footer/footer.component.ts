import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="mt-auto border-t border-border bg-surface">
      <div
        class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-ink-muted
          sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <p>
          © {{ year }} Rydex Store Industries — Dark mode & neon gear.
        </p>
        <div class="flex gap-4">
          <a routerLink="/catalog" class="hover:text-brand-glow">Catálogo</a>
          <a routerLink="/checkout" class="hover:text-brand-glow">Checkout</a>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
