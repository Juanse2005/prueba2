import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PreguntasUsComponent } from "./preguntas-us/preguntas-us.component";


const roters: Routes =[
    {
        path: '',
        component: PreguntasUsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class PreguntasUsRoutingModule {}