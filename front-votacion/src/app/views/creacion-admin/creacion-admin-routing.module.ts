import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CreacionAdminComponent } from "./creacion-admin/creacion-admin.component";


const roters: Routes =[
    {
        path: '',
        component: CreacionAdminComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class CreacionAdminRoutingModule {
 
}