import { Injectable } from '@angular/core';
import { BaseService } from '../_base.service';
import { HttpClient } from '@angular/common/http';
import { Asambleas } from '../../models/asamblea/asambleas';
import { MaestroAsambleasModel } from '../../models/asamblea/maestro-asambleas';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsambleaService extends BaseService<Asambleas, MaestroAsambleasModel>  {

  private apiurl: string;
  constructor(protected http: HttpClient) {
    super(http, environment.apiURL);
    this.apiurl = environment.apiURL;
  }

}