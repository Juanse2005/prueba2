import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsambleaService } from '../../../shared/services/asamblea/asamblea.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InviteModalComponent } from '../../../shared/components/invite-modal/invite-modal.component';
import { AsambleaResponse } from '../../../shared/models/asamblea/asambleas';
import { APIENDPOINT } from '../../../config/configuration';
import { AdminConjuntoService } from '../../../shared/services/admin_conjunto/adminConjunto.service';
import { AdminResponse } from '../../../shared/models/admin/admins';
import { AdminConjuntos, AdminConjuntosResponse } from '../../../shared/models/admin_conjunto/admin-conjuntos';
import { ConjuntoResponse } from '../../../shared/models/conjunto/conjuntos';

@Component({
  selector: 'app-creacion-asamblea',
  templateUrl: './creacion-asamblea.component.html',
  styleUrls: ['./creacion-asamblea.component.css']
})
export class CreacionAsambleaComponent implements OnInit {
  nombre: string = '';
  asamblea: AsambleaResponse = {} as AsambleaResponse;

  activarUbicacion: boolean = false;

  selectedOption: any;

  adminConjuntos: AdminConjuntosResponse[] = [];

  admin: AdminResponse = {} as AdminResponse

  conjunto: ConjuntoResponse = {} as ConjuntoResponse;

  selectedFile: File | null = null;
  selectedFileName: string = '';
  fileTouched: boolean = false;
  errorFile: string = '';

  constructor(private readonly router: Router, private readonly asambleaService: AsambleaService, private readonly modalService: NgbModal, private readonly adminConjuntoService: AdminConjuntoService) { }


  ngOnInit(): void {

    const currentUserId = JSON.parse(localStorage.getItem('currentUser') ?? '{}');
    const idusuarioActual = currentUserId.id_admin || 'Usuario desconocido';
    this.admin.id_admin = idusuarioActual;

    this.adminConjuntoService.getById(APIENDPOINT.getAllAdminConjuntos, idusuarioActual).subscribe((data: AdminConjuntos) => {
      this.adminConjuntos = data.respuesta || [];
    });

    const conjuntoDataName = JSON.parse(localStorage.getItem('conjunto') ?? '{}');
    this.conjunto.nombre = conjuntoDataName.nombre_conjunto;


    const conjuntoData = JSON.parse(localStorage.getItem('conjunto') ?? '{}');
    const idconjuntoActual = conjuntoData.id_conjunto;
    this.asamblea.id_conjunto = idconjuntoActual;

  }

  openInviteModal() {
    this.modalService.open(InviteModalComponent, { ariaLabelledBy: 'modal-basic-title' });
  }

  openFileDialog() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx';
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension === 'xlsx') {
          this.selectedFile = file;
          this.selectedFileName = file.name;
          console.log('Archivo seleccionado:', file.name);
        } else {
         this.errorFile = 'Solo se permiten archivos con extensión .xlsx';
        }
      }
    });
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  }

  saveAsamblea() {
    this.fileTouched = true;
    if (this.selectedFile) {
      this.asambleaService.post(APIENDPOINT.createAsamblea, this.asamblea).subscribe({
        next: (response) => {
          this.router.navigate(['/asambleas']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          } else {
            console.error('Error no manejado:', error);
          }
        }
      });
    } else {
      console.log('Tiene que agregar archivo de invitacion');
    }
  }
  volver() {
    this.router.navigate(['/asambleas']);
  }
}