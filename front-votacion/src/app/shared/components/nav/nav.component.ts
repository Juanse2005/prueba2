import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { menuLinks, Rol } from '../../commons/const/menu-links';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userRole: Rol | null = null;
  currentUser: any = null; // Para almacenar los datos del usuario actual
  links: { label: string, url: string, subItems?: { label: string, url: string }[] }[] = [];

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.currentUser = currentUser;

    if (currentUser && currentUser.id_rol) {
      this.userRole = currentUser.id_rol as Rol; // Asigna el rol del usuario
      this.loadLinks();
    }
  }

  // Cargar los enlaces según el rol del usuario
  loadLinks(): void {
    if (this.userRole) {
      this.links = menuLinks[this.userRole];
    }
  }

  // Navegar a la URL especificada
  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
  }
}