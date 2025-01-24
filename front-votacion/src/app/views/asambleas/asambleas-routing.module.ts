import { Routes, RouterModule } from "@angular/router";
import { AsambleasComponent } from "./asambleas-component/asambleas.component";
import { NgModule } from "@angular/core";


const roters: Routes =[
    {
        path: '',
        component: AsambleasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class AsambleasRoutingModule {}