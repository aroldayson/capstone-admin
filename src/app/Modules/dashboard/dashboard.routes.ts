import { Routes } from "@angular/router";
import { MainDashComponent } from "./main-dash/main-dash.component";
import { ViewDashComponent } from "./view-dash/view-dash.component";


export const dashboardRoute: Routes = [
    {path: 'dashboardmain', component: MainDashComponent,
        children: [
            {path: 'dashboardview', component:ViewDashComponent},
           
            {path: '', redirectTo: 'dashboardview', pathMatch: 'full'}
        ]},
    {path: '', redirectTo: 'dashboardmain', pathMatch:'full'}
];