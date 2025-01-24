// conjuntos.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConjuntoResponse, Conjuntos } from '../../../shared/models/conjunto/conjuntos';
import { ConjuntoService } from '../../../shared/services/conjunto/conjunto.service';
import { APIENDPOINT } from '../../../config/configuration';

@Component({
  selector: 'app-conjuntos',
  templateUrl: './conjuntos.component.html',
  styleUrls: ['./conjuntos.component.css']
})
export class ConjuntosComponent implements OnInit {
  page = 1;
  pageSize = 6;
  totalConjuntos = 0;
  conjuntos: ConjuntoResponse[] = [];
  filteredConjuntos: ConjuntoResponse[] = [];
  searchConjunto: string = '';

  constructor(
    private readonly router: Router,
    public conjuntoService: ConjuntoService
  ) { }

  ngOnInit() {
    this.refreshConjuntos();
  }

  crearConjunto() {
    this.router.navigate(['/conjuntos/creacion-conjunto']);
  }

  editarConjunto(id: number) {
    this.router.navigate(['/conjuntos/creacion-conjunto', id]);
  }

  VistaUsuarios(id: number) {
    this.router.navigate(['/usuarios', id]);
  }

  refreshConjuntos() {
    this.conjuntoService.get(APIENDPOINT.getAllConjuntos).subscribe((data: Conjuntos) => {
      if (Array.isArray(data.respuesta)) {
        this.conjuntos = data.respuesta;
      } else {
        this.conjuntos = [];
      }
      this.totalConjuntos = this.conjuntos.length;
      this.filterConjuntos();
    });
  }

  filterConjuntos() {
    const searchTerm = this.searchConjunto.toLowerCase();
    this.filteredConjuntos = this.conjuntos.filter(conjunto =>
      conjunto.nombre.toLowerCase().includes(searchTerm) ||
      conjunto.nro_documento.includes(searchTerm)
    );

    this.totalConjuntos = this.filteredConjuntos.length;

    const start = (this.page - 1) * this.pageSize;

    this.filteredConjuntos = this.filteredConjuntos.slice(start, start + this.pageSize);
  }

  trackById(index: number, item: ConjuntoResponse): number {
    return item.id_conjunto ?? index;
  }

  onSearchTermChange(): void {
    this.page = 1;
    this.filterConjuntos();
  }

  toggleEstado(conjunto: ConjuntoResponse) {
    conjunto.estado = conjunto.estado === 'Activo' ? 'Inactivo' : 'Activo';
    this.conjuntoService.delete(APIENDPOINT.deleteConjunto, conjunto.id_conjunto!, conjunto).subscribe({
      next: (response) => {
        console.log('Estado del conjunto actualizado exitosamente:');
      },
      error: (error) => {
        console.error('Error al actualizar el estado del conjunto:', error);
        if (error.status === 401) {
          console.error('No autorizado, redirigiendo al login');
        } else {
          console.error('Error no manejado:', error);
        }
      }
    });
  }

}
