import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModules } from '../../shared/share.modules';
import { CreacionAsambleaComponent } from './creacion-asamblea/creacion-asamblea.component';
import { CreacionAsambleaRoutingModule } from './creacion-asamblea-routing.module';
import { AsambleaService } from '../../shared/services/asamblea/asamblea.service';
import { AdminConjuntoService } from '../../shared/services/admin_conjunto/adminConjunto.service';


@NgModule({
  declarations: [
    CreacionAsambleaComponent,
  ],
  imports: [
    CommonModule,
    CreacionAsambleaRoutingModule,
    ShareModules
  ],
  providers: [
    AsambleaService,
    AdminConjuntoService
  ]
})
export class CreacionAsambleaModule { }
