import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { PageComponent } from './page/page.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: PageComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
