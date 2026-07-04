import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  template: `
    <div class="inline-flex items-center rounded-lg border border-border bg-surface-2">
      <button
        type="button"
        class="px-3 py-1.5 text-ink-muted transition hover:text-brand"
        (click)="change(-1)"
        [disabled]="value <= min"
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <span class="min-w-8 px-2 text-center font-medium">{{ value }}</span>
      <button
        type="button"
        class="px-3 py-1.5 text-ink-muted transition hover:text-brand"
        (click)="change(1)"
        [disabled]="value >= max"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  `,
})
export class QuantitySelectorComponent {
  @Input() value = 1;
  @Input() min = 1;
  @Input() max = 99;
  @Output() valueChange = new EventEmitter<number>();

  change(delta: number): void {
    const next = Math.min(this.max, Math.max(this.min, this.value + delta));
    if (next !== this.value) {
      this.valueChange.emit(next);
    }
  }
}
