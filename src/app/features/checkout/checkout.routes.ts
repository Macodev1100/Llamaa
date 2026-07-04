import { Routes } from '@angular/router';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { OrderConfirmationPageComponent } from './pages/order-confirmation-page/order-confirmation-page.component';

export const CHECKOUT_ROUTES: Routes = [
  { path: '', component: CheckoutPageComponent },
  { path: 'confirmation', component: OrderConfirmationPageComponent },
];
