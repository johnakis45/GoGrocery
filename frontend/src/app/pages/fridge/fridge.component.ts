// app.component.ts

import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { InventoryModel } from 'src/app/global/models/inventory/inventory.model';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';
import { SmartSpeakerService } from 'src/app/global/services/smart-speaker/smart-speaker.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-root',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent implements OnInit, OnDestroy {
  currentDate = new Date();
  public low_quantity: number = 0;
  public expires_soon: number = 0;
  public expired: number = 0;

  public items: InventoryModel[] = [];


  weather: string = "";
  constructor(private socketService: SocketsService,
    private http: HttpClient,
    private speaker: SmartSpeakerService,
    private inventoryService: InventoryService) { }


  ngOnInit(): void {
    // this.fetchWeather();
    // setInterval(() => {
    //   this.fetchWeather();
    // }, 180 * 60 * 1000);

    this.getAll();
    // Susbcribe to socket event and set callback
    //if soemone publishes dish_update run the functions
    this.socketService.subscribe("inventory_update", (data: any) => {
      this.getAll();
    });
    this.speaker.addCommand("add this", () => { console.log("What should I add?") });
    this.speaker.addCommand("remove this", () => { console.log("What should I remove?") });
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
      this.CheckItems();
    });
  }


    CheckItems(): void {
      this.items.forEach(item => {
        console.log(item.expiration_date);
        if (item.quantity == 1) {
          this.low_quantity++;
        }
          const expirationDate = new Date(item.expiration_date);
          const diffInDays = Math.ceil((expirationDate.getTime() - this.currentDate.getTime()) / (1000 * 60 * 60 * 24));
          if (diffInDays < 0) {
            this.expired++;
          } else if (diffInDays <= 4) {
            this.expires_soon++;
          }
        
      });

    }
  }