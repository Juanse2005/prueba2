import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home-component/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ShareModules } from '../../shared/share.modules';
import { AsambleaService } from '../../shared/services/asamblea/asamblea.service';



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShareModules
  ],
  providers: [
    AsambleaService
  ],
})
export class HomeModule { }

