// app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "frontend";
  selectedIcon: string | null = null;

  toggleIcon(icon: string): void {
    console.log('Icon clicked:', icon);
    if (this.selectedIcon !== icon) {
      this.selectedIcon = icon;
      console.log('Selected icon:', this.selectedIcon);
    }
  }
  
}
