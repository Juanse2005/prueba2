import { Injectable} from '@angular/core';
import { BaseService } from '../_base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AdminConjuntos } from '../../models/admin_conjunto/admin-conjuntos';
import { MaestroAdminsConjuntosModel } from '../../models/admin_conjunto/maestro-admins-conjuntos';

@Injectable({
  providedIn: 'root',
})
export class AdminConjuntoService extends BaseService<AdminConjuntos, MaestroAdminsConjuntosModel> {

  private apiurl: string;
  constructor(protected http: HttpClient) {
    super(http, environment.apiURL);
    this.apiurl = environment.apiURL;
  }
}
