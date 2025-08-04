import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme';
import { LocalDataSource, Row } from 'angular2-smart-table';
import { UserData } from '../../../@core/interfaces/auth/users';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  config: any;
  usersSource: any;

  constructor(
    private api: UserData,
    private router: Router,
    // private dialog: NbDialogService,
    private toastr: NbToastrService,
  ) {
    api.listAll().then(u => {
      console.log(u)
    })
  }


  ngOnInit(): void {
    this.config = {
      mode: 'external',
      pager: { perPage: 10 },
      actions: {
        add: true,     // TODO: replace with user service method 'hasPermission(create-user)'
        edit: false,    // TODO: replace with user service method 'hasPermission(update-user)'
        delete: false,  // TODO: replace with user service method 'hasPermission(delete-user)'
        custom: [
          {
            name: 'details',
            title: `
                <i class="ion ion-ios-information-outline m-0 p-0"
                  style="font-size:small" title="View User's Details">
                </i>
              `,
          },
          {

            name: 'change-password',
            title: `
                <i class="ion ion-key m-0 p-0"
                  style="font-size:small" title="Change User's Password">
                </i>
              `,
          }
        ],
        position: 'right',
      },
      add: {
        addButtonContent: '<i class="nb-plus" title="Create new Report"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit d-none d-lg-block" title="Edit Report"></i>',
      },
      delete: {
        // deleteButtonContent: '<i class="nb-trash d-none d-lg-block" title="Delete Report"></i>',
      },
      columns: {
        avatar: {
          title: '',
          type: 'html',
          filter: false,
          sort: false,
          valuePrepareFunction: (_cell_, _row_) =>
            `<img src="../../../../assets/images/default-user-avatar.png" width="48" height="48" class="rounded-circle mr-1"/>`,
        },
        username: { title: 'Username' },
        firstName: { title: 'First Name', type: 'String' },
        lastName: { title: 'Last Name', type: 'String' },
        email: { title: 'E-mail Address' },
        // departments: {
        //   title: 'Departments',
        //   type: 'string',
        //   valuePrepareFunction: (departs, _row_) => {
        //     let items = '';
        //     departs.forEach((dept, d) => {
        //         items += dept.name;
        //         if (departs.indexOf(dept) < departs.length -1) {
        //           items += ', ';
        //         }
        //     });
        //     return items
        //   }
        // },
        status: { title: 'Status' },
      }
    };

    this.usersSource = new LocalDataSource();

    this.refreshUsers();
  }



  refreshUsers(): void {
    this.api.listAll().then(users => {
      this.usersSource.empty().then(() => {
        this.usersSource.load(users);
      });
    });
  }


  addNewUser(event: any): void {
    this.router.navigateByUrl('pages/security/users/create', {
      state: {
        action: 'create',
        user: null,
      },
    });
  }
  execCustomAction(event: any): void {
    switch(event.action) {
      case 'change-password':
        this.toastr.info('This feature is currently unavailable', 'Coming soon',
        {
          limit: 3,
          position: NbGlobalLogicalPosition.TOP_END,
        })
        break;
      case 'details': default:
        this.router.navigateByUrl(`pages/security/users/${event.data.id}`, {
          state: {
            action: 'view'
          }
        });
        break;
    }
  }

}
