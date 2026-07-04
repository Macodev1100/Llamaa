import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price-tag',
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <span class="price-text" [class]="sizeClass">
      S/ {{ price | number: '1.2-2' }}
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
