import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Admins, AdminResponse } from '../../../shared/models/admin/admins';
import { AdminService } from '../../../shared/services/admin/admin.service';
import { RolesResponse } from '../../../shared/models/roles/roles';
import { ConjuntoService } from '../../../shared/services/conjunto/conjunto.service';
import { ConjuntoResponse, Conjuntos } from '../../../shared/models/conjunto/conjuntos';
import { DocumentosResponse } from '../../../shared/models/documento/documentos';
import { APIENDPOINT } from '../../../config/configuration';
import { AdminConjuntoService } from '../../../shared/services/admin_conjunto/adminConjunto.service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-creacion-admin',
  templateUrl: './creacion-admin.component.html',
  styleUrls: ['./creacion-admin.component.css']
})
export class CreacionAdminComponent implements OnInit {
  id: number | undefined;
  roles: RolesResponse[] = [];
  conjuntos: ConjuntoResponse[] = [];
  documentos: DocumentosResponse[] = [];

  admin: AdminResponse = {} as AdminResponse;

  selectedOptions: any[] = [];

  isEditMode: boolean = false;
  titulo: string = 'Crear nuevo administrador';
  
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public adminService: AdminService,
    public conjuntoService: ConjuntoService,
    public adminConjuntoService: AdminConjuntoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convierte el id a número
      if (this.id) {
        this.isEditMode = true;
        this.titulo = 'Editar administrador';
        this.getAdminById(); // Llama a la función para obtener el admin
      }

    });
    // Obtiene los roles guardados y los coloca en el campo roles
    const response = JSON.parse(localStorage.getItem('roles') ?? '{}');
    this.roles = response.respuesta?.filter((rol: any) => rol.id_rol !== 1) || [];


    // Obtiene el nombre del usuario actual y lo coloca en el campo usuario_modificacion 
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    const usuarioActual = currentUser.nombre || 'Usuario desconocido';
    this.admin.usuario_modificacion = usuarioActual;

    // Obtiene los documentos guardados y los coloca en el campo documentos
    const docs = JSON.parse(localStorage.getItem('documentos') ?? '{}');
    this.documentos = docs.respuesta;

    //Se obtiene la fecha actual y se coloca en el campo
    const today = new Date();
    this.admin.ultima_modificacion = today.toISOString().split('T')[0];
    
    // Obtiene todos los conjuntos
    this.conjuntoService.get(APIENDPOINT.getAllConjuntos).subscribe((data: Conjuntos) => {
      this.conjuntos = data.respuesta || [];
    });
  }

  isSelected(option: any): boolean {
    return this.selectedOptions.includes(option);
  }

  toggleSelection(option: any): void {
    if (this.isSelected(option)) {
      this.selectedOptions = this.selectedOptions.filter(
        (selected) => selected.id_conjunto !== option.id_conjunto
      );
    } else {
      this.selectedOptions.push(option);
    }
  }

  async saveAdmin(form: NgForm): Promise<void> {
    if (!form.valid) {
      console.log('Formulario inválido');
      return;
    }

    try {
      let adminResponse;
      if (this.id) {
        this.admin.pass = this.admin.password ?? null;
        this.adminService.put(APIENDPOINT.updateAdmin, this.id, this.admin).subscribe({
          next: (response) => {
            console.log('Administrador editado exitosamente:', response);
            this.router.navigate(['/administradores']);
          },
          error: (error) => {
            console.error('Error al editar administrador:', error);
            if (error.status === 401) {
              console.error('No autorizado, redirigiendo al login');
              this.router.navigate(['/login']);
            } else {
              console.error('Error no manejado:', error);
            }
          }
        });
      } else {
        // Verifica si hay conjuntos seleccionados
        if (!this.selectedOptions.length) {
          alert('Debe seleccionar al menos un conjunto antes de continuar.');
          return;
        }
        // Crear nuevo admin
        const response: { id_admin: number } = await firstValueFrom(this.adminService.post(APIENDPOINT.createAdmin, this.admin));
        adminResponse = response.id_admin;

        if (!adminResponse) {
          console.error('Error al crear el administrador:', response);
          alert('Error al crear el administrador');
          return;
        }

        const newAdminId = adminResponse;
        console.log('ID del nuevo administrador creado:', newAdminId);

        const adminConjuntoPromises = this.selectedOptions.map(option => {
          const data = {
            id_admin: newAdminId,
            id_conjunto: option.id_conjunto,
          };
          // Enviar cada conjunto seleccionado a la base de datos
          return firstValueFrom(this.adminConjuntoService.post(APIENDPOINT.createAdminConjunto, data));
        });

        await Promise.all(adminConjuntoPromises);

        console.log('Conjuntos registrados exitosamente');
      }
      form.reset();
      this.router.navigate(['/administradores']);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        console.error('Error al procesar el formulario:', error);
        if (error.status === 500) {
          alert('Error en el servidor: ' + (error.error?.msg || 'Error desconocido'));
        } else {
          alert('Error al procesar el formulario: ' + error.message);
        }
      } else {
        console.error('Error desconocido:', error);
        alert('Error desconocido al procesar el formulario.');
      }
    }
  }

  getAdminById() {
    if (this.id) {
      this.adminService.getById(APIENDPOINT.getAllAdmins, this.id).subscribe((data: Admins) => {
        if (data && data.respuesta && data.respuesta.length > 0) {
          const adminData = data.respuesta[0];

          this.admin = adminData; // Asigna los datos al objeto correspondiente

        } else {
          console.error('No se encontró el administrador o la respuesta está vacía');
        }
      }, error => {
        console.error('Error al obtener el administrador:', error);
      });
    }
  }

  volver() {
    this.router.navigate(['/administradores']);
  }
}
