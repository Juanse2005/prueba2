import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AdministradoresComponent } from "./administradores/administradores.component";




const roters: Routes = [
    {
        path: '',
        component: AdministradoresComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class AdministradoresRoutingModule { }