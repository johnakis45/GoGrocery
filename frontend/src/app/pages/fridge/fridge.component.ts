// app.component.ts

import { Component,HostListener, OnDestroy, OnInit } from '@angular/core';
import { SmartSpeakerService } from 'src/app/global/services/smart-speaker/smart-speaker.service';

@Component({
  selector: 'app-root',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent implements OnInit, OnDestroy{
  constructor (private speaker: SmartSpeakerService){}

  ngOnInit(): void {
    this.speaker.addCommand("add this", ()=>{console.log("What should I add?")});
    this.speaker.addCommand("remove this", ()=>{console.log("What should I remove?")});
    this.speaker.initialize();
    this.speaker.start();

  }
  
  ngOnDestroy(): void {
    this.speaker.stop();
  }

  title = "frontend";

  expired = 1;
  expires_soon = 3;
  low_quantity= 2;
  
  
}