import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PreguntasAdComponent } from "./preguntas-ad/preguntas-ad.component";


const roters: Routes =[
    {
        path: '',
        component:  PreguntasAdComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class PreguntasAdRoutingModule {}