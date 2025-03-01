import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard, loggedInGuard } from './guards/auth.guard';
import { adminGuard } from './services/auth.service';

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
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard] 
      }
    ],
  },
  {
    path: '**',
    redirectTo: ''
  }
];
