import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { routeAnimations } from '../../shared/animations/route.animations';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  animations: [routeAnimations],
  template: `
    <div class="flex min-h-screen flex-col bg-bg text-ink">
      <app-header />
      <main
        class="relative min-h-[70vh] flex-1 overflow-x-clip"
        [@routeAnimations]="prepareRoute(outlet)"
      >
        <router-outlet #outlet="outlet" />
      </main>
      <app-footer />
    </div>
  `,
})
export class MainLayoutComponent {
  /**
   * Con lazy routes, `data.animation` vive en el padre (`catalog`, `product/:id`).
   * Recorremos el árbol activado para encontrarlo.
   */
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
