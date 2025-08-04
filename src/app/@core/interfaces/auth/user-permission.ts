import { DataSource } from 'angular2-smart-table';
import { Observable } from 'rxjs';

export class UserPermission {
  id:	string;
  type: string;
  controller: string;
  action: string;
  enabled: boolean;
  policy?: string;
  role?: string;
  created_by?: string;
  updated_by?: string;
}

export abstract class UserPermissionData {
  abstract get gridDataSource(): DataSource;
  abstract listAll(): Promise<any>;
  abstract list(pageNumber: number, pageSize: number): Observable<UserPermission[]>;
  abstract get(id: number): Observable<UserPermission>;
}
