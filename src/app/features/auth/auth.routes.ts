import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const AUTH_ROUTES: Routes = [
  { path: '', component: LoginPageComponent },
];

export const LOGIN_ROUTES: Routes = [
  { path: '', component: LoginPageComponent },
];

export const REGISTER_ROUTES: Routes = [
  { path: '', component: RegisterPageComponent },
];
