import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbToggleModule } from '@nebular/theme';
import { SingleUserComponent } from './single-user/single-user.component';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { UsersComponent } from './users.component';



@NgModule({
  declarations: [
    UsersComponent,
    UserInfoComponent,
    UserFormComponent,
    SingleUserComponent,
  ],
  imports: [
    CommonModule,
    Angular2SmartTableModule,
    FormsModule,
    NbButtonModule,
    NbCardModule,
    NbDialogModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbTabsetModule,
    NbToggleModule,
    ReactiveFormsModule,
    UsersRoutingModule,
  ],
  exports: [
    UserInfoComponent,
  ],
})
export class UsersModule { }
