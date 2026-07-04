import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../../core/cart/cart.service';
import { QuantitySelectorComponent } from '../../../../shared/components/quantity-selector/quantity-selector.component';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [DecimalPipe, QuantitySelectorComponent],
  template: `
    <div class="summary">
      <h2>Resumen de tu compra</h2>

      <ul class="summary-list">
        @for (item of cart.items(); track item.product.id) {
          <li class="summary-item">
            <img
              [src]="item.product.image"
              [alt]="item.product.name"
            />
            <div class="summary-item-info">
              <p class="summary-item-name">{{ item.product.name }}</p>
              <p class="summary-item-price">
                S/ {{ item.product.price | number: '1.2-2' }}
              </p>
              <app-quantity-selector
                [value]="item.quantity"
                [max]="item.product.stock"
                (valueChange)="cart.updateQuantity(item.product.id, $event)"
              />
            </div>
            <button
              type="button"
              class="summary-remove"
              (click)="cart.remove(item.product.id)"
            >
              Quitar
            </button>
          </li>
        }
      </ul>

      <div class="summary-totals">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>S/ {{ cart.total() | number: '1.2-2' }}</span>
        </div>
        <div class="summary-row">
          <span>Envío</span>
          <span>S/ {{ shipping | number: '1.2-2' }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span class="price-text">S/ {{ grandTotal() | number: '1.2-2' }}</span>
        </div>
      </div>
    </div>
  `,
  styles: `
    .summary {
      border-radius: 0.9rem;
      border: 1px solid var(--color-border);
      background: var(--color-surface);
      overflow: hidden;
    }

    .summary h2 {
      margin: 0;
      padding: 1rem 1.1rem;
      border-bottom: 1px solid var(--color-border);
      font-size: 1.05rem;
      font-weight: 600;
    }

    .summary-list {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .summary-item {
      display: grid;
      grid-template-columns: 4rem 1fr auto;
      gap: 0.75rem;
      align-items: start;
      padding: 1rem 1.1rem;
      border-bottom: 1px solid var(--color-border);
    }

    .summary-item img {
      width: 4rem;
      height: 4rem;
      border-radius: 0.5rem;
      object-fit: cover;
    }

    .summary-item-name {
      margin: 0 0 0.25rem;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .summary-item-price {
      margin: 0 0 0.45rem;
      font-size: 0.85rem;
      color: var(--color-accent);
      font-weight: 600;
    }

    .summary-remove {
      border: 0;
      background: transparent;
      color: var(--color-danger);
      font-size: 0.8rem;
      cursor: pointer;
      padding: 0;
    }

    .summary-totals {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      padding: 1rem 1.1rem 1.15rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      font-size: 0.9rem;
      color: var(--color-text-muted);
    }

    .summary-row.total {
      margin-top: 0.35rem;
      padding-top: 0.55rem;
      border-top: 1px solid var(--color-border);
      color: var(--color-text);
      font-weight: 600;
      font-size: 1rem;
    }
  `,
})
export class CartSummaryComponent {
  readonly cart = inject(CartService);
  readonly shipping = 5;

  readonly grandTotal = computed(() => this.cart.total() + this.shipping);
}
