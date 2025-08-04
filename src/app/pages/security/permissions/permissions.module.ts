import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsComponent } from './permissions.component';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { Angular2SmartTableModule } from 'angular2-smart-table';
// import { SharedModule } from '../../../@theme/shared.module';



@NgModule({
  declarations: [
    PermissionsComponent,
  ],
  imports: [
    CommonModule,
    Angular2SmartTableModule,
    PermissionsRoutingModule,
  ]
})
export class PermissionsModule { }
