import { Injectable } from '@angular/core';
import { BaseService } from '../_base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Preguntas } from '../../models/pregunta/preguntas';
import { MaestroPreguntasModel } from '../../models/pregunta/maestro-preguntas';

@Injectable({
    providedIn: 'root',
})
export class PreguntasService extends BaseService<Preguntas, MaestroPreguntasModel> {

    private apiurl: string;
    constructor(protected http: HttpClient) {
        super(http, environment.apiURL);
        this.apiurl = environment.apiURL;
    }
};
