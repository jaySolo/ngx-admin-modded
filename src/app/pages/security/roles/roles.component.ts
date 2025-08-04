import { Component, OnInit } from '@angular/core';
import { LocalDataSource, Row } from 'angular2-smart-table';
import { UserRoleData } from '../../../@core/interfaces/auth/user-role';

@Component({
  selector: 'ngx-roles',
  template: `
    <h1 class="mb-4 mt-0">Application User Roles</h1>

    <angular2-smart-table [settings]="config"
                    [source]="rolesSource"
                    (create)="addNewRole($event)"
                    (edit)="updateRole($event)"
                    (delete)="deleteRole($event)"
                    (custom)="execCustomAction($event)">
    </angular2-smart-table>
  `,
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {


  config = {
    pager: { perPage: 5 },
    actions: {
      add: false,     // TODO: replace with user service method 'hasPermission(create-user-role)'
      edit: false,    // TODO: replace with user service method 'hasPermission(update-user-role)'
      delete: false,  // TODO: replace with user service method 'hasPermission(delete-user-role)'
      position: 'right',
    },
    add: {
      addButtonContent: '<i class="nb-plus" title="Create User Role"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit d-none d-lg-block" title="Edit User Role"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash d-none d-lg-block" title="Archive User Role"></i>',
    },
    columns: {
      id: { title: 'Role ID' },
      name: { title: 'Role Name', type: 'String' },
      description: { title: 'Description', type: 'String' },
    }
  };

  rolesSource: LocalDataSource = new LocalDataSource();


  constructor(
    private api: UserRoleData,
  ) { }


  ngOnInit(): void {
    this.refreshRoles();
  }






  addNewRole(event: any): void {
    // this.router.navigateByUrl('pages/security/roles/create', {
    //   state: null,
    // });
  }

  updateRole(event: Row): void {
    // this.router.navigateByUrl('pages/security/roles/update', {
    //   state: event.getData(),
    // });
  }

  deleteRole(event: any): void {
    // this.dialog.open(UserInfoComponent, {
    //   context: {
    //     user: event.getData(),
    //     isModal: true,
    //     isDeleting: true,
    //   },
    // }).onClose.subscribe((deleteConfirmed: boolean) => {
    //   if (deleteConfirmed) {
    //     // spawn admin password confirm dialog

    //     // send request and process
    //     this.api.delete(event.getData().id).subscribe(res => {
    //       let user = event.getData();
    //       this.toastr.success(
    //         `The account for ${user.first_name} ${user.last_name} has been deleted!`,
    //         'Delete User Account Successful',
    //         {
    //           icon: 'edit',
    //           limit: 3, position: NbGlobalLogicalPosition.TOP_END,
    //         },
    //       );
    //     }, err => {
    //       this.toastr.danger(
    //         err.error.data[0].messages[0].message,
    //         'Delete User Account Failure',
    //         {
    //           icon: 'edit',
    //           limit: 3, position: NbGlobalLogicalPosition.TOP_END,
    //         },
    //       );
    //     }, () => { this.refreshRoles(); });
    //   }
    // });
  }

  execCustomAction(event: any): void {
    // switch (event.action) {
    //   case 'details':
    //     this.dialog.open(UserInfoComponent, {
    //       context: {
    //         user: event.data,
    //         isModal: true,
    //       },
    //       // dialogClass: 'w-75',
    //     });
    //     break;
    // }
  }

  refreshRoles(): void {
    this.api.listAll().then(result => {
      this.rolesSource.empty().then(() => {
        this.rolesSource.load(result.roles);
      });
    });
  }

}
