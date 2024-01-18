import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TaskModel } from '../../models/tasks/task.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { InventoryModel } from '../../models/inventory/inventory.model';


@Injectable({
  providedIn: 'root'
})
export class ListService {

  private hostURl: string;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
  }

  public getAll(): Observable<InventoryModel[]> {
    return this.http
      .get<InventoryModel[]>(`${this.hostURl}/api/list`)
      .pipe(map(result => _.map(result, (t) => new InventoryModel(t))));
  }

  public getById(id: string): Observable<InventoryModel> {
    return this.http
      .get<InventoryModel>(`${this.hostURl}/api/list/${id}`)
      .pipe(map(result => new InventoryModel(result)));
  }


  public getByTitle(title: string): Observable<InventoryModel | null> {
    return this.http
      .get<InventoryModel>(`${this.hostURl}/api/list/title/${title}`)
      .pipe(map(result => new InventoryModel(result)),
      catchError(error => {
        // Check if the error is a 404 Not Found
        if (error.status === 404) {
          // Return null when the title is not found
          return of(null);
        }

        // Handle other errors if needed
        throw error;
      })
    );
}

  public create(resource: InventoryModel): Observable<InventoryModel> {
    return this.http
      .post<InventoryModel>(`${this.hostURl}/api/list`, resource)
      .pipe(map(result => new InventoryModel(result)));
  }

  public update(resource: InventoryModel): Observable<InventoryModel> {
    return this.http
      .put<InventoryModel>(`${this.hostURl}/api/list/${resource._id}`, resource)
      .pipe(map(result => new InventoryModel(result)));
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.hostURl}/api/list/${id}`);
  }

  public deleteAll(): Observable<void> {
    return this.http.delete<void>(`${this.hostURl}/api/list/all`);
  }

}
