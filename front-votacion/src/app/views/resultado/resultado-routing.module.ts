import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ResultadoComponent } from "./resultado/resultado.component";



const roters: Routes =[
    {
        path: '',
        component: ResultadoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class ResultadoRoutingModule {}