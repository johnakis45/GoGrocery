// app.component.ts

import { Component,HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements  OnInit{
  title = "frontend";
  selectedIcon: string | null = null;

  iconColor: string = 'red';
  

  toggleIcon(icon: string): void {
    console.log('Icon clicked:', icon);
    if (this.selectedIcon !== icon) {
      this.selectedIcon = icon;
      this.iconColor = 'red'; // Set the selected color here
      console.log('Selected icon:', this.selectedIcon);
    }
  }

  ngOnInit(): void {
    console.log('App component initialized');
  }
}
