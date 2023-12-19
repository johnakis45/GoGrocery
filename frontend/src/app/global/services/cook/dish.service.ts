import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map,tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { DishCardModel } from '../../models/Dish/dish.model';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  private hostURl: string;

  constructor(private http: HttpClient) {
    this.hostURl = environment.host;
  }

  public getAllDishes(): Observable<DishCardModel[]> {
    return this.http
      .get<DishCardModel[]>(`${this.hostURl}/api/dishes`)
      .pipe(map(result => _.map(result, (t) => new DishCardModel(t))));
  }


}
