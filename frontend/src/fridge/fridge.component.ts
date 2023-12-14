// app.component.ts

import { Component,HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent implements OnInit{

  ngOnInit(): void {
    
  }
  title = "frontend";
  
}