import { Routes } from "@angular/router";
import { MainTransactionComponent } from "./main-transaction/main-transaction.component";
import { ViewTransactionComponent } from "./view-transaction/view-transaction.component";

export const transactionRoute: Routes = [
    {path:"main",component:MainTransactionComponent,
        children: [
            {path: "view-tran",component: ViewTransactionComponent},
            {path:"",redirectTo:"view-tran",pathMatch:"full"}
        ]
    },
    {path:"",redirectTo:"main",pathMatch:"full"}
];