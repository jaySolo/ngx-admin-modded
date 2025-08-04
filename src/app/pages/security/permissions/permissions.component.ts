import { Component, OnInit } from '@angular/core';
import { LocalDataSource, Row } from 'angular2-smart-table';
import { UserPermission, UserPermissionData } from '../../../@core/interfaces/auth/user-permission';

@Component({
  selector: 'ngx-permissions',
  template: `
    <h1 class="mb-4 mt-0">Application User Permissions</h1>

    <angular2-smart-table [settings]="config"
                    [source]="permissionsSource"
                    (create)="addNewPermission($event)"
                    (edit)="updatePermission($event)"
                    (delete)="deletePermission($event)"
                    (custom)="execCustomAction($event)">
    </angular2-smart-table>
  `,
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {


  config = {
    pager: { perPage: 10 },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus" title="Create User Permission"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit d-none d-lg-block" title="Edit User Permission"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash d-none d-lg-block" title="Archive User Permission"></i>',
    },
    columns: {
      id: { title: 'Permission ID' },
      type: { title: 'Permission Name', type: 'String' },
      policy: { title: 'Policy', type: 'String' },
      role: { title: 'Assigned Role(s)' },
    }
  };

  permissionsSource: LocalDataSource = new LocalDataSource();



  constructor(private api: UserPermissionData) { }



  ngOnInit(): void {
    this.refreshPermissions();
  }



  addNewPermission(event: any): void {
    // this.router.navigateByUrl('pages/security/roles/create', {
    //   state: null,
    // });
  }



  updatePermission(event: Row): void {
    // this.router.navigateByUrl('pages/security/roles/update', {
    //   state: event.getData(),
    // });
  }



  deletePermission(event: any): void {
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
    //     }, () => { this.refreshPermissions(); });
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



  refreshPermissions(): void {
    this.api.listAll().then(result => {
      this.permissionsSource.empty().then(() => {
        // console.log(result)
        this.permissionsSource.load(result);
      });
    });
  }
}
