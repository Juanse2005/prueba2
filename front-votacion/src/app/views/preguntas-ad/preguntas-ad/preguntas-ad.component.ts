import { Component, OnInit } from '@angular/core';
import { APIENDPOINT } from '../../../config/configuration';
import { PreguntaResponse, Preguntas } from '../../../shared/models/pregunta/preguntas';
import { ActivatedRoute, Router } from '@angular/router';


import { PreguntasService } from '../../../shared/services/pregunta/preguntas.service';
import { AsambleaService } from '../../../shared/services/asamblea/asamblea.service';
import { AsambleaResponse } from '../../../shared/models/asamblea/asambleas';

@Component({
  selector: 'app-preguntas-ad',
  templateUrl: './preguntas-ad.component.html',
  styleUrls: ['./preguntas-ad.component.css']
})
export class PreguntasAdComponent implements OnInit {

  id: number | undefined;
  preguntas: PreguntaResponse[] = [];
  asamblea: AsambleaResponse = {} as AsambleaResponse

  asambleaId: number | undefined;
  preguntaId: number | undefined;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute,
    private readonly preguntasService: PreguntasService,
    private readonly asambleaService: AsambleaService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.refreshPreguntas();
        this.tituloAsamblea();
      }
    })

    const currentAsambleaId = JSON.parse(localStorage.getItem('asambleaId') ?? '{}');
    this.asambleaId = currentAsambleaId.id_asamblea || 0; // id de la asamblea

  }
  tituloAsamblea() {
    if (!this.id) return;
    this.asambleaService.getById(APIENDPOINT.getAllAsambleas, this.id).subscribe({
      next: (data: any) => {
        if (data.respuesta && data.respuesta.length > 0) {
          this.asamblea = data.respuesta[0];
        }
      },
      error: (error) => console.error('Error al obtener titulo', error),
    });
  }
  refreshPreguntas() {
    if (this.id) {
      this.preguntasService.getById(APIENDPOINT.getAllPreguntas, this.id).subscribe((data: Preguntas) => {
        if (Array.isArray(data.respuesta)) {
          this.preguntas = data.respuesta;
        } else {
          this.preguntas = [];
        }
      });
    }
  }

  crearPregunta(id: number) {
    this.router.navigate(['/asambleas/creacion-preguntas', id]);
  }

  volver() {
    this.router.navigate(['/asambleas']);
  }

  resultado(id_pregunta: number) {
    this.router.navigate(['/asambleas/resultado/', this.asambleaId, id_pregunta]);
  }

  toggleEstado(pregunta: PreguntaResponse) {
    pregunta.estado = pregunta.estado === 'Activo' ? 'Inactivo' : 'Activo';
    this.preguntasService.delete(APIENDPOINT.deletePregunta, pregunta.id_pregunta, pregunta).subscribe({
      next: (response: any) => {
        console.log('Estado de la pregunta actualizado exitosamente:', response);
      },
      error: (error : any) => {
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