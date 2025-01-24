import { Injectable, } from '@angular/core';
import { Conjuntos } from '../../models/conjunto/conjuntos';
import { BaseService } from '../_base.service';
import { HttpClient } from '@angular/common/http';
import { MaestroConjuntosModel } from '../../models/conjunto/maestro-conjuntos';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConjuntoService extends BaseService<Conjuntos, MaestroConjuntosModel>  {
  
  private apiurl: string;
  constructor(protected http: HttpClient) {
    super(http, environment.apiURL);
    this.apiurl = environment.apiURL;
  }
};

