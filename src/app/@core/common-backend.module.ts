import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { NbAuthModule } from '@nebular/auth';
import { SmartTableQueryInterceptor } from './interceptors/smart-table-query-interceptor';



const APIS = [
  // backend apis go here
];


const SERVICES_WITH_ABSTRACT_CLASS = [
  // services with abstract classes go here
];


@NgModule({
  imports: [CommonModule, NbAuthModule],
})
export class CommonBackendModule {
  static forRoot(): ModuleWithProviders<CommonBackendModule> {
    return {
      ngModule: CommonBackendModule,
      providers: [
        ...APIS,
        ...SERVICES_WITH_ABSTRACT_CLASS,
        { provide: HTTP_INTERCEPTORS, useClass: SmartTableQueryInterceptor, multi: true },
      ],
    };
  }
}
