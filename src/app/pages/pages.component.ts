import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu: NbMenuItem[] = MENU_ITEMS;  // [];

  // ngOnInit(): void {
  //   this.loadAuthorizedMenuItems(MENU_ITEMS);
  // }


  // private loadAuthorizedMenuItems(items: (NbMenuItem | any)[]): void {
  //   items.forEach(item => {
  //     if (item.permissions === null) {
  //       this.menu.push(item);
  //     } else {
  //       const permCombo = item.permissions.combination.toLowerCase();

  //       let hasAccess: boolean = permCombo === 'all' ? true : permCombo === 'any';

  //       item.permissions.list.forEach(permission => {
  //         const hasItemPerm = this.acl.can(this.userRole, permission.access, permission.resource);

  //         hasAccess = permCombo === 'all' ? hasAccess && hasItemPerm : (
  //           permCombo === 'any' ? hasAccess || hasItemPerm : false
  //         );
  //       });

  //       if (hasAccess === true) {
  //         this.menu.push(item);
  //       }
  //     }
  //   });
  // }
}
