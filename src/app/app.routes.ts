import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { PageComponent } from './page/page.component';
import { AuthGuard } from './guard/auth.guard';
import { UsersComponent } from './page/users/users.component';
import { userResolver } from './@resolver/user.resolver';

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
    path: 'page',
    component: PageComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'user',
        component: UsersComponent,
        resolve: {
          users: userResolver
        }
      }
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
