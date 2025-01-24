import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntasService } from '../../../shared/services/pregunta/preguntas.service';
import { OpcionesService } from '../../../shared/services/opcion/opciones.service';
import { APIENDPOINT } from '../../../config/configuration';
import { firstValueFrom } from 'rxjs';
import { OpcionResponse } from '../../../shared/models/opcion/opciones';

@Component({
  selector: 'app-creacion-preguntas',
  templateUrl: './creacion-preguntas.component.html',
  styleUrls: ['./creacion-preguntas.component.css']
})
export class CreacionPreguntasComponent implements OnInit {
  descripcion: string = '';
  opciones: OpcionResponse[] = [
    { opcion: "", id_pregunta: 0, id_opcion: 0 },
    { opcion: "", id_pregunta: 0, id_opcion: 0 },
  ];

  id: number | undefined;

  constructor(
    private readonly router: Router,
    private readonly preguntasService: PreguntasService,
    private readonly opcionesService: OpcionesService,
    private readonly route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.enviarFormulario();
      }
    })

  }

  agregarOpcion(): void {
    this.opciones.push({ opcion: '', id_pregunta: 0, id_opcion: 0 });
  }

  quitarOpcion(index: number): void {
    if (this.opciones.length > 2) {
      this.opciones.splice(index, 1);
    }
  }

  esFormularioValido(): boolean {
    return (
      this.descripcion.trim() !== '' &&
      this.opciones.every(opcion => opcion.opcion.trim() !== '') &&
      this.opciones.length >= 1
    );
  }

  async enviarFormulario(): Promise<void> {
    if (!this.esFormularioValido()) {
      return;
    }
    try {
      const pregunta = {
        id_pregunta: 0,
        descripcion: this.descripcion,
        id_asamblea: this.id,
      };

      const respuestaPregunta: { respuesta: number } = await firstValueFrom(this.preguntasService.post(APIENDPOINT.crearPregunta, pregunta));
      if (respuestaPregunta && respuestaPregunta.respuesta) {
        const idPreguntaCreada = respuestaPregunta.respuesta;

        await Promise.all(
          this.opciones.map(async opcion => {
            const opcionCrear = {
              opcion: opcion.opcion,
              id_pregunta: idPreguntaCreada,
              id_asamblea: this.id
            };
            try {
              await firstValueFrom(this.opcionesService.post(APIENDPOINT.createOpcion, opcionCrear));

            } catch (error) {
              console.error('Error al crear la opción:', opcion, error);
            }
          })
        );
        this.router.navigate(['/asambleas/editar-preguntas/', this.id]);
      } else {
        console.error('Error al crear la pregunta:', respuestaPregunta);
      }
    } catch (error) {
      console.error('Error al crear la pregunta o las opciones:', error);
    }
  }

  volver() {
    this.router.navigate(['/asambleas/editar-preguntas/', this.id]);
  }
}  
