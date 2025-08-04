import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
// import { SharedModule } from '../../@theme/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    // SharedModule
  ]
})
export class SecurityModule { }
