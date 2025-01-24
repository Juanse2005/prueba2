import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ConjuntosComponent } from "./conjuntos/conjuntos.component";



const roters: Routes =[
    {
        path: '',
        component: ConjuntosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class ConjuntosRoutingModule {}