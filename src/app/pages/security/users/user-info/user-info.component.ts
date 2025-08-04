import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../@core/interfaces/auth/users';

@Component({
  selector: 'ngx-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent /* implements OnInit */ {

  @Input() user: User;
  @Input() isModal: boolean = false;
  // @Input() isDeleting: boolean = false;

  constructor() { }

  // ngOnInit(): void {
  // }

}
