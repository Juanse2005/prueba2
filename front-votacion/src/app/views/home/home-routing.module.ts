import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home-component/home.component";
import { NgModule } from "@angular/core";


const roters: Routes =[
    {
        path: '',
        component: HomeComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(roters)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}