import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../../../core/cart/cart.service';
import { PriceTagComponent } from '../../../../shared/components/price-tag/price-tag.component';
import { QuantitySelectorComponent } from '../../../../shared/components/quantity-selector/quantity-selector.component';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CurrencyPipe, PriceTagComponent, QuantitySelectorComponent],
  template: `
    <div class="card-surface overflow-hidden">
      <h2 class="border-b border-border px-5 py-4 font-display text-lg">Resumen del carrito</h2>

      <ul class="divide-y divide-border">
        @for (item of cart.items(); track item.product.id) {
          <li class="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-3">
              <img
                [src]="item.product.image"
                [alt]="item.product.name"
                class="h-14 w-14 rounded-lg object-cover"
              />
              <div>
                <p class="font-medium">{{ item.product.name }}</p>
                <p class="text-sm text-ink-muted">
                  {{ item.product.price | currency: 'USD':'symbol':'1.2-2' }} c/u
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <app-quantity-selector
                [value]="item.quantity"
                [max]="item.product.stock"
                (valueChange)="cart.updateQuantity(item.product.id, $event)"
              />
              <button
                type="button"
                class="text-sm text-danger hover:underline"
                (click)="cart.remove(item.product.id)"
              >
                Quitar
              </button>
            </div>
          </li>
        }
      </ul>

      <div class="flex items-center justify-between border-t border-border px-5 py-4">
        <span class="text-ink-muted">Total</span>
        <app-price-tag [price]="cart.total()" size="lg" />
      </div>
    </div>
  `,
})
export class CartSummaryComponent {
  readonly cart = inject(CartService);
}
