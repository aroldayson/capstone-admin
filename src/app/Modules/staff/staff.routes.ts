import { Routes } from "@angular/router";
import { MainStaffComponent } from "./main-staff/main-staff.component";
import { ViewStaffComponent } from "./view-staff/view-staff.component";
import { AddStaffComponent } from "./add-staff/add-staff.component";
import { UploadStaffComponent } from "./upload-staff/upload-staff.component";
import { UpdateStaffComponent } from "./update-staff/update-staff.component";

export const staffRoute: Routes = [
    {path: 'staffmain', component: MainStaffComponent},
    {path: 'staffview', component:ViewStaffComponent},
        // children: [
        //     {path: 'staffview', component:ViewStaffComponent,
        //         children: [
        //             {path: 'addstaff', component:AddStaffComponent},
        //             {path: 'upload',component:UploadStaffComponent},
        //             {path: 'update', component:UpdateStaffComponent},
        //             {path: '', redirectTo: 'addstaff', pathMatch: 'full'}
        //         ]
        //     },
        //     {path: '', redirectTo: 'staffview', pathMatch: 'full'}
        // ]},
    {path: 'addstaff', component:AddStaffComponent},
    {path: 'upload',component:UploadStaffComponent},
    {path: 'update', component:UpdateStaffComponent},
    {path: '', redirectTo: 'staffview', pathMatch:'full'}
];