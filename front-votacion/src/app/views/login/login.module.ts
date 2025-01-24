import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login-component/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ShareModules } from '../../shared/share.modules';
import { AuthService } from '../../shared/services/auth.service';
import { RolesService } from '../../shared/services/roles/roles.service';
import { DocumentosService } from '../../shared/services/documento/documentos.service';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ShareModules
  ],
  providers: [
    AuthService,
    RolesService,
    DocumentosService
  ]
})
export class LoginModule { }
