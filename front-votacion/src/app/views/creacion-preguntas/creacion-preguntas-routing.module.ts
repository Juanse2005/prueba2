import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CreacionPreguntasComponent } from "./creacion-preguntas/creacion-preguntas.component";

const roters: Routes =[
    {
        path: '',
        component: CreacionPreguntasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class CreacionPreguntasRoutingModule {}