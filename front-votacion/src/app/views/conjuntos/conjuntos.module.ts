import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConjuntosRoutingModule } from './conjuntos-routing.module';
import { ShareModules } from '../../shared/share.modules';
import { ConjuntosComponent } from './conjuntos/conjuntos.component';
import { ConjuntoService } from '../../shared/services/conjunto/conjunto.service';


@NgModule({
  declarations: [
    ConjuntosComponent
  ],
  imports: [
    CommonModule,
    ConjuntosRoutingModule,
    ShareModules
  ],
  providers: [
    ConjuntoService
  ]
})
export class ConjuntosModule { }
