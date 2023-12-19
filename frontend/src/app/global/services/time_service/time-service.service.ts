// time-service.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  getTimeOfDay(): string {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
      return 'Breakfast';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Lunch';
    } else {
      return 'Dinner';
    }
  }
}
