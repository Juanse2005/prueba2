import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentosResponse } from '../../../shared/models/documento/documentos';
import { APIENDPOINT } from '../../../config/configuration';
import { Usuarios, UsuariosResponse } from '../../../shared/models/usuario/usuarios';
import { UsuarioService } from '../../../shared/services/usuarios/usuario.service';
@Component({
  selector: 'app-edicion-usuario',
  templateUrl: './edicion-usuario.component.html',
  styleUrls: ['./edicion-usuario.component.css']
})
export class EdicionUsuarioComponent implements OnInit {
  id_conjunto: number | undefined;
  documentos: DocumentosResponse[] = [];

  userId: number | undefined;
  conjuntoId: number | undefined;

  usuarios: UsuariosResponse = {} as UsuariosResponse;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.conjuntoId = +params['conjuntoId']; // Captura preguntaId si está presente        
      this.userId = +params['userId']; // Captura asambleaId

    });

    if (this.conjuntoId) {
      this.getUsuariosById();
    }

  }

  getUsuariosById() {
    if (this.conjuntoId) {
      this.usuarioService.getUsuarioById(APIENDPOINT.getAllUsuarios, this.conjuntoId, this.userId).subscribe((data: Usuarios) => {
        console.log(data);

        if (data && data.respuesta && data.respuesta.length > 0) {
          const conjuntoData = data.respuesta[0];

          this.usuarios = conjuntoData;
        } else {
          console.error('No se encontró el usuario o la respuesta está vacía');
        }
      }, error => {
        console.error('Error al obtener el usuario:', error);
      });
    }
  }

  saveUsuario(form: NgForm) {
    if (form.valid) {
      if (this.userId) {

        //Edita el usuario
        this.usuarios.pass = this.usuarios.password ?? null;

        this.usuarioService.put(APIENDPOINT.updateUsuario, this.userId, this.usuarios).subscribe({
          next: (response) => {
            this.router.navigate(['/usuarios', this.conjuntoId]);
          },
          error: (error) => {
            console.error('Error al editar usuario:', error);
            if (error.status === 401) {
              console.error('No autorizado, redirigiendo al login');
              this.router.navigate(['/login']);
            } else {
              console.error('Error no manejado:', error);
            }
          }
        });
      } else {
        console.log('Formulario inválido');
      }
    } else {
      console.log('Formulario inválido');
    }
  }

  volver() {
    this.router.navigate(['/usuarios', this.conjuntoId]);
  }
}
