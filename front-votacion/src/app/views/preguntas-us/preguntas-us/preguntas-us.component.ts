import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIENDPOINT } from '../../../config/configuration';
import { PreguntaResponse, Preguntas } from '../../../shared/models/pregunta/preguntas';
import { PreguntasService } from '../../../shared/services/pregunta/preguntas.service';
import { Opciones, OpcionResponse } from '../../../shared/models/opcion/opciones';
import { OpcionesService } from '../../../shared/services/opcion/opciones.service';
import { VotacionService } from '../../../shared/services/votacion/votacion.service';
import { AdminResponse } from '../../../shared/models/admin/admins';
import { VotacionesResponse } from '../../../shared/models/votacion/votaciones';
import { UsuariosResponse } from '../../../shared/models/usuario/usuarios';

@Component({
  selector: 'app-preguntas-us',
  templateUrl: './preguntas-us.component.html',
  styleUrls: ['./preguntas-us.component.css']
})
export class PreguntasUsComponent implements OnInit {
  descripcion: string = '';
  id: number | undefined;

  preguntas: PreguntaResponse[] = [];
  opciones: { [key: number]: OpcionResponse[] } = {};
  admin: AdminResponse = {} as AdminResponse;
  votacion: VotacionesResponse = {} as VotacionesResponse;
  usuario: UsuariosResponse = {} as UsuariosResponse;
  yaVoto: { [key: number]: boolean } = {};
  currentRole: number = 0;

  opcionSeleccionada: { [key: number]: number } = {};

  asambleaId: number | undefined;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly preguntasService: PreguntasService,
    private readonly opcionesService: OpcionesService,
    private readonly votacionService: VotacionService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convierte el id a número
      if (this.id) {
        this.refreshAsambleasYOpciones();
      }
    });

    // Obtiene el nombre del usuario actual
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const asambleaData = currentUser.id_usuario || 'Usuario desconocido';
    this.usuario.id_usuario = asambleaData;

    const currentAsambleaId = JSON.parse(localStorage.getItem('asambleaId') ?? '{}');
    this.asambleaId = currentAsambleaId.id_asamblea || 0; // id de la asamblea

    // Obtener rol
    const currentRol = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentRole = currentRol.id_rol || 0;
  }

  votar(votoForm: any) {
    const payload = this.preguntas
      .filter(pregunta => pregunta.estado === 'Activo') // Filtrar solo preguntas activas
      .map(pregunta => ({
        id_usuario: this.usuario.id_usuario,
        id_opcion: this.opcionSeleccionada[pregunta.id_pregunta],
        id_pregunta: pregunta.id_pregunta
      }))
      .filter(votacion => votacion.id_opcion !== null && !this.yaVoto[votacion.id_pregunta]);

    if (payload.length === 0) {
      alert('Debe seleccionar una opción para al menos una pregunta activa.');
      return;
    }

    this.votacionService.post(APIENDPOINT.createVotacion, payload).subscribe({
      next: (response) => {
        this.router.navigate(['/preguntas', this.asambleaId]);
        payload.forEach(votacion => {
          this.yaVoto[votacion.id_pregunta] = true; // Cambiar el estado a "ya votó"
        });
      },
      error: (error) => {
        console.error('Error al enviar las votaciones:', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          alert('Hubo un error al enviar tus votaciones. Intenta nuevamente.');
        }
      }
    });
  }
  refreshAsambleasYOpciones() {
    if (!this.id) return;

    this.preguntasService.getById(APIENDPOINT.getAllPreguntas, this.id).subscribe({
      next: (data: Preguntas) => {
        const preguntasData = data?.respuesta || [];
        this.preguntas = preguntasData;

        preguntasData.forEach(pregunta => {
          if (pregunta.estado == 'Activo') {
            this.opciones[pregunta.id_pregunta] = [];
          }
          this.opcionesService.getById(APIENDPOINT.getAllOpciones, pregunta.id_pregunta).subscribe({
            next: (opcionesData: Opciones) => {

              this.opciones[pregunta.id_pregunta] = opcionesData?.respuesta || [];

              this.votacionService.getVotacionRespuesta(APIENDPOINT.obtenerVotacion, this.usuario.id_usuario, pregunta.id_pregunta)
                .subscribe({
                  next: (response: any) => {
                    if (response && response.mensaje && response.mensaje.id_opcion) {
                      this.opcionSeleccionada[pregunta.id_pregunta] = response.mensaje.id_opcion;
                      this.yaVoto[pregunta.id_pregunta] = true; // Marcar como ya votada
                    }
                  },
                  error: (error) => {
                    console.error('Error al obtener la respuesta de votación', error);
                  }
                });
            },
            error: (error) => console.error('Error al obtener opciones:', error),
          });
        });
      },
      error: (error: any) => console.error('Error al obtener preguntas:', error),
    });
  }

  resultados() {
    this.router.navigate(['/home/resultado', this.asambleaId]);
  }

  volver(role: number): void {
    switch (role) {
      case 1:
        this.router.navigate(['/home']);  // Usuario
        break;
      case 2:
        this.router.navigate(['/asambleas']);  // Admin
        break;
      case 3:
        this.router.navigate(['/asambleas']);  // Super Admin
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

}