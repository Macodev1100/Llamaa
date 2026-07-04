import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { CartService } from '../../core/cart/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header
      class="sticky top-0 z-50 border-b border-border/80 bg-bg/80 backdrop-blur-md"
    >
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a routerLink="/" class="flex items-center gap-2">
          <span
            class="flex h-9 w-9 items-center justify-center rounded-lg font-display
              text-sm font-bold text-white shadow-neon"
            style="background: linear-gradient(135deg, #6d28d9 0%, #a855f7 45%, #22d3ee 100%)"
          >
            R
          </span>
          <span class="font-display text-lg font-semibold tracking-wide">
            Rydex<span class="text-brand-glow">Store</span>
          </span>
        </a>

        <nav class="hidden items-center gap-6 text-sm font-medium md:flex">
          <a
            routerLink="/"
            routerLinkActive="text-brand-glow"
            [routerLinkActiveOptions]="{ exact: true }"
            class="text-ink-muted transition hover:text-ink"
          >
            Inicio
          </a>
          <a
            routerLink="/catalog"
            routerLinkActive="text-brand-glow"
            class="text-ink-muted transition hover:text-ink"
          >
            Catálogo
          </a>
          <a
            routerLink="/checkout"
            routerLinkActive="text-brand-glow"
            class="text-ink-muted transition hover:text-ink"
          >
            Checkout
          </a>
          @if (!auth.isAuthenticated()) {
            <a
              routerLink="/login"
              routerLinkActive="text-brand-glow"
              class="text-ink-muted transition hover:text-ink"
            >
              Cuenta
            </a>
          }
        </nav>

        <div class="flex items-center gap-2 sm:gap-3">
          @if (auth.isAuthenticated()) {
            <span class="hidden max-w-[10rem] truncate text-sm text-ink-muted sm:inline">
              {{ auth.user()?.fullName }}
            </span>
            <button type="button" class="btn-secondary px-3 py-2 text-sm" (click)="logout()">
              Salir
            </button>
          } @else {
            <a routerLink="/login" class="btn-secondary hidden px-3 py-2 text-sm sm:inline-flex">
              Entrar
            </a>
          }

          <a routerLink="/checkout" class="btn-secondary relative px-3 py-2 text-sm">
            <span>🛒 Carrito</span>
            @if (cart.count() > 0) {
              <span
                class="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center
                  rounded-full bg-brand-pink px-1 text-xs font-bold text-bg shadow-neon-pink"
              >
                {{ cart.count() }}
              </span>
            }
          </a>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  readonly cart = inject(CartService);
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/login']);
  }
}
