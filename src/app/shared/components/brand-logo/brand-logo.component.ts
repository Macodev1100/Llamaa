import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="link"
      class="brand-logo"
      [class.brand-logo-stack]="stacked"
      [class.brand-logo-compact]="compact"
    >
      <img src="/assets/logo.jpeg" alt="Rydex Store Industries" class="brand-logo-img" />
    </a>
  `,
  styles: `
    .brand-logo {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }

    .brand-logo-img {
      display: block;
      width: 9.5rem;
      height: auto;
      object-fit: contain;
    }

    .brand-logo-compact .brand-logo-img {
      width: 8.5rem;
    }

    .brand-logo-stack .brand-logo-img {
      width: min(14rem, 70vw);
    }
  `,
})
export class BrandLogoComponent {
  @Input() link = '/';
  @Input() stacked = false;
  @Input() compact = false;
}
