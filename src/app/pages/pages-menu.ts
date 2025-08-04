import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'monitor-outline',
    link: '/pages/dashboard',
    home: true,
  },
  // add other menu items here
  {
    title: 'User Management',
    icon: 'people-outline',
    link: '/pages/security/users',
  },
  {
    title: 'User Role Management',
    icon: 'people-outline',
    link: '/pages/security/roles',
  },
];
