import { Injectable, } from '@angular/core';
import { BaseService } from '../_base.service';
import { HttpClient } from '@angular/common/http';
import { Documentos } from '../../models/documento/documentos';
import { environment } from '../../../../environments/environment';
import { MaestroDocumentosModel } from '../../models/documento/maestro-documentos';

@Injectable({
  providedIn: 'root',
})
export class DocumentosService extends BaseService<Documentos, MaestroDocumentosModel> {

  private apiurl: string;
  constructor(protected http: HttpClient) {
    super(http, environment.apiURL);
    this.apiurl = environment.apiURL;
  }
};

