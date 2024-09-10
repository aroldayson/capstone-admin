import { Routes } from '@angular/router';
import { MainCustomerComponent } from './main-customer/main-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewHistoryComponent } from './view-history/view-history.component';
import { ViewHistorytransacComponent } from './view-historytransac/view-historytransac.component';

export const customerRoute: Routes = [
  {
    path: 'main',
    component: MainCustomerComponent,
    children: [
      { path: 'view', component: ViewCustomerComponent },
      { path: 'view-history', component: ViewHistoryComponent },
      { path: 'view-listtransac', component: ViewHistorytransacComponent },
      { path: '', redirectTo: 'view', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];
