// app.component.ts

import { HttpClient } from '@angular/common/http';
import { Component,HostListener, OnDestroy, OnInit } from '@angular/core';
import { SmartSpeakerService } from 'src/app/global/services/smart-speaker/smart-speaker.service';

@Component({
  selector: 'app-root',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent implements OnInit, OnDestroy{
  currentDate = new Date();
  weather: string = "";
  constructor (private http: HttpClient,private speaker: SmartSpeakerService){}


  ngOnInit(): void {
    // this.fetchWeather();
    // setInterval(() => {
    //   this.fetchWeather();
    // }, 180 * 60 * 1000);
    this.speaker.addCommand("add this", ()=>{console.log("What should I add?")});
    this.speaker.addCommand("remove this", ()=>{console.log("What should I remove?")});
    this.speaker.initialize();
    this.speaker.start();

  }
  
  ngOnDestroy(): void {
    this.speaker.stop();
  }

  fetchWeather(): void {
    const url = 'https://open-weather13.p.rapidapi.com/city/Heraklion';

    const headers = {
      'X-RapidAPI-Key': '2303c9c676msh66495b54f3abfbep13827bjsnb9eecb83c236',
      'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
    };

    this.http.get(url, { headers }).subscribe(
      (data: any) => {
        console.log(data);
        // Call your method to handle the data here
        this.showWeather(data);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  convertFahrenheitToCelsius(fahrenheit: number): string {
    let celsius = (fahrenheit - 32) * 5 / 9;
    return celsius.toFixed(2);
  }

  showWeather(data: any): void {
    console.log(data.main.temp);
    this.weather = this.convertFahrenheitToCelsius(data.main.temp);
  }
  

  title = "frontend";

  expired = 1;
  expires_soon = 3;
  low_quantity= 2;
  
  
}