import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { RolesService } from '../../../shared/services/roles/roles.service';
import { DocumentosService } from '../../../shared/services/documento/documentos.service';
import { APIENDPOINT } from '../../../config/configuration';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isAdmin: boolean = false; // Estado del switch
  errorMessage: string = '';

  constructor(private readonly authService: AuthService, private readonly router: Router, private readonly rolesService: RolesService, private readonly documentosService: DocumentosService) { }

  async onLogin() {
    const endpoint = this.isAdmin ? 'login' : 'loginUsuario'; // Cambia el endpoint según el switch

    try {
      const response = await this.authService
        .login(endpoint, this.email, this.password)
        .toPromise();

      const user = response.respuesta;
      this.authService.setCurrentUser(user);

      try {
        const rolesResponse = await this.rolesService.get(APIENDPOINT.getAllRoles).toPromise();
        localStorage.setItem('roles', JSON.stringify(rolesResponse));

      } catch (rolesError) {
        console.error('Error al consultar roles:', rolesError);
      }

      try {

        const documentosResponse = await this.documentosService.get(APIENDPOINT.getAllDocumentos).toPromise();
        localStorage.setItem('documentos', JSON.stringify(documentosResponse));

      } catch (documentosError) {
        console.error('Error al consultar roles:', documentosError);
      }

      // Redirige según el rol
      const redirectUrl = this.getRedirectUrl(user.id_rol);
      this.router.navigate([redirectUrl]);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.errorMessage = 'Credenciales inválidas';
    }
  }

  private getRedirectUrl(role: number): string {
    switch (role) {
      case 1: return '/home'; // Usuario
      case 2: return '/asambleas'; // Admin
      case 3: return '/administradores'; // Super Admin
      default: return '/';
    }
  }
}
