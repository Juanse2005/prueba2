import { Injectable} from '@angular/core';
import { Admins } from '../../models/admin/admins';
import { BaseService } from '../_base.service';
import { MaestroAdminsModel } from '../../models/admin/maestro-admins';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService<Admins, MaestroAdminsModel> {

  private apiurl: string;
  constructor(protected http: HttpClient) {
    super(http, environment.apiURL);
    this.apiurl = environment.apiURL;
  }
}
