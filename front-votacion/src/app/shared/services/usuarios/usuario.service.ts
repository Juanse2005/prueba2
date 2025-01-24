import { Injectable} from '@angular/core';
import { BaseService } from '../_base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Usuarios } from '../../models/usuario/usuarios';
import { MaestroUsuariosModel } from '../../models/usuario/maestro-usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends BaseService<Usuarios, MaestroUsuariosModel> {

  private apiurl: string;
  constructor(protected http: HttpClient) {
    super(http, environment.apiURL);
    this.apiurl = environment.apiURL;
  }
}
