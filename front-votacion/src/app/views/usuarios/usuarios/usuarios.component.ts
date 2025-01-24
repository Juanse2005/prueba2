import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIENDPOINT } from '../../../config/configuration';
import { Usuarios, UsuariosResponse } from '../../../shared/models/usuario/usuarios';
import { UsuarioService } from '../../../shared/services/usuarios/usuario.service';
import { ConjuntoResponse } from '../../../shared/models/conjunto/conjuntos';
import { ConjuntoService } from '../../../shared/services/conjunto/conjunto.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  id_conjunto: number | undefined;

  page = 1;
  pageSize = 6;
  totalUsuarios = 0;
  usuarios: UsuariosResponse[] = [];
  filteredUsuarios: UsuariosResponse[] = []; // Para almacenar los resultados filtrados
  searchUsuarios: string = '';

  conjuntos: ConjuntoResponse = {} as ConjuntoResponse;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly usuarioService: UsuarioService,
    private readonly conjuntoService: ConjuntoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_conjunto = +params['id']; // Convierte el id a número
      if (this.id_conjunto) {
        this.refreshUsuarios(); // Llama a la función para obtener el usuario
        this.tituloUsuario()
      }
    });
  }

  tituloUsuario() {
    if (!this.id_conjunto) return;
    this.conjuntoService.getById(APIENDPOINT.getAllConjuntos, this.id_conjunto).subscribe({
      next: (data: any) => {
        this.conjuntos = data.respuesta[0].nombre;
      },
      error: (error) => console.error('Error al obtener titulo', error),
    });
  }

  editarUsuario(id_usuario: number) {
    this.router.navigate(['/usuarios/edicion-usuario', this.id_conjunto, id_usuario]);
  }

  refreshUsuarios() {
    if (this.id_conjunto) {
      this.usuarioService.getUsuarioById(APIENDPOINT.getAllUsuarios, this.id_conjunto).subscribe((data: Usuarios) => {
        if (data && data.respuesta && data.respuesta.length > 0) {
          this.usuarios = data.respuesta;

          // Actualizar el total de usuarios después de obtener los datos
          this.totalUsuarios = this.usuarios.length;
          this.filterUsuarios();  // Filtrar usuarios si es necesario

        } else {
          console.error('No se encontró el administrador o la respuesta está vacía');
        }
      }, error => {
        console.error('Error al obtener el administrador:', error);
      });
    }
  }

  filterUsuarios() {
    // Filtrar según el término de búsqueda
    const searchTerm = this.searchUsuarios.toLowerCase();
    const filteredResults = this.usuarios.filter(usuarios =>
      usuarios.nombre.toLowerCase().includes(searchTerm) ||
      usuarios.email.includes(searchTerm)
    );

    // Actualizar el total de usuarios filtrados
    this.totalUsuarios = filteredResults.length;

    // Aplicar paginación
    const start = (this.page - 1) * this.pageSize;
    this.filteredUsuarios = filteredResults.slice(start, start + this.pageSize);
  }

  trackById(index: number, item: UsuariosResponse): number {
    return item.id_usuario ?? index;
  }

  onSearchTermChange(): void {
    this.page = 1; // Reiniciar a la primera página cuando cambie el término de búsqueda
    this.filterUsuarios(); // Filtrar cada vez que cambie el término de búsqueda
  }

  //Cambio de estado
  toggleEstado(usuario: UsuariosResponse) {
    usuario.estado = usuario.estado === 'Activo' ? 'Inactivo' : 'Activo';
    this.usuarioService.delete(APIENDPOINT.deleteUsuario, usuario.id_usuario!, usuario).subscribe({
      next: (response) => {
        console.log('Estado del usuario actualizado exitosamente:');
      },
      error: (error) => {
        console.error('Error al actualizar el estado del usuario:', error);
        if (error.status === 401) {
          console.error('No autorizado, redirigiendo al login');
        } else {
          console.error('Error no manejado:', error);
        }
      }
    });
  }


  volver() {
    this.router.navigate(['/conjuntos']);
  }
}
