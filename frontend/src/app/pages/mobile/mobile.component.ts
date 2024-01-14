// app.component.ts

import { Component,HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})

export class MobileComponent implements  OnInit{
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
    window.addEventListener('scroll', this.scrollEvent, true);
    console.log('App component initialized');
  }

  scrollEvent = (event: any): void => {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const header = document.querySelector('.header-background') as HTMLElement;
    const scrolled = document.querySelector('.scrolled') as HTMLElement;

    if (number > 0 && header !== null) {
      header.classList.add('scrolled');
    } else if (header !== null) {
      header.classList.remove('scrolled');
    }

    if (scrolled !== null && header !== null) {
      const blur = Math.min(10, number / 10); // Adjust the divisor to change the speed of the blur effect
      scrolled.style.backdropFilter = `blur(${blur}px)`;
    }
  }
}
