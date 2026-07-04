import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.REGISTER_ROUTES),
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        data: { animation: 'landing' },
        loadChildren: () =>
          import('./features/landing/landing.routes').then((m) => m.LANDING_ROUTES),
      },
      {
        path: 'catalog',
        data: { animation: 'catalog' },
        loadChildren: () =>
          import('./features/catalog/catalog.routes').then((m) => m.CATALOG_ROUTES),
      },
      {
        path: 'product/:id',
        data: { animation: 'product' },
        loadChildren: () =>
          import('./features/product-detail/product-detail.routes').then(
            (m) => m.PRODUCT_DETAIL_ROUTES
          ),
      },
      {
        path: 'checkout',
        data: { animation: 'checkout' },
        loadChildren: () =>
          import('./features/checkout/checkout.routes').then((m) => m.CHECKOUT_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
