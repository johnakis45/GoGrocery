// app.component.ts

import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryModel } from 'src/app/global/models/inventory/inventory.model';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';
import { SmartSpeakerService } from 'src/app/global/services/smart-speaker/smart-speaker.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'bathroom-root',
  templateUrl: './bathroom.component.html',
  styleUrls: ['./bathroom.component.scss']
})
export class BathroomComponent implements OnInit, OnDestroy {
  currentDate = new Date();

  public items: InventoryModel[] = [];


  weather: string = "";
  constructor(private socketService: SocketsService,
    private http: HttpClient,
    private speaker: SmartSpeakerService,
    private inventoryService: InventoryService,
    private router : Router) { }


  ngOnInit(): void {
    
    this.fetchWeather();
    setInterval(() => {
      this.fetchWeather();
    }, 180 * 60 * 1000);

    this.getAll();
    // Susbcribe to socket event and set callback
    //if somemone publishes dish_update run the function
    this.socketService.subscribe("inventory_update", (data: any) => {
      this.getAll();
    });
    this.speaker.addCommand("go to cleaning", () => {  this.router.navigate(['bathroom/home/cleaning']) });
    this.speaker.addCommand("go to hygiene", () => { this.router.navigate(['bathroom/home/hygiene']) });
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


  private getAll(): void {
    this.inventoryService.getAllInventory().subscribe((result) => {
      this.items = result;
    });
  }

  }