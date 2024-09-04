import { Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { accountRoute } from './Modules/account/account.routes';
import { dashboardRoute } from './Modules/dashboard/dashboard.routes';
import { pricemanagementRoute } from './Modules/price-managemt/pricemanagement.routes';
import { reportRoute } from './Modules/report/report.routes';
import { staffRoute } from './Modules/staff/staff.routes';
import { transactionRoute } from './Modules/transaction/transaction.routes';
import { customerRoute } from './Modules/customer/customer.routes';

export const routes: Routes = [
    {path: 'main', component: SidenavComponent,
        children: [
            {
                path: 'dashboardpage',
                loadChildren: () => import('./Modules/dashboard/dashboard.routes').then(r=>dashboardRoute)
            },
            {
                path: 'tansactionpage',
                loadChildren: () => import('./Modules/transaction/transaction.routes').then(r=>transactionRoute)
            },
            {
                path: 'pricemanagementpage',
                loadChildren: () => import('./Modules/price-managemt/pricemanagement.routes').then(r=>pricemanagementRoute)
            },
            {
                path: 'reportpage',
                loadChildren: () => import('./Modules/report/report.routes').then(r=>reportRoute)
            },
            {
                path: 'customertpage',
                loadChildren: () => import('./Modules/customer/customer.routes').then(r=>customerRoute)
            },
            {
                path: 'staffpage',
                loadChildren: () => import('./Modules/staff/staff.routes').then(r=>staffRoute)
            },
            {
                path: 'accountpage',
                loadChildren: () => import('./Modules/account/account.routes').then(r=>accountRoute)
            },
            {path: '', redirectTo: 'dashboardpage', pathMatch: 'full'}
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'}
];
