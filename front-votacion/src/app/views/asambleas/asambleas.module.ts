import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModules } from '../../shared/share.modules';
import { AsambleasRoutingModule } from './asambleas-routing.module';
import { AsambleasComponent } from './asambleas-component/asambleas.component';
import { AsambleaService } from '../../shared/services/asamblea/asamblea.service';
import { AdminConjuntoService } from '../../shared/services/admin_conjunto/adminConjunto.service';


@NgModule({
  declarations: [
    AsambleasComponent,
  ],
  imports: [
    CommonModule,
    AsambleasRoutingModule,
    ShareModules
  ],
  providers: [
  AsambleaService,
  AdminConjuntoService
  ]
})
export class AsambleasModule { }
