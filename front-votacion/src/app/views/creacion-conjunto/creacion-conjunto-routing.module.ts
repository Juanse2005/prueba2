import { Routes, RouterModule } from "@angular/router";
import { CreacionConjuntoComponent } from "./creacion-conjunto/creacion-conjunto.component";
import { NgModule } from "@angular/core";


const roters: Routes =[
    {
        path: '',
        component: CreacionConjuntoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class CreacionConjuntoRoutingModule {}