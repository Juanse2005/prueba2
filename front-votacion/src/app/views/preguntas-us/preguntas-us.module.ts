import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModules } from '../../shared/share.modules';
import { PreguntasUsComponent } from './preguntas-us/preguntas-us.component';
import { PreguntasUsRoutingModule } from './preguntas-us-routing.module';
import { PreguntasService } from '../../shared/services/pregunta/preguntas.service';
import { OpcionesService } from '../../shared/services/opcion/opciones.service';
import { VotacionService } from '../../shared/services/votacion/votacion.service';


@NgModule({
  declarations: [
    PreguntasUsComponent,
  ],
  imports: [
    CommonModule,
    PreguntasUsRoutingModule,
    ShareModules
  ],
  providers: [
    PreguntasService,
    OpcionesService,
    VotacionService
  ]
})
export class PreguntasUsModule { }
