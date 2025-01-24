import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModules } from '../../shared/share.modules';
import { AdministradoresComponent } from './administradores/administradores.component';
import { AdministradoresRoutingModule } from './administradores-routing.module';
import { AdminService } from '../../shared/services/admin/admin.service';


@NgModule({
  declarations: [
    AdministradoresComponent,
  ],
  imports: [
    CommonModule,
    AdministradoresRoutingModule,
    ShareModules
  ],
  providers: [
    AdminService
  ]
})
export class AdministradoresModule { }
