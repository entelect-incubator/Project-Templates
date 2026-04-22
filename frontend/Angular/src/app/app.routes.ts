import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'menu',
    loadComponent: () =>
      import('./features/pizza-menu/pizza-menu.component').then((m) => m.PizzaMenuComponent),
  },
  {
    path: 'order',
    loadComponent: () =>
      import('./features/order/pages/order-page.component').then((m) => m.OrderPageComponent),
  },
  { path: '', pathMatch: 'full', redirectTo: 'menu' },
];
