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
import { ProductsComponent } from './pages/products/products.component';
import { AddOrdersComponent } from './pages/add-orders/add-orders.component';
import { ViewOrderComponent } from './pages/view-order/view-order.component';
import { EditOrderComponent } from './pages/edit-order/edit-order.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';

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
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'order-success/:id',
        component: OrderSuccessComponent
      },
      {
        path: 'order-success',
        component: OrderSuccessComponent
      }
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
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'add-order',
        component: AddOrdersComponent
      },
      {
        path: 'view-order/:id',
        component: ViewOrderComponent
      },
      {
        path: 'edit-order/:id',
        component: EditOrderComponent
      },
      {
        path: 'edit-product/:id',
        component: EditProductComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
