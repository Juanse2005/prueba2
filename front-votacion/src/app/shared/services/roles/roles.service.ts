import { Injectable, } from '@angular/core';
import { BaseService } from '../_base.service';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../../models/roles/roles';
import { environment } from '../../../../environments/environment';
import { MaestroRolesModel } from '../../models/roles/maestro-roles';

@Injectable({
    providedIn: 'root',
})
export class RolesService extends BaseService<Roles, MaestroRolesModel> {

    private apiurl: string;
    constructor(protected http: HttpClient) {
        super(http, environment.apiURL);
        this.apiurl = environment.apiURL;
    }
};
