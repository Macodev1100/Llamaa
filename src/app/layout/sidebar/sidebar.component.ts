import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { BrandLogoComponent } from '../../shared/components/brand-logo/brand-logo.component';

interface NavItem {
  label: string;
  link: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BrandLogoComponent],
  template: `
    <aside class="sidebar" [class.sidebar-open]="open">
      <div class="sidebar-brand">
        <app-brand-logo [compact]="true" />
        <button
          type="button"
          class="sidebar-close md:hidden"
          (click)="closed.emit()"
          aria-label="Cerrar menú"
        >
          ✕
        </button>
      </div>

      <nav class="sidebar-nav" aria-label="Navegación principal">
        @for (item of navItems; track item.link + item.label) {
          <a
            [routerLink]="item.link"
            routerLinkActive="sidebar-link-active"
            [routerLinkActiveOptions]="{ exact: item.exact ?? false }"
            class="sidebar-link"
            (click)="closed.emit()"
          >
            <span class="sidebar-icon" [innerHTML]="item.icon"></span>
            <span>{{ item.label }}</span>
          </a>
        }
      </nav>

      <div class="sidebar-footer">
        @if (auth.isAuthenticated()) {
          <button type="button" class="sidebar-logout" (click)="logout()">
            <span class="sidebar-icon" aria-hidden="true">⎋</span>
            Cerrar Sesión
          </button>
        } @else {
          <a routerLink="/login" class="sidebar-logout sidebar-login" (click)="closed.emit()">
            <span class="sidebar-icon" aria-hidden="true">→</span>
            Iniciar sesión
          </a>
        }
      </div>
    </aside>

    @if (open) {
      <button
        type="button"
        class="sidebar-backdrop md:hidden"
        (click)="closed.emit()"
        aria-label="Cerrar menú"
      ></button>
    }
  `,
  styles: `
    .sidebar {
      position: fixed;
      inset: 0 auto 0 0;
      z-index: 40;
      display: flex;
      width: 15.5rem;
      flex-direction: column;
      background: var(--color-surface);
      border-right: 1px solid var(--color-border);
      transform: translateX(-100%);
      transition: transform 220ms ease;
    }

    .sidebar-open {
      transform: translateX(0);
    }

    @media (min-width: 768px) {
      .sidebar {
        position: sticky;
        top: 0;
        height: 100svh;
        transform: none;
      }
    }

    .sidebar-brand {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      padding: 1.1rem 1rem;
      border-bottom: 1px solid var(--color-border);
    }

    .sidebar-close {
      border: 0;
      background: transparent;
      color: var(--color-text-muted);
      font-size: 1rem;
      cursor: pointer;
    }

    .sidebar-nav {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 0.25rem;
      padding: 1rem 0.75rem;
      overflow-y: auto;
    }

    .sidebar-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-radius: 0.65rem;
      padding: 0.7rem 0.85rem;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-text-muted);
      transition:
        background 160ms ease,
        color 160ms ease,
        box-shadow 160ms ease,
        transform 160ms ease;
    }

    .sidebar-link:hover {
      color: var(--color-text);
      background: color-mix(in srgb, var(--color-primary) 14%, var(--color-surface-2));
      box-shadow: 0 0 16px color-mix(in srgb, var(--color-primary) 18%, transparent);
    }

    .sidebar-link-active {
      color: #fff !important;
      background: var(--color-primary) !important;
      box-shadow:
        0 0 18px color-mix(in srgb, var(--color-primary) 45%, transparent),
        inset 0 0 12px color-mix(in srgb, #fff 10%, transparent) !important;
    }

    .sidebar-icon {
      display: inline-flex;
      width: 1.15rem;
      justify-content: center;
      font-size: 0.95rem;
      opacity: 0.9;
    }

    .sidebar-footer {
      padding: 0.75rem;
      border-top: 1px solid var(--color-border);
    }

    .sidebar-logout {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 0.75rem;
      border: 0;
      border-radius: 0.65rem;
      background: transparent;
      padding: 0.7rem 0.85rem;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-danger);
      cursor: pointer;
      text-align: left;
    }

    .sidebar-login {
      color: var(--color-accent);
    }

    .sidebar-backdrop {
      position: fixed;
      inset: 0;
      z-index: 30;
      border: 0;
      background: rgb(0 0 0 / 0.55);
      cursor: pointer;
    }
  `,
})
export class SidebarComponent {
  @Input() open = false;
  @Output() readonly closed = new EventEmitter<void>();

  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly navItems: NavItem[] = [
    { label: 'Inicio', link: '/', icon: '⌂', exact: true },
    { label: 'Productos', link: '/catalog', icon: '▣' },
    { label: 'Categorías', link: '/catalog', icon: '▦' },
    { label: 'Mis Compras', link: '/checkout', icon: '🛒' },
    { label: 'Favoritos', link: '/catalog', icon: '♡' },
    { label: 'Mensajes', link: '/', icon: '✉' },
    { label: 'Mi Cuenta', link: '/login', icon: '☺' },
    { label: 'Configuración', link: '/', icon: '⚙' },
  ];

  logout(): void {
    this.auth.logout();
    this.closed.emit();
    void this.router.navigate(['/login']);
  }
}
