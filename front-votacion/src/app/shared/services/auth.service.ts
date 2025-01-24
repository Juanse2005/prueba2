import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey: string = 'currentUser';
  private readonly storageKeyConjunto: string = 'conjunto';

  protected apiUrl = environment.apiURL

  constructor(private readonly http: HttpClient, private readonly router: Router,) { }

  login(endpoint: string, email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/${endpoint}`, { correo: email, password }).pipe(
      tap((response) => this.setCurrentUser(response)),
      catchError((error) => {
        return throwError(() => 'Credenciales inválidas');
      })
    );
  }

  setCurrentUser(user: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.storageKeyConjunto);
    this.router.navigate(['/login']);
  }


  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  }
}

