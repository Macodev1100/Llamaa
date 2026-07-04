import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { routeAnimations } from '../../shared/animations/route.animations';
import { NeonAmbientComponent } from '../../shared/components/neon-ambient/neon-ambient.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, NeonAmbientComponent],
  animations: [routeAnimations],
  template: `
    <div class="layout">
      <app-neon-ambient />

      <app-sidebar [open]="sidebarOpen()" (closed)="sidebarOpen.set(false)" />

      <div class="layout-main">
        <app-topbar (menuToggle)="toggleSidebar()" />
        <main
          class="layout-content"
          [@routeAnimations]="prepareRoute(outlet)"
        >
          <router-outlet #outlet="outlet" />
        </main>
      </div>
    </div>
  `,
  styles: `
    .layout {
      position: relative;
      display: flex;
      min-height: 100svh;
      background: var(--color-bg);
      color: var(--color-text);
      overflow: clip;
    }

    .layout-main {
      position: relative;
      z-index: 1;
      display: flex;
      min-width: 0;
      flex: 1;
      flex-direction: column;
    }

    .layout-content {
      flex: 1;
      overflow-x: clip;
    }

    :host ::ng-deep app-sidebar .sidebar {
      z-index: 40;
      background: color-mix(in srgb, var(--color-surface) 92%, transparent);
      backdrop-filter: blur(12px);
      box-shadow: 1px 0 24px color-mix(in srgb, var(--color-primary) 12%, transparent);
    }
  `,
})
export class MainLayoutComponent {
  readonly sidebarOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  prepareRoute(outlet: RouterOutlet): string | undefined {
    if (!outlet?.isActivated) {
      return undefined;
    }

    let route: ActivatedRoute | null = outlet.activatedRoute;
    while (route) {
      const animation = route.snapshot.data['animation'] as string | undefined;
      if (animation) {
        return animation;
      }
      route = route.parent;
    }

    return undefined;
  }
}
