import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="card-surface mx-auto max-w-lg px-8 py-12 text-center">
      <div class="mb-4 text-4xl">{{ icon }}</div>
      <h2 class="section-title mb-2 text-xl">{{ title }}</h2>
      <p class="mb-6 text-ink-muted">{{ message }}</p>
      @if (actionLabel && actionLink) {
        <a [routerLink]="actionLink" class="btn-primary">{{ actionLabel }}</a>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() icon = '🎮';
  @Input({ required: true }) title!: string;
  @Input({ required: true }) message!: string;
  @Input() actionLabel?: string;
  @Input() actionLink?: string;
}
