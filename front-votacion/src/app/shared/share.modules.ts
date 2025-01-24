//Share modules comparte componentes entre módulos para ser reutilizados

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule} from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { AnimationComponent } from './components/animation/animation.component';
import {ChartModule} from 'primeng/chart';
import { InviteModalComponent } from './components/invite-modal/invite-modal.component';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ChartModule,
		NgbPaginationModule,
		NgbTypeaheadModule
	],
	declarations: [
		FooterComponent,
		NavComponent,
		AnimationComponent,
		InviteModalComponent,

	],
	exports: [
		CommonModule,
		FormsModule,
		FooterComponent,
		NavComponent,
		AnimationComponent,
		ChartModule,
		InviteModalComponent,
		NgbPaginationModule,
		NgbTypeaheadModule,
		
	],
})

export class ShareModules { }
