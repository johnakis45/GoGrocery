import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryModel } from '../../models/inventory/inventory.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private hostURl: string;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
  }

  public getAll(): Observable<InventoryModel[]> {
    return this.http
      .get<InventoryModel[]>(`${this.hostURl}/api/tasks`)
      .pipe(map(result => _.map(result, (t) => new InventoryModel(t))));
  }

  public getById(id: string): Observable<InventoryModel> {
    return this.http
      .get<InventoryModel>(`${this.hostURl}/api/inventory/${id}`)
      .pipe(map(result => new InventoryModel(result)));
  }

  public create(resource: InventoryModel): Observable<InventoryModel> {
    return this.http
      .post<InventoryModel>(`${this.hostURl}/api/inventory`, resource)
      .pipe(map(result => new InventoryModel(result)));
  }

  public update(resource: InventoryModel): Observable<InventoryModel> {
    return this.http
      .put<InventoryModel>(`${this.hostURl}/api/inventory/${resource._id}`, resource)
      .pipe(map(result => new InventoryModel(result)));
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.hostURl}/api/inventory/${id}`);
  }

}
