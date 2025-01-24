import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsambleaService } from '../../../shared/services/asamblea/asamblea.service';
import { getDistance } from 'geolib';
import { AsambleaResponse, Asambleas } from '../../../shared/models/asamblea/asambleas';
import { APIENDPOINT } from '../../../config/configuration';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  page = 1;
  pageSize = 3;
  totalAsambleas = 0;
  nombreAsamblea: string = '';
  currentUser: any = {};
  errorMessage: string = '';
  errorMessageGeolocation: string = '';

  pLat: number = 4.600480;
  pLng: number = -74.109207;
  maxDistance: number = 500;

  asambleas: AsambleaResponse[] = [];
  filteredAsambleas: AsambleaResponse[] = [];
  searchAdmin: string = '';

  geoErrorCode: string | null = null;
  id!: number;
  usuarioActual: string = '';

  constructor(
    private readonly asambleaService: AsambleaService, private readonly router: Router,) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    this.usuarioActual = currentUser.id_usuario || 'Usuario desconocido';

    this.asambleaService.getAsambleasUser(APIENDPOINT.getAllAsambleas, this.usuarioActual).subscribe((data: Asambleas) => {
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
      this.totalAsambleas = this.asambleas.length; // Actualizar el total de asambleas
      this.filterAsambleas(); // Filtrar asambleas después de cargar
    });
  }

  filterAsambleas() {
    // Filtrar según el término de búsqueda
    const searchTerm = this.searchAdmin.toLowerCase();
    const filteredResults = this.asambleas.filter(asambleas =>
      asambleas.titulo.toLowerCase().includes(searchTerm) ||
      asambleas.descripcion.includes(searchTerm)
    );

    // Actualizar el total de asambleas filtrados
    this.totalAsambleas = filteredResults.length;

    // Aplicar paginación
    const start = (this.page - 1) * this.pageSize;
    this.filteredAsambleas = filteredResults.slice(start, start + this.pageSize);
  }

  // Función de geolocalizacion que se llama al hacer clic en el boton
  getUserLocation(id: number): void {
    localStorage.setItem('asambleaId', JSON.stringify({ id_asamblea: id }));
    const asamblea = this.asambleas.find(a => a.id_asamblea === id);  // Buscar la asamblea por ID
    // Verifica si el navegador soporta la geolocalización
    if (!navigator.geolocation) {
      if (asamblea) {
        asamblea.errorMessageGeolocation = 'La geolocalización no es soportada por tu navegador.';
      }
      return;
    }

    // Geolocalización del usuario
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Calcula la distancia entre la ubicación del usuario y el punto de referencia
        const distance = getDistance(
          { latitude: userLat, longitude: userLng },
          { latitude: this.pLat, longitude: this.pLng }
        );

        // Condición de la distancia
        if (distance <= this.maxDistance) {
          this.router.navigate(['/home/preguntas', id]);
        } else {
          if (asamblea) {
            asamblea.geoErrorCode = 'ACCESS_DENIED';
            asamblea.errorMessageGeolocation = `Acceso denegado, debes estar a menos de ${this.maxDistance} metros del punto de referencia.`;
          }
        }
      },
      (error) => {
        if (asamblea) {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              asamblea.geoErrorCode = 'PERMISSION_DENIED';
              asamblea.errorMessageGeolocation = 'Permiso de geolocalización denegado por el usuario.';
              break;
            case error.POSITION_UNAVAILABLE:
              asamblea.geoErrorCode = 'POSITION_UNAVAILABLE';
              asamblea.errorMessageGeolocation = 'Información de geolocalización no disponible.';
              break;
            default:
              asamblea.geoErrorCode = 'UNKNOWN_ERROR';
              asamblea.errorMessageGeolocation = 'Error desconocido al obtener la geolocalización.';
              break;
          }
        }
      }
    );
  }

  trackById(index: number, item: AsambleaResponse): number {
    return item.id_asamblea ?? index;
  }

  onSearchTermChange(): void {
    this.page = 1; // Reiniciar a la primera página cuando cambie el término de búsqueda
    this.filterAsambleas(); // Filtrar cada vez que cambie el término de búsqueda
  }

  // Logica para comprar las fechas
  estaDentroDelRango(fechaInicio: string | Date, fechaFin: string | Date): boolean {
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    const fechaActual = new Date();

    return fechaInicioDate <= fechaActual && fechaActual <= fechaFinDate;
  }

}