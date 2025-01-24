import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export abstract class BaseService<TModel, TMasterModel> {

  public headers = new HttpHeaders();


  constructor(protected _httpClient: HttpClient, protected apiURL = environment.apiURL) { }

  private setHeaders(authRequired: boolean = false): void {
    if (authRequired) {
      const token = localStorage.getItem('token') ?? '';
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      });
    } else {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
    }
  }

  getById(endpoint: string, id: string | number, authRequired: boolean = false): Observable<TModel> {
    // this.setHeaders(authRequired);
    return this._httpClient.get<TModel>(`${this.apiURL}/${endpoint}/${id}`, { headers: this.headers });
  }

  get(endpoint: string, authRequired: boolean = false): Observable<TModel> {
    // this.setHeaders(authRequired);
    return this._httpClient.get<TModel>(`${this.apiURL}/${endpoint}`, { headers: this.headers });
  }

  post<T>(endpoint: string, data: any, authRequired: boolean = false): Observable<T> {
    return this._httpClient.post<T>(`${this.apiURL}/${endpoint}`, data, { headers: this.headers });
  }
  

  put(endpoint: string, id: string | number, data: any, authRequired: boolean = false): Observable<TModel> {
    // this.setHeaders(authRequired);
    return this._httpClient.put<TModel>(`${this.apiURL}/${endpoint}/${id}`, data, { headers: this.headers });
  }

  delete(endpoint: string, id: string | number, data: any, authRequired: boolean = false): Observable<TModel> {
    // this.setHeaders(authRequired);
    return this._httpClient.put<TModel>(`${this.apiURL}/${endpoint}/${id}`, data, { headers: this.headers });
  }


  getAsambleasAdmin(endpoint: string, params: { adminId: string | number, conjuntoId?: number }, authRequired: boolean = false): Observable<TModel> {
    // this.setHeaders(authRequired);
    let httpParams = new HttpParams().set('adminId', params.adminId.toString());
    if (params.conjuntoId) {
      httpParams = httpParams.set('conjuntoId', params.conjuntoId.toString());
    }

    return this._httpClient.get<TModel>(`${this.apiURL}/${endpoint}`, { headers: this.headers, params: httpParams });
  }

  getAsambleasUser(endpoint: string, userId: string | number, authRequired: boolean = false): Observable<TModel> {
    // this.setHeaders(authRequired);
    const params = new HttpParams().set('userId', userId.toString());

    return this._httpClient.get<TModel>(`${this.apiURL}/${endpoint}`, { headers: this.headers, params });
  }

  getVotacionRespuesta(endpoint: string, userId: string | number, preguntaId: string | number, authRequired: boolean = false): Observable<TModel> {
    const params = new HttpParams()
      .set('id_usuario', userId.toString())
      .set('id_pregunta', preguntaId.toString());

    return this._httpClient.get<TModel>(`${this.apiURL}/${endpoint}`, { headers: this.headers, params });
  }

  getReporteriaById(endpoint: string, asambleaId: string | number, preguntaId?: string | number, authRequired: boolean = false): Observable<TModel> {
    let params = new HttpParams().set('id_asamblea', asambleaId.toString());
    if (preguntaId) {
      params = params.set('id_pregunta', preguntaId.toString());
    }

    return this._httpClient.get<TModel>(`${this.apiURL}/${endpoint}`, { headers: this.headers, params });
  }


  getUsuarioById(endpoint: string, conjuntoId: string | number, userId?: string | number, authRequired: boolean = false): Observable<TModel> {
    let params = new HttpParams().set('id_conjunto', conjuntoId.toString());
    if (userId) {
      params = params.set('id_usuario', userId.toString());
    }

    return this._httpClient.get<TModel>(`${this.apiURL}/${endpoint}`, { headers: this.headers, params });
  }

}
