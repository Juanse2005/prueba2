import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsambleaService } from '../../../shared/services/asamblea/asamblea.service';
import { AsambleaResponse, Asambleas } from '../../../shared/models/asamblea/asambleas';
import { APIENDPOINT } from '../../../config/configuration';
import { AdminConjuntos, AdminConjuntosResponse } from '../../../shared/models/admin_conjunto/admin-conjuntos';
import { AdminConjuntoService } from '../../../shared/services/admin_conjunto/adminConjunto.service';
import { AdminResponse } from '../../../shared/models/admin/admins';
@Component({
  selector: 'app-asambleas',
  templateUrl: './asambleas.component.html',
  styleUrls: ['./asambleas.component.css']
})
export class AsambleasComponent implements OnInit {
  page = 1;
  pageSize = 3;
  totalAsambleas = 0;
  nombreAsamblea: string = '';
  asambleas: AsambleaResponse[] = [];

  adminConjuntos: AdminConjuntosResponse[] = [];
  admin: AdminResponse = {} as AdminResponse
  selectedConjuntoId?: number;
  selectedNombreConjunto?: string;

  filteredAsambleas: AsambleaResponse[] = [];
  searchAdmin: string = '';
  id!: number;
  usuarioActual: string = '';

  constructor(private readonly asambleaService: AsambleaService, private readonly router: Router, private readonly adminConjuntoService: AdminConjuntoService
  ) { }

  ngOnInit() {
    this.getAll();

    const currentUserId = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    const idusuarioActual = currentUserId.id_admin || 'Usuario desconocido';
    this.admin.id_admin = idusuarioActual;

    this.adminConjuntoService.getById(APIENDPOINT.getAllAdminConjuntos, idusuarioActual).subscribe((data: AdminConjuntos) => {
      this.adminConjuntos = data.respuesta || [];
      if (this.adminConjuntos.length > 0) {
        this.selectedConjuntoId = Number(this.adminConjuntos[0].id_conjunto) || undefined;
        this.selectedNombreConjunto = String(this.adminConjuntos[0].nombre_conjunto) || undefined;
        this.getAll(this.selectedConjuntoId);
        localStorage.setItem('conjunto', JSON.stringify({ id_conjunto: this.selectedConjuntoId, nombre_conjunto: this.selectedNombreConjunto }));
      }
    });
  }

  crearAsamblea() {
    this.router.navigate(['/asambleas/creacion-asamblea']);
  }

  iniciarAsamblea(id: number) {
    this.router.navigate(['/asambleas/preguntas', id]);
  }

  editarPreguntas(id_asamblea: number) {
    localStorage.setItem('asambleaId', JSON.stringify({ id_asamblea }));
    this.router.navigate(['/asambleas/editar-preguntas', id_asamblea]);
  }

  getAll(conjuntoId?: number) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    this.usuarioActual = currentUser.id_admin || 'Usuario desconocido';

    if (!conjuntoId && !this.selectedConjuntoId) {
      return; // No realizar la consulta si no hay conjuntoId
    }

    const params: any = { adminId: this.usuarioActual };
    if (conjuntoId || this.selectedConjuntoId) {
      params.conjuntoId = conjuntoId || this.selectedConjuntoId;
    }

    this.asambleaService.getAsambleasAdmin(APIENDPOINT.getAllAsambleas, params).subscribe((data: Asambleas) => {
      if (Array.isArray(data.respuesta)) {
        this.asambleas = data.respuesta.map(asamblea => ({
          ...asamblea,
          fecha_inicio: new Date(asamblea.fecha_inicio),
          fecha_fin: new Date(asamblea.fecha_fin),
        }));
        this.asambleas.sort((a, b) => new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime());

      } else {
        this.asambleas = [];
      }
      this.totalAsambleas = this.asambleas.length; // Actualizar el total de administradores
      this.filterAsambleas(); // Filtrar administradores después de cargar
    });
  }

  onConjuntoChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const conjuntoId = Number(target?.value);

    const conjuntoSeleccionado = this.adminConjuntos.find(
      conjunto => conjunto.id_conjunto === conjuntoId
    );

    if (conjuntoSeleccionado) {
      this.selectedConjuntoId = conjuntoSeleccionado.id_conjunto!;
      this.selectedNombreConjunto = conjuntoSeleccionado.nombre_conjunto;

      localStorage.setItem('conjunto', JSON.stringify({
        id_conjunto: this.selectedConjuntoId,
        nombre_conjunto: this.selectedNombreConjunto
      }));

      this.getAll(this.selectedConjuntoId);
    } else {
      console.error('Conjunto no encontrado');
    }
  }

  filterAsambleas() {
    // Filtrar según el término de búsqueda
    const searchTerm = this.searchAdmin.toLowerCase();
    const filteredResults = this.asambleas.filter(asambleas =>
      asambleas.titulo.toLowerCase().includes(searchTerm) ||
      asambleas.descripcion.includes(searchTerm)
    );

    // Actualizar el total de administradores filtrados
    this.totalAsambleas = filteredResults.length;

    // Aplicar paginación
    const start = (this.page - 1) * this.pageSize;
    this.filteredAsambleas = filteredResults.slice(start, start + this.pageSize);
  }

  // Logica para comprar las fechas
  estaDentroDelRango(fechaInicio: string | Date, fechaFin: string | Date): boolean {
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    const fechaActual = new Date();

    return fechaInicioDate <= fechaActual && fechaActual <= fechaFinDate;
  }

  trackById(index: number, item: AsambleaResponse): number {
    return item.id_asamblea ?? index;
  }

  onSearchTermChange(): void {
    this.page = 1; // Reiniciar a la primera página cuando cambie el término de búsqueda
    this.filterAsambleas(); // Filtrar cada vez que cambie el término de búsqueda
  }

  toggleEstado(asamblea: AsambleaResponse) {
    this.asambleaService.delete(APIENDPOINT.deleteAsamblea, asamblea.id_asamblea, asamblea).subscribe({
      next: (response) => {
        console.log('Estado de la pregunta actualizado exitosamente:', response);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error al actualizar el estado de la pregunta:', error);
        if (error.status === 401) {
          console.error('No autorizado, redirigiendo al login');
        } else {
          console.error('Error no manejado:', error);
        }
      }
    });
  }


}
