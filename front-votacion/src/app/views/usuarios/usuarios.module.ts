import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModules } from '../../shared/share.modules';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioRoutingModule } from './usuarios-routing.module';
import { UsuarioService } from '../../shared/services/usuarios/usuario.service';
import { ConjuntoService } from '../../shared/services/conjunto/conjunto.service';
@NgModule({
  declarations: [
    UsuariosComponent,
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ShareModules
  ],
  providers: [
    UsuarioService,
    ConjuntoService
  ]
})
export class UsuarioModule { }
