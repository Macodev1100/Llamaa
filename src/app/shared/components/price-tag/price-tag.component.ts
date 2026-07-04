import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price-tag',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <span class="font-display font-semibold text-brand-glow" [class]="sizeClass">
      {{ price | currency: 'USD':'symbol':'1.2-2' }}
    </span>
  `,
})
export class PriceTagComponent {
  @Input({ required: true }) price!: number;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get sizeClass(): string {
    switch (this.size) {
      case 'sm':
        return 'text-sm';
      case 'lg':
        return 'text-2xl md:text-3xl';
      default:
        return 'text-lg';
    }
  }
}
