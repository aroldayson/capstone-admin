import { Routes } from '@angular/router';
import { MainTransactionComponent } from './main-transaction/main-transaction.component';
import { ViewTransactionComponent } from './view-transaction/view-transaction.component';
import { TransacPaidComponent } from './transac-paid/transac-paid.component';
import { TransacUnpaidComponent } from './transac-unpaid/transac-unpaid.component';
import { ViewReceiptComponent } from './view-receipt/view-receipt.component';
import { ViewExpenseComponent } from './view-expense/view-expense.component';
import { ViewRemitComponent } from './view-remit/view-remit.component';
import { ViewHisRemitComponent } from './view-his-remit/view-his-remit.component';
import { TransactionhistoryComponent } from './transactionhistory/transactionhistory.component';
import { ExpenseshistoryComponent } from './expenseshistory/expenseshistory.component';
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
          { path: 'expensesview', component: ViewExpenseComponent },
          { path: 'remittanceview', component: ViewRemitComponent },
          { path: 'viewremit-his', component: ViewHisRemitComponent },
          { path: 'alltransaction', component: TransactionhistoryComponent },
          { path: 'allexpenses', component: ExpenseshistoryComponent },
          { path: '', redirectTo: 'view-paid', pathMatch: 'full' },
        ],
      },
      { path: '', redirectTo: 'view-tran', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];
