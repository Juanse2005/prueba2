import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModules } from '../../shared/share.modules';
import { EdicionUsuarioComponent } from './edicion-usuario/edicion-usuario.component';
import { EdicionUsuarioRoutingModule } from './edicion-usuario-routing.module';
import { UsuarioService } from '../../shared/services/usuarios/usuario.service';
@NgModule({
  declarations: [
    EdicionUsuarioComponent,
  ],
  imports: [
    CommonModule,
    EdicionUsuarioRoutingModule,
    ShareModules
  ],
  providers: [
    UsuarioService
  ]
})
export class EdicionUsuarioModule { }
