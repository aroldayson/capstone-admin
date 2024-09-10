import { Routes } from '@angular/router';
import { MainTransactionComponent } from './main-transaction/main-transaction.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { TransacPaidComponent } from './transac-paid/transac-paid.component';
import { TransacUnpaidComponent } from './transac-unpaid/transac-unpaid.component';
import { ViewReceiptComponent } from './view-receipt/view-receipt.component';

export const transactionRoute: Routes = [
  {
    path: 'main',
    component: MainTransactionComponent,
    children: [
      {
        path: 'view-tran',
        component: ViewTransactionComponent,
        children: [
          { path: 'view-paid', component: TransacPaidComponent },
          { path: 'view-unpaid', component: TransacUnpaidComponent },
          { path: 'view-receipt', component: ViewReceiptComponent },
          { path: '', redirectTo: 'view-paid', pathMatch: 'full' },
        ],
      },
      { path: '', redirectTo: 'view-tran', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];
