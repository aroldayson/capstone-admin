import { Routes } from "@angular/router";
import { MainDashComponent } from "./main-dash/main-dash.component";
import { ViewDashComponent } from "./view-dash/view-dash.component";
import { ViewExpenseComponent } from "./view-expense/view-expense.component";
import { ViewRemitComponent } from "./view-remit/view-remit.component";

export const dashboardRoute: Routes = [
    {path: 'dashboardmain', component: MainDashComponent,
        children: [
            {path: 'dashboardview', component:ViewDashComponent},
            {path: 'expensesview', component:ViewExpenseComponent},
            {path: 'remittanceview', component:ViewRemitComponent},
            {path: '', redirectTo: 'dashboardview', pathMatch: 'full'}
        ]},
    {path: '', redirectTo: 'dashboardmain', pathMatch:'full'}
];