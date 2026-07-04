import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { CartService } from '../../core/cart/cart.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <header class="topbar">
      <button
        type="button"
        class="topbar-menu md:hidden"
        (click)="menuToggle.emit()"
        aria-label="Abrir menú"
      >
        ☰
      </button>

      <form class="topbar-search" (ngSubmit)="search()">
        <span class="topbar-search-icon" aria-hidden="true">⌕</span>
        <input
          type="search"
          name="q"
          [(ngModel)]="query"
          placeholder="Buscar productos..."
          class="topbar-search-input"
        />
      </form>

      <div class="topbar-actions">
        <a routerLink="/checkout" class="topbar-icon-btn" aria-label="Carrito">
          <span aria-hidden="true">🛒</span>
          <span class="topbar-badge">{{ cart.count() }}</span>
        </a>

        <button type="button" class="topbar-icon-btn" aria-label="Favoritos">
          <span aria-hidden="true">♡</span>
        </button>

        <div class="topbar-user">
          <span class="topbar-avatar" aria-hidden="true">☺</span>
          <div class="topbar-user-meta">
            @if (auth.isAuthenticated()) {
              <p class="topbar-user-name">{{ auth.user()?.fullName }}</p>
              <p class="topbar-user-status">
                <span class="topbar-online"></span>
                Online
              </p>
            } @else {
              <a routerLink="/login" class="topbar-user-name">Iniciar sesión</a>
            }
          </div>
        </div>
      </div>
    </header>
  `,
  styles: `
    .topbar {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.85rem 1rem;
      border-bottom: 1px solid var(--color-border);
      background: color-mix(in srgb, var(--color-bg) 92%, transparent);
      backdrop-filter: blur(10px);
      position: sticky;
      top: 0;
      z-index: 20;
    }

    @media (min-width: 640px) {
      .topbar {
        padding: 0.85rem 1.25rem;
        gap: 1rem;
      }
    }

    .topbar-menu {
      border: 0;
      background: var(--color-surface-2);
      color: var(--color-text);
      border-radius: 0.5rem;
      width: 2.25rem;
      height: 2.25rem;
      cursor: pointer;
      flex-shrink: 0;
    }

    .topbar-search {
      position: relative;
      flex: 1;
      min-width: 0;
    }

    .topbar-search-icon {
      position: absolute;
      left: 0.85rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--color-text-muted);
      pointer-events: none;
    }

    .topbar-search-input {
      width: 100%;
      border: 1px solid var(--color-border);
      border-radius: 999px;
      background: var(--color-surface-2);
      color: var(--color-text);
      padding: 0.65rem 1rem 0.65rem 2.25rem;
      font-size: 0.9rem;
      outline: none;
    }

    .topbar-search-input:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 22%, transparent),
        0 0 18px color-mix(in srgb, var(--color-primary) 25%, transparent);
    }

    .topbar-search-input::placeholder {
      color: var(--color-text-muted);
    }

    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      flex-shrink: 0;
    }

    .topbar-icon-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      border: 0;
      border-radius: 0.55rem;
      background: transparent;
      color: var(--color-accent);
      font-size: 1.05rem;
      cursor: pointer;
      transition: box-shadow 160ms ease, transform 160ms ease;
    }

    .topbar-icon-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 0 16px color-mix(in srgb, var(--color-accent) 40%, transparent);
    }

    .topbar-badge {
      position: absolute;
      top: -0.15rem;
      right: -0.15rem;
      min-width: 1rem;
      height: 1rem;
      border-radius: 999px;
      background: var(--color-accent);
      color: #04120a;
      font-size: 0.65rem;
      font-weight: 700;
      display: grid;
      place-items: center;
      padding: 0 0.2rem;
    }

    .topbar-user {
      display: none;
      align-items: center;
      gap: 0.5rem;
      margin-left: 0.25rem;
      padding-left: 0.5rem;
      border-left: 1px solid var(--color-border);
    }

    @media (min-width: 640px) {
      .topbar-user {
        display: flex;
      }
    }

    .topbar-avatar {
      display: grid;
      place-items: center;
      width: 2rem;
      height: 2rem;
      border-radius: 999px;
      background: var(--color-surface-2);
      border: 1px solid var(--color-border);
      color: var(--color-text-muted);
    }

    .topbar-user-name {
      margin: 0;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--color-text);
      max-width: 8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .topbar-user-status {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size: 0.7rem;
      color: var(--color-text-muted);
    }

    .topbar-online {
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 999px;
      background: var(--color-accent);
    }
  `,
})
export class TopbarComponent {
  @Output() readonly menuToggle = new EventEmitter<void>();

  readonly cart = inject(CartService);
  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  query = '';

  search(): void {
    const q = this.query.trim();
    void this.router.navigate(['/catalog'], {
      queryParams: q ? { q } : {},
    });
  }
}
