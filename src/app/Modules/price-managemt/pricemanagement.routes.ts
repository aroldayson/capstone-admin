import { Routes } from "@angular/router";
import { MainPricemgtComponent } from "./main-pricemgt/main-pricemgt.component";
import { ViewPricemgtComponent } from "./view-pricemgt/view-pricemgt.component";
import { AddPriceComponent } from "./add-price/add-price.component";
import { UpdatePriceComponent } from "./update-price/update-price.component";
import { ViewcategeComponent } from "./viewcatege/viewcatege.component";
import { AddAddressComponent } from "./add-address/add-address.component";
import { ViewaddressComponent } from "./viewaddress/viewaddress.component";
import { UpdateAddressComponent } from "./update-address/update-address.component";

export const pricemanagementRoute: Routes = [
    {path: 'pricemgtmain', component: MainPricemgtComponent,
        children: [
            {path: 'viewcateg', component:ViewcategeComponent,
                children: [
                    {path: 'view-address', component: ViewaddressComponent},
                    {path: 'add-address', component: AddAddressComponent},
                    {path: 'update-address', component: UpdateAddressComponent},

                    {path: 'add', component: AddPriceComponent},
                    {path: 'update', component: UpdatePriceComponent},
                    {path: 'pricemgtview', component:ViewPricemgtComponent,
                        // children: [
                        //     {path: 'add', component: AddPriceComponent},
                        //     {path: 'update', component: UpdatePriceComponent},
                        //     {path: '', redirectTo: 'add', pathMatch: 'full'}
                        // ]
                    },
                    {path: '', redirectTo: 'pricemgtview', pathMatch: 'full'}
                ]
            },
            {path: '', redirectTo: 'viewcateg', pathMatch: 'full'}
        ]
    },
    // {path: 'pricemgtview', component:ViewPricemgtComponent},
    // {path: 'add', component: AddPriceComponent},
    // {path: 'update', component: UpdatePriceComponent},
    {path: '', redirectTo: 'pricemgtmain', pathMatch:'full'}
];