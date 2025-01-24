import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModules } from '../../shared/share.modules';
import { CreacionPreguntasComponent } from './creacion-preguntas/creacion-preguntas.component';
import { CreacionPreguntasRoutingModule } from './creacion-preguntas-routing.module';
import { PreguntasService } from '../../shared/services/pregunta/preguntas.service';
import { OpcionesService } from '../../shared/services/opcion/opciones.service';


@NgModule({
  declarations: [
    CreacionPreguntasComponent,
  ],
  imports: [
    CommonModule,
    CreacionPreguntasRoutingModule,
    ShareModules
  ],
  providers: [
    PreguntasService,
    OpcionesService
  ]
})
export class CreacionPreguntasdModule { }
