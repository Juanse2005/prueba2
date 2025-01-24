import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { UsuariosComponent } from "./usuarios/usuarios.component";


const roters: Routes =[
    {
        path: '',
        component:  UsuariosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule {}