import { Routes } from "@angular/router";
import { MainCustomerComponent } from "./main-customer/main-customer.component";
import { ViewCustomerComponent } from "./view-customer/view-customer.component";

export const customerRoute: Routes = [
    {path:"main",component:MainCustomerComponent,
        children: [
            {path:"view",component:ViewCustomerComponent},
            {path:"",redirectTo:"view",pathMatch:"full"}
        ]
    },
    {path:"",redirectTo:"main",pathMatch:"full"}
];