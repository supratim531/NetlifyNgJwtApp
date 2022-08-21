import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeListComponent } from './component/employee-list/employee-list.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NoPageComponent } from './component/no-page/no-page.component';
import { RegisterComponent } from './component/register/register.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { DeauthGuard } from './guard/deauth/deauth.guard';
import { AdminGuard } from './guard/role/admin.guard';

const application = 'JWT Authentication';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: `Home | ${application}`
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [DeauthGuard],
    data: {
      title: `Login | ${application}`
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [DeauthGuard],
    data: {
      title: `Register | ${application}`
    }
  },
  {
    path: 'all-users',
    component: UserListComponent,
    canActivate: [AuthGuard, AdminGuard],
    data: {
      title: `All Users | ${application}`
    }
  },
  {
    path: 'all-employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
    data: {
      title: `All Employees | ${application}`
    }
  },
  {
    path: '**',
    component: NoPageComponent,
    data: {
      title: `404 Not Found | ${application}`
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
