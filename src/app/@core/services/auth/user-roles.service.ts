import { Injectable } from '@angular/core';
import { map } from 'leaflet';
import { DataSource } from 'angular2-smart-table';
import { Observable } from 'rxjs';
import { UserRolesApi } from '../../api/roles.api';
import { UserRole, UserRoleData } from '../../interfaces/auth/user-role';

@Injectable()
export class UserRolesService extends UserRoleData {

  constructor(private api: UserRolesApi) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.rolesDataSource;
  }

  listAll(): Promise<any> {
    return this.api.listAll().toPromise();
  }

  list(pageNumber: number = 1, pageSize: number = 10): Observable<UserRole[]> {
    return this.api.list(pageNumber, pageSize);
  }

  get(id: number): Observable<UserRole> {
    return this.api.get(id);
  }

  create(role: any): Observable<UserRole> {
    return this.api.add(role);
  }

  update(role: any): Observable<UserRole> {
    return this.api.update(role);
  }

  delete(id: number): Observable<boolean> {
    return this.api.delete(id);
  }
}
