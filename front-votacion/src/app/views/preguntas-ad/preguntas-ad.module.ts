import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModules } from '../../shared/share.modules';
import { PreguntasAdComponent } from './preguntas-ad/preguntas-ad.component';
import { PreguntasAdRoutingModule } from './preguntas-ad-routing.module';
import { PreguntasService } from '../../shared/services/pregunta/preguntas.service';
import { AsambleaService } from '../../shared/services/asamblea/asamblea.service';


@NgModule({
  declarations: [
    PreguntasAdComponent,
  ],
  imports: [
    CommonModule,
    PreguntasAdRoutingModule,
    ShareModules
  ],
  providers: [
    PreguntasService,
    AsambleaService,
  ]
})
export class PreguntasAdModule { }
