import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard, loggedInGuard } from './guards/auth.guard';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { EarningsComponent } from './pages/earnings/earnings.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [loggedInGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [loggedInGuard]
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'earnings',
        component: EarningsComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
