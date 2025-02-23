import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '', component: HomeComponent
      },
    ],
  },
];
