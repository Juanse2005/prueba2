import { Injectable, } from '@angular/core';
import { BaseService } from '../_base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Votaciones } from '../../models/votacion/votaciones';
import { MaestroVotacionesModel } from '../../models/votacion/maestro-votaciones';

@Injectable({
    providedIn: 'root',
})
export class VotacionService extends BaseService<Votaciones, MaestroVotacionesModel> {

    private apiurl: string;
    constructor(protected http: HttpClient) {
        super(http, environment.apiURL);
        this.apiurl = environment.apiURL;
    }
};
