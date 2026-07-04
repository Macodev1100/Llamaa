import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

/**
 * Transiciones de página vía Router.
 * Usa `data: { animation: 'catalog' | 'product' | ... }` en las rutas.
 */
export const routeAnimations = trigger('routeAnimations', [
  transition('catalog => product', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        width: '100%',
      }),
      { optional: true }
    ),
    group([
      query(
        ':leave',
        [
          animate(
            '320ms cubic-bezier(0.22, 1, 0.36, 1)',
            style({ opacity: 0, transform: 'translateX(-28px) scale(0.98)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateX(36px) scale(0.98)' }),
          animate(
            '420ms 40ms cubic-bezier(0.22, 1, 0.36, 1)',
            style({ opacity: 1, transform: 'translateX(0) scale(1)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),

  transition('product => catalog', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      style({
        position: 'absolute',
        left: 0,
        right: 0,
        width: '100%',
      }),
      { optional: true }
    ),
    group([
      query(
        ':leave',
        [
          animate(
            '320ms cubic-bezier(0.22, 1, 0.36, 1)',
            style({ opacity: 0, transform: 'translateX(28px) scale(0.98)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateX(-36px) scale(0.98)' }),
          animate(
            '420ms 40ms cubic-bezier(0.22, 1, 0.36, 1)',
            style({ opacity: 1, transform: 'translateX(0) scale(1)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),

  // Resto de navegaciones: fade suave
  transition('* <=> *', [
    query(
      ':enter, :leave',
      style({ position: 'absolute', left: 0, right: 0, width: '100%' }),
      { optional: true }
    ),
    group([
      query(
        ':leave',
        [animate('220ms ease', style({ opacity: 0 }))],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({ opacity: 0 }),
          animate('280ms 60ms ease', style({ opacity: 1 })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
