import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [AuthFormComponent, RouterLink],
  template: `
    <section class="mx-auto flex max-w-lg flex-col px-4 py-12 sm:px-6 sm:py-16">
      <div class="mb-8 text-center">
        <p class="mb-2 text-sm uppercase tracking-[0.22em] text-brand-accent">
          Acceso seguro
        </p>
        <h1 class="section-title">Tu cuenta Rydex</h1>
        <p class="mt-2 text-sm text-ink-muted">
          Inicia sesión o regístrate para un checkout más rápido y pedidos guardados.
        </p>
      </div>

      <app-auth-form />

      <a
        routerLink="/catalog"
        class="mt-6 text-center text-sm text-brand-glow transition hover:underline"
      >
        ← Continuar comprando
      </a>
    </section>
  `,
})
export class AuthPageComponent {}
