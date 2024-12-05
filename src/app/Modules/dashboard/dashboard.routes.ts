import { Routes } from "@angular/router";
import { MainDashComponent } from "./main-dash/main-dash.component";
import { ViewDashComponent } from "./view-dash/view-dash.component";
import { CashdetailsComponent } from "./cashdetails/cashdetails.component";
import { RemitComponent } from "./remit/remit.component";
import { ViewDetailsComponent } from "./view-details/view-details.component";
import { CashregisterComponent } from "./cashregister/cashregister.component";


export const dashboardRoute: Routes = [
    {path: 'dashboardmain', component: MainDashComponent,
        children: [
            {path: 'dashboardview', component:ViewDashComponent,
                children: [
                    {path: 'cashdetails',component:CashdetailsComponent},
                    {path: 'remit',component:RemitComponent},
                    {path: 'details', component:ViewDetailsComponent},
                    {path: 'cashregister',component:CashregisterComponent},
                    {path: '', redirectTo: 'cashdetails', pathMatch: 'full'}
                ]
            },
            {path: '', redirectTo: 'dashboardview', pathMatch: 'full'}
        ]},
    {path: '', redirectTo: 'dashboardmain', pathMatch:'full'}
];