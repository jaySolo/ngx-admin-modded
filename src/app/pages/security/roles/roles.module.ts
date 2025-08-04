import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RolesRoutingModule } from './roles-routing.module';
import { Angular2SmartTableModule } from 'angular2-smart-table';
// import { SharedModule } from '../../../@theme/shared.module';



@NgModule({
  declarations: [
    RolesComponent,
  ],
  imports: [
    CommonModule,
    Angular2SmartTableModule,
    RolesRoutingModule,
    // SharedModule
  ],
})
export class RolesModule { }
