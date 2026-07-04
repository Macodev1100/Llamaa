import { Component } from '@angular/core';

interface BenefitItem {
  icon: string;
  label: string;
  tone: 'green' | 'purple';
}

@Component({
  selector: 'app-category-showcase',
  standalone: true,
  template: `
    <section class="benefits">
      @for (item of benefits; track item.label) {
        <article class="benefit-card" [class.green]="item.tone === 'green'" [class.purple]="item.tone === 'purple'">
          <span class="benefit-icon">{{ item.icon }}</span>
          <p>{{ item.label }}</p>
        </article>
      }
    </section>
  `,
  styles: `
    .benefits {
      display: grid;
      gap: 0.75rem;
      padding: 1rem;
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 640px) {
      .benefits {
        padding: 1rem 1.25rem;
      }
    }

    @media (min-width: 900px) {
      .benefits {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .benefit-card {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      border-radius: 0.85rem;
      border: 1px solid var(--color-border);
      background: color-mix(in srgb, var(--color-surface) 88%, transparent);
      backdrop-filter: blur(8px);
      padding: 0.85rem 0.95rem;
      transition:
        border-color 180ms ease,
        box-shadow 180ms ease,
        transform 180ms ease;
    }

    .benefit-card:hover {
      transform: translateY(-2px);
    }

    .benefit-card.green:hover {
      border-color: color-mix(in srgb, var(--color-accent) 50%, var(--color-border));
      box-shadow: 0 0 22px color-mix(in srgb, var(--color-accent) 22%, transparent);
    }

    .benefit-card.purple:hover {
      border-color: color-mix(in srgb, var(--color-primary) 50%, var(--color-border));
      box-shadow: 0 0 22px color-mix(in srgb, var(--color-primary) 22%, transparent);
    }

    .benefit-icon {
      display: grid;
      place-items: center;
      width: 2.1rem;
      height: 2.1rem;
      border-radius: 0.55rem;
      font-size: 1rem;
      flex-shrink: 0;
      transition: box-shadow 180ms ease;
    }

    .benefit-card.green .benefit-icon {
      color: var(--color-accent);
      background: color-mix(in srgb, var(--color-accent) 15%, transparent);
    }

    .benefit-card.purple .benefit-icon {
      color: var(--color-primary-glow);
      background: color-mix(in srgb, var(--color-primary) 18%, transparent);
    }

    .benefit-card.green:hover .benefit-icon {
      box-shadow: 0 0 14px color-mix(in srgb, var(--color-accent) 45%, transparent);
    }

    .benefit-card.purple:hover .benefit-icon {
      box-shadow: 0 0 14px color-mix(in srgb, var(--color-primary) 45%, transparent);
    }

    .benefit-card p {
      margin: 0;
      font-size: 0.82rem;
      font-weight: 500;
      line-height: 1.25;
      color: var(--color-text);
    }
  `,
})
export class CategoryShowcaseComponent {
  readonly benefits: BenefitItem[] = [
    { icon: '🚚', label: 'Envíos a todo Cajamarca', tone: 'green' },
    { icon: '🛡', label: 'Productos Garantizados', tone: 'purple' },
    { icon: '🔒', label: 'Pagos 100% Seguros', tone: 'green' },
    { icon: '🎧', label: 'Atención Personalizada', tone: 'purple' },
  ];
}
