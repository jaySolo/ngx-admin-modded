import { Component, OnInit, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { User, UserData } from '../../../../@core/interfaces/auth/users';
import { UserRole, UserRoleData } from '../../../../@core/interfaces/auth/user-role';
import { NbDialogService, NbGlobalLogicalPosition, NbToastrService, NB_TOASTR_CONFIG } from '@nebular/theme';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'ngx-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {

  userId: any;
  action: any;
  isNewUser: boolean;
  isEditable: boolean;

  submitted: boolean = false;

  user: any;
  roles: UserRole[];

  dialogRef: any = null;


  constructor(
    private usersApi: UserData,
    private rolesApi: UserRoleData,
    private uri: ActivatedRoute,
    private router: Router,
    private toast: NbToastrService,
    private dialog: NbDialogService,
    protected location: Location,
  ) {
    this.userId = this.uri.snapshot?.paramMap?.get('id') ?? null;

    this.isNewUser = this.userId === null || this.userId === undefined || this.userId.includes('create');

    if (this.router.getCurrentNavigation().extras.state?.user) {
      this.user = this.router.getCurrentNavigation().extras.state.user
    }

    if (this.router.getCurrentNavigation().extras.state?.action) {
      this.action = this.router.getCurrentNavigation().extras.state.action
    }

    this.isEditable = this.action?.includes('edit') || this.action?.includes('update');
  }


  ngOnInit(): void {
    this.fetchData();
  }


  fetchData(): void {
    if (this.isNewUser !== true) {
      forkJoin([
        this.usersApi.get(Number.parseInt(this.userId)),
        this.rolesApi.listAll(),
      ]).subscribe(data => {
        this.user = {
          ...data[0],
          first_name: data[0].firstName,
          last_name: data[0].lastName,
          role: data[0]?.role ?? null,
          status: data[0]?.status ?? 'active',
          password: null,
          confirmPassword: null,
          blocked: data[0]?.blocked ?? null,
          confirmed: data[0]?.confirmed ?? null,
        };
        this.roles = data[1].roles;
      });
    } else {
      this.rolesApi.list(1, -1).subscribe(userRoles => {
        this.user = null;
        this.roles = userRoles;
      });
    }
  }


  async onFormSubmit(event: any) {
    if (this.isNewUser === true) {

      const newUserId = (await this.usersApi.listAll()).sort((a, b) => b.id - a.id)[0].id + 1;

      this.usersApi.create({
        ...event.value,
        id: newUserId,
        userID: `${newUserId}`,
        firstName: event.value.first_name,
        lastName: event.value.last_name,
        status: 'active',   // todo: grab from server instead of setting it
        blocked: false,     // todo: grab from server instead of setting it
      }).subscribe((result) => {
        this.user = {
          ...result,
          first_name: result.firstName,
          last_name: result.lastName,
          password: null,
          confirmPassword: null,
          status: 'active',   // todo: grab from server instead of setting it
          blocked: false,     // todo: grab from server instead of setting it
        };
          this.isEditable = false;
          this.isNewUser = false;
        this.toast.success(null, 'User created successfully',
          {
            icon: 'plus',
            limit: 3,
            position: NbGlobalLogicalPosition.TOP_END,
          });
        setTimeout(() => {
          this.router.navigateByUrl('pages/security/users');
        }, 4500);
      }, (errRes) => {
        this.toast.danger(errRes.error.error.message, 'Failed to create user!',
          {
            icon: 'plus',
            limit: 3,
            position: NbGlobalLogicalPosition.TOP_END,
          });
          this.action += '.';
      });
    } else {
      this.usersApi.update({
        id: event.value.id,
        firstName: event.value.first_name,
        lastName: event.value.last_name,
        username: event.value.username,
        email: event.value.email,
        status: event.value.status,
        blocked: event.value.blocked,
        confirmed: event.value.confirmed,
        // role: event.value.role
      }).subscribe((result) => {
        this.user = {
          ...result,
          first_name: result.firstName,
          last_name: result.lastName,
          password: null,
          confirmPassword: null,
          status: 'active',   // todo: grab from server instead of setting it
          blocked: false,     // todo: grab from server instead of setting it
        };
        this.toast.success(null, 'User updated successfully',
          {
            icon: 'edit',
            limit: 3,
            position: NbGlobalLogicalPosition.TOP_END,
          });
          this.isEditable = false;
        this.action = 'view';
        setTimeout(() => {
          this.router.navigateByUrl('pages/security/users');
        }, 4500);
      }, (errRes) => {
        this.toast.danger(errRes.error.error.message, 'Failed to update user!',
          {
            icon: 'edit',
            limit: 3,
            position: NbGlobalLogicalPosition.TOP_END,
          });
          this.action += '.'
      });
    }
  }


  onFormCancel(): void {
    if (this.isNewUser === true) {
      this.toast.warning('You cancelled the task.', 'Creating User Aborted',
        {
          icon: 'plus',
          limit: 3,
          position: NbGlobalLogicalPosition.TOP_END,
        });
      this.router.navigateByUrl('pages/security/users');
    } else {
      this.isEditable = false;
      this.toast.warning('You cancelled the task.', 'Updating User\'s Information Aborted',
        {
          icon: 'edit',
          limit: 3,
          position: NbGlobalLogicalPosition.TOP_END,
        });
        this.action = 'view'
    }
  }

  editUser() {
    this.isEditable = true;
    this.action = 'edit';
  }


  spawnDelDialog(dialogTemplate: TemplateRef<any>): void {
    this.dialogRef = this.dialog.open(dialogTemplate);
    this.dialogRef.onClose.subscribe((deleteUser) => {
      if (deleteUser === true) {
        this.usersApi.delete(this.userId).subscribe((result) => {
          this.toast.success(null, 'User deleted successfully',
            {
              icon: 'trash',
              limit: 3,
              position: NbGlobalLogicalPosition.TOP_END,
            });
          this.router.navigateByUrl('pages/security/users');
        }, (errRes) => {
          this.toast.danger(errRes.error.error.message, 'Failed to delete user!',
            {
              icon: 'trash',
              limit: 3,
              position: NbGlobalLogicalPosition.TOP_END,
            });
        })
      } else {
        this.toast.warning('You cancelled the task.', 'Deleting User Aborted',
          {
            icon: 'trash',
            limit: 3,
            position: NbGlobalLogicalPosition.TOP_END,
          });
      }
    });
  }


  deleteUser(): void {
    if (this.dialogRef) {
      this.dialogRef.close(true);
      this.dialogRef = null;
    }
  }


  dismissDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close(false);
      this.dialogRef = null;
    }
  }

  back(): boolean {
    this.location.back();
    return false;
  }
}
