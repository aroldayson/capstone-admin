import { CanActivateFn, Router, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { accountRoute } from './Modules/account/account.routes';
import { dashboardRoute } from './Modules/dashboard/dashboard.routes';
import { pricemanagementRoute } from './Modules/price-managemt/pricemanagement.routes';
import { reportRoute } from './Modules/report/report.routes';
import { staffRoute } from './Modules/staff/staff.routes';
import { transactionRoute } from './Modules/transaction/transaction.routes';
import { customerRoute } from './Modules/customer/customer.routes';
import { authGuard } from './auth.guard'; // Adjust the path as needed

export const routes: Routes = [
  {
    path: 'main',
    component: SidenavComponent,
    canActivate: [authGuard], // Protect the 'main' route with the auth guard
    children: [
      {
        path: 'dashboardpage',
        loadChildren: () => import('./Modules/dashboard/dashboard.routes').then(r => dashboardRoute),
        canActivate: [authGuard], // Apply guard to the child route as well
      },
      {
        path: 'tansactionpage',
        loadChildren: () => import('./Modules/transaction/transaction.routes').then(r => transactionRoute),
        canActivate: [authGuard],
      },
      {
        path: 'pricemanagementpage',
        loadChildren: () => import('./Modules/price-managemt/pricemanagement.routes').then(r => pricemanagementRoute),
        canActivate: [authGuard],
      },
      {
        path: 'reportpage',
        loadChildren: () => import('./Modules/report/report.routes').then(r => reportRoute),
        canActivate: [authGuard],
      },
      {
        path: 'customertpage',
        loadChildren: () => import('./Modules/customer/customer.routes').then(r => customerRoute),
        canActivate: [authGuard],
      },
      {
        path: 'staffpage',
        loadChildren: () => import('./Modules/staff/staff.routes').then(r => staffRoute),
        canActivate: [authGuard],
      },
      {
        path: 'accountpage',
        loadChildren: () => import('./Modules/account/account.routes').then(r => accountRoute),
        canActivate: [authGuard],
      },
      { path: '', redirectTo: 'dashboardpage', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: LoginComponent}, // No auth guard for the login page
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

