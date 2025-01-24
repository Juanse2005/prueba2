import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreacionAdminComponent } from './creacion-admin/creacion-admin.component';
import { ShareModules } from '../../shared/share.modules';
import { CreacionAdminRoutingModule } from './creacion-admin-routing.module';
import { AdminService } from '../../shared/services/admin/admin.service';
import { ConjuntoService } from '../../shared/services/conjunto/conjunto.service';
import { AdminConjuntoService } from '../../shared/services/admin_conjunto/adminConjunto.service';



@NgModule({
  declarations: [
    CreacionAdminComponent
  ],
  imports: [
    CommonModule,
    CreacionAdminRoutingModule,
    ShareModules
  ],
  providers: [
    AdminService,
    ConjuntoService,
    AdminConjuntoService
  ]
})
export class CreacionAdminModule { }
