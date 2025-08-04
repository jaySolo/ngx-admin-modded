import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleUserComponent } from './single-user/single-user.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: ':id',
    component: SingleUserComponent,
  },
  {
    path: 'create',
    component: SingleUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
