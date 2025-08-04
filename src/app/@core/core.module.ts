import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule } from '@nebular/auth';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  SeoService,
  StateService,
} from './utils';
import { UserData } from './interfaces/auth/users';

import { UserStore } from './stores/user.store';
import { InitUserService } from '../@theme/services/init-user.service';
import { SettingsService } from './services/settings.service';
import { CommonBackendModule } from './common-backend.module';
import { UsersService } from './services/auth/users.service';
import { HttpService } from './services/common/http.service';
import { UserRoleData } from './interfaces/auth/user-role';
import { UserRolesService } from './services/auth/user-roles.service';
import { UserPermissionData } from './interfaces/auth/user-permission';
import { UserPermissionsService } from './services/auth/user-permissions.service';
import { UserRolesApi } from './api/roles.api';
import { UserPermissionsApi } from './api/permissions.api';
import { SettingsApi } from './api/settings.api';
import { UsersApi } from './api/users.api';
import { SettingsData } from './interfaces/common/settings';



const BASE_SERVICES = [
  { provide: HttpService },
]

const AUTH_APIS = [
  UsersApi,
  UserRolesApi,
  UserPermissionsApi,
]

const AUTH_SERVICES = [
  { provide: UserPermissionData, useClass: UserPermissionsService },
  { provide: UserRoleData, useClass: UserRolesService },
  { provide: UserData, useClass: UsersService },
  { provide: UserStore },
  { provide: InitUserService },
];

export const NB_CORE_PROVIDERS = [

  ...BASE_SERVICES,
  
  ...AUTH_APIS,
  ...AUTH_SERVICES,

  ...CommonBackendModule.forRoot().providers,

  AnalyticsService,
  LayoutService,
  SeoService,
  StateService,
];

@NgModule({
  imports: [ CommonModule ],
  exports: [ NbAuthModule ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        
        SettingsApi,
       { provide: SettingsData, useClass: SettingsService },
      ],
    };
  }
}
