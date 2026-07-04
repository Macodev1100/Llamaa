import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

/** Pulso al clic (botones Comprar / CTA). */
export const pulseClick = trigger('pulseClick', [
  transition('idle => active', [
    animate(
      '420ms cubic-bezier(0.22, 1, 0.36, 1)',
      keyframes([
        style({ transform: 'scale(1)', offset: 0 }),
        style({ transform: 'scale(0.94)', offset: 0.35 }),
        style({ transform: 'scale(1.04)', offset: 0.7 }),
        style({ transform: 'scale(1)', offset: 1 }),
      ])
    ),
  ]),
]);

/** Sacudida / pulso de error en formularios. */
export const formErrorShake = trigger('formErrorShake', [
  transition('idle => error', [
    animate(
      '480ms ease-in-out',
      keyframes([
        style({ transform: 'translateX(0)', offset: 0 }),
        style({ transform: 'translateX(-10px)', offset: 0.15 }),
        style({ transform: 'translateX(10px)', offset: 0.3 }),
        style({ transform: 'translateX(-8px)', offset: 0.45 }),
        style({ transform: 'translateX(8px)', offset: 0.6 }),
        style({ transform: 'translateX(-4px)', offset: 0.75 }),
        style({ transform: 'translateX(4px)', offset: 0.9 }),
        style({ transform: 'translateX(0)', offset: 1 }),
      ])
    ),
  ]),
]);

/** Pulso de borde en inputs inválidos. */
export const fieldErrorPulse = trigger('fieldErrorPulse', [
  transition('idle => error', [
    animate(
      '500ms ease',
      keyframes([
        style({
          boxShadow: '0 0 0 0 color-mix(in srgb, var(--color-danger) 0%, transparent)',
          offset: 0,
        }),
        style({
          boxShadow: '0 0 0 4px color-mix(in srgb, var(--color-danger) 35%, transparent)',
          offset: 0.4,
        }),
        style({
          boxShadow: '0 0 0 0 color-mix(in srgb, var(--color-danger) 0%, transparent)',
          offset: 1,
        }),
      ])
    ),
  ]),
]);
