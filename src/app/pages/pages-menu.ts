import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'monitor-outline',
    link: '/pages/dashboard',
    home: true,
    permissions: null,
  },
  // add other menu items here
  {
    title: 'User Management',
    icon: 'people-outline',
    link: '/pages/security/users',
    // permissions: {
    //   combination: 'all',
    //   list: [
    //     { resource: 'plugin::users-permissions::user', access: 'find' },
    //     { resource: 'plugin::users-permissions::user', access: 'findOne' },
    //   ],
    // },
  },
  {
    title: 'User Role Management',
    icon: 'people-outline',
    link: '/pages/security/roles',
    // permissions: {
    //   combination: 'all',
    //   list: [
    //     { resource: 'plugin::users-permissions::role', access: 'find' },
    //     { resource: 'plugin::users-permissions::role', access: 'findOne' },
    //   ],
    // },
  },
];
