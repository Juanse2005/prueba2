import { Injectable, } from '@angular/core';
import { BaseService } from '../_base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Opciones } from '../../models/opcion/opciones';
import { MaestroOpcionesModel } from '../../models/opcion/maestro-opciones';

@Injectable({
    providedIn: 'root',
})
export class OpcionesService extends BaseService<Opciones, MaestroOpcionesModel> {

    private apiurl: string;
    constructor(protected http: HttpClient) {
        super(http, environment.apiURL);
        this.apiurl = environment.apiURL;
    }
};
