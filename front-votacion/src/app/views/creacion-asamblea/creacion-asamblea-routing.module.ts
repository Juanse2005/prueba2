import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CreacionAsambleaComponent } from "./creacion-asamblea/creacion-asamblea.component";


const roters: Routes =[
    {
        path: '',
        component: CreacionAsambleaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class CreacionAsambleaRoutingModule {}