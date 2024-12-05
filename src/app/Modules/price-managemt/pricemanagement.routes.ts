import { Routes } from "@angular/router";
import { MainPricemgtComponent } from "./main-pricemgt/main-pricemgt.component";
import { ViewPricemgtComponent } from "./view-pricemgt/view-pricemgt.component";
import { AddPriceComponent } from "./add-price/add-price.component";
import { UpdatePriceComponent } from "./update-price/update-price.component";

export const pricemanagementRoute: Routes = [
    {path: 'pricemgtmain', component: MainPricemgtComponent},
        // children: [
        //     {path: 'pricemgtview', component:ViewPricemgtComponent,
        //         children: [
        //             {path: 'add', component: AddPriceComponent},
        //             {path: 'update', component: UpdatePriceComponent},
        //             {path: '', redirectTo: 'add', pathMatch: 'full'}
        //         ]
        //     },
        //     {path: '', redirectTo: 'pricemgtview', pathMatch: 'full'}
        // ]},
    {path: 'pricemgtview', component:ViewPricemgtComponent},
    {path: 'add', component: AddPriceComponent},
    {path: 'update', component: UpdatePriceComponent},
    {path: '', redirectTo: 'pricemgtview', pathMatch:'full'}
];