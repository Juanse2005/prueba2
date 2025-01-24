import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreacionConjuntoComponent } from './creacion-conjunto/creacion-conjunto.component';
import { CreacionConjuntoRoutingModule } from './creacion-conjunto-routing.module';
import { ShareModules } from '../../shared/share.modules';
import { ConjuntoService } from '../../shared/services/conjunto/conjunto.service';


@NgModule({
  declarations: [
    CreacionConjuntoComponent
  ],
  imports: [
    CommonModule,
    CreacionConjuntoRoutingModule,
    ShareModules
  ],
  providers: [
    ConjuntoService
  ]
})
export class CreacionConjuntoModule { }
