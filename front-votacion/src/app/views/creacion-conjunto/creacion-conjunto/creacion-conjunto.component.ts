import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Conjuntos, ConjuntoResponse } from '../../../shared/models/conjunto/conjuntos';
import { ConjuntoService } from '../../../shared/services/conjunto/conjunto.service';
import { DocumentosResponse } from '../../../shared/models/documento/documentos';
import { APIENDPOINT } from '../../../config/configuration';

@Component({
  selector: 'app-creacion-conjunto',
  templateUrl: './creacion-conjunto.component.html',
  styleUrls: ['./creacion-conjunto.component.css']
})
export class CreacionConjuntoComponent implements OnInit {
  id: number | undefined;
  documentos: DocumentosResponse[] = [];

  conjunto: ConjuntoResponse = {} as ConjuntoResponse;
  isEditMode: boolean = false;
  titulo: string = 'Crear nuevo conjunto';
  
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public conjuntoService: ConjuntoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convierte el id a número
      if (this.id) {
        this.isEditMode = true;
        this.titulo = 'Editar conjunto';
        this.getConjuntoById(); // Llama a la función para obtener el conjunto
      }
    });

    // Obtiene el nombre del usuario actual y lo coloca en el campo usuario_modificacion 
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const usuarioActual = currentUser.nombre || 'Usuario desconocido';
    this.conjunto.usuario_modificacion = usuarioActual;

    // Obtiene los documentos guardados y los coloca en el campo documentos
    const docs = JSON.parse(localStorage.getItem('documentos') || '{}');
    this.documentos = docs.respuesta;

    //Se obtiene la fecha actual y se coloca en el campo

    const today = new Date();
    this.conjunto.ultima_modificacion = today.toISOString().split('T')[0];
  }

  getConjuntoById() {
    if (this.id) {
      this.conjuntoService.getById(APIENDPOINT.getAllConjuntos, this.id).subscribe((data: Conjuntos) => {
        if (data && data.respuesta && data.respuesta.length > 0) {
          const conjuntoData = data.respuesta[0];

          // Verifica si el campo id_conjunto está presente
          console.log('ID del Conjunto:', conjuntoData.id_conjunto);
          console.log('Datos completos del Conjunto:', conjuntoData); // Verifica todos los datos

          this.conjunto = conjuntoData; // Asigna los datos al objeto correspondiente
        } else {
          console.error('No se encontró el administrador o la respuesta está vacía');
        }
      }, error => {
        console.error('Error al obtener el administrador:', error);
      });
    }
  }


  saveConjunto(form: NgForm) {
    if (form.valid) {
      if (this.id) {
        //Edita el conjunto
        this.conjuntoService.put(APIENDPOINT.updateConjunto, this.id, this.conjunto).subscribe({
          next: (response) => {
            console.log('Conjunto editado exitosamente:', response);
            this.router.navigate(['/conjuntos']);
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
        // Crea nuevo conjunto
        this.conjuntoService.post(APIENDPOINT.createConjunto, this.conjunto).subscribe({
          next: (response) => {
            console.log('Administrador creado exitosamente:', response);
            form.reset();
            this.router.navigate(['/conjuntos']);
          },
          error: (error) => {
            console.error('Error al crear administrador:', error);
            if (error.status === 401) {
              console.error('No autorizado, redirigiendo al login');
              this.router.navigate(['/login']);
            } else {
              console.error('Error no manejado:', error);
            }
          }
        });
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  volver() {
    this.router.navigate(['/conjuntos']);
  }
}
