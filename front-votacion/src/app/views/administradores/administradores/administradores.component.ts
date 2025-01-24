import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admins, AdminResponse } from '../../../shared/models/admin/admins';
import { AdminService } from '../../../shared/services/admin/admin.service';
import { APIENDPOINT } from '../../../config/configuration';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit {
  page = 1;
  pageSize = 6;
  totalAdmins = 0;
  admins: AdminResponse[] = [];
  filteredAdmins: AdminResponse[] = []; // Para almacenar los resultados filtrados
  searchAdmin: string = '';

  constructor(private readonly router: Router, public adminService: AdminService) { }

  ngOnInit() {
    this.refreshAdmins(); // Cargar administradores al inicio
  }

  crearAdmin() {
    this.router.navigate(['/administradores/creacion-admin']);
  }

  editarAdmin(id: number) {
    this.router.navigate(['/administradores/creacion-admin', id]);
  }

  refreshAdmins() {
    this.adminService.get(APIENDPOINT.getAllAdmins).subscribe((data: Admins) => {
      if (Array.isArray(data.respuesta)) {
        this.admins = data.respuesta;
      } else {
        this.admins = [];
      }
      this.totalAdmins = this.admins.length; // Actualizar el total de administradores
      this.filterAdmins(); // Filtrar administradores después de cargar
    });
  }

  filterAdmins() {
    // Filtrar según el término de búsqueda
    const searchTerm = this.searchAdmin.toLowerCase();
    const filteredResults = this.admins.filter(admin =>
      admin.nombre.toLowerCase().includes(searchTerm) ||
      admin.nro_documento.includes(searchTerm)
    );

    // Actualizar el total de administradores filtrados
    this.totalAdmins = filteredResults.length;

    // Aplicar paginación
    const start = (this.page - 1) * this.pageSize;
    this.filteredAdmins = filteredResults.slice(start, start + this.pageSize);
  }


  trackById(index: number, item: AdminResponse): number {
    return item.id_admin ?? index;
  }

  onSearchTermChange(): void {
    this.page = 1; // Reiniciar a la primera página cuando cambie el término de búsqueda
    this.filterAdmins(); // Filtrar cada vez que cambie el término de búsqueda
  }

  //Cambio de estado
  toggleEstado(admin: AdminResponse) {
    admin.estado = admin.estado === 'Activo' ? 'Inactivo' : 'Activo';
    this.adminService.delete(APIENDPOINT.deleteAdmin, admin.id_admin!, admin).subscribe({
      next: (response) => {
        console.log('Estado del administrador actualizado exitosamente:', response);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error al actualizar el estado del administrador:', error);
        if (error.status === 401) {
          console.error('No autorizado, redirigiendo al login');
        } else {
          console.error('Error no manejado:', error);
        }
      }
    });
  }
}
