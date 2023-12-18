import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryModel } from '../../models/inventory/inventory.model';
import { HttpClient } from '@angular/common/http';
import { map,tap } from 'rxjs/operators';
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

  public getAllInventory(): Observable<InventoryModel[]> {
    return this.http
      .get<InventoryModel[]>(`${this.hostURl}/api/inventory`)
      .pipe(map(result => _.map(result, (t) => new InventoryModel(t))));
  }

  public getAllInventoryByCategory(cat: string): Observable<InventoryModel[]> {
    const url = `${this.hostURl}/api/inventory`;
    return this.http
    .get<InventoryModel[]>(url)
    .pipe(map(result => result.filter(item => item.category === cat).map(t => new InventoryModel(t))));
  }



  public getByIdInventory(id: string): Observable<InventoryModel> {
    return this.http
      .get<InventoryModel>(`${this.hostURl}/api/inventory/${id}`)
      .pipe(map(result => new InventoryModel(result)));
  }

  public createInventory(resource: InventoryModel): Observable<InventoryModel> {
    return this.http
      .post<InventoryModel>(`${this.hostURl}/api/inventory`, resource)
      .pipe(map(result => new InventoryModel(result)));
  }

  public updateInventory(resource: InventoryModel): Observable<InventoryModel> {
    return this.http
      .put<InventoryModel>(`${this.hostURl}/api/inventory/${resource._id}`, resource)
      .pipe(map(result => new InventoryModel(result)));
  }

  public deleteInventory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.hostURl}/api/inventory/${id}`);
  }



  public getAllList(): Observable<InventoryModel[]> {
    return this.http
      .get<InventoryModel[]>(`${this.hostURl}/api/list`)
      .pipe(map(result => _.map(result, (t) => new InventoryModel(t))));
  }

  public getByIdList(id: string): Observable<InventoryModel> {
    return this.http
      .get<InventoryModel>(`${this.hostURl}/api/list/${id}`)
      .pipe(map(result => new InventoryModel(result)));
  }

  public createList(resource: InventoryModel): Observable<InventoryModel> {
    return this.http
      .post<InventoryModel>(`${this.hostURl}/api/list`, resource)
      .pipe(map(result => new InventoryModel(result)));
  }

  public updateList(resource: InventoryModel): Observable<InventoryModel> {
    return this.http
      .put<InventoryModel>(`${this.hostURl}/api/list/${resource._id}`, resource)
      .pipe(map(result => new InventoryModel(result)));
  }

  public deleteList(id: string): Observable<void> {
    return this.http.delete<void>(`${this.hostURl}/api/list/${id}`);
  }

}
