import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModules } from '../../shared/share.modules';
import { ResultadoRoutingModule } from './resultado-routing.module';
import { ResultadoComponent } from './resultado/resultado.component';
import { VotacionService } from '../../shared/services/votacion/votacion.service';


@NgModule({
  declarations: [
    ResultadoComponent,
  ],
  imports: [
    CommonModule,
    ResultadoRoutingModule,
    ShareModules
  ],
  providers: [
    VotacionService
  ]
})
export class ResultadoModule { }
