import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { EdicionUsuarioComponent } from "./edicion-usuario/edicion-usuario.component";

const roters: Routes =[
    {
        path: '',
        component:  EdicionUsuarioComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class EdicionUsuarioRoutingModule {}