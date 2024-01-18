// app.component.ts

import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryModel } from 'src/app/global/models/inventory/inventory.model';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';
import { SmartSpeakerService } from 'src/app/global/services/smart-speaker/smart-speaker.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'home_bathroom',
  templateUrl: './home_bathroom.component.html',
  styleUrls: ['./home_bathroom.component.scss']
})
export class BathroomHomeComponent implements OnInit, OnDestroy {
  public GesturesStr: string[] = [
    "SWIPE_LEFT",
    "SWIPE_UP",
    "SWIPE_DOWN",
    "SWIPE_RIGHT",
    "CIRCLE_CLOCKWISE",
    "CIRCLE_COUNTERCLOCKWISE",
    "PINCH",
  ];
  currentDate = new Date();
  public low_quantity: number = 0;
  public expires_soon: number = 0;
  public expired: number = 0;

  public items: InventoryModel[] = [];


  weather: string = "";
  constructor(private socketService: SocketsService,
    private http: HttpClient,
    private speaker: SmartSpeakerService,
    private inventoryService: InventoryService,
    private router : Router) { }


  ngOnInit(): void {
    (window as any)["electronAPI"].onGesture(
      (arg: any) => {
        console.log("Gesture recognised: ", this.GesturesStr[arg])
        if (this.GesturesStr[arg] === 'SWIPE_RIGHT') {
          this.router.navigate(['bathroom/home/cleaning']); 
        }
        if (this.GesturesStr[arg] === 'SWIPE_LEFT') {
          this.router.navigate(['bathroom/home/hygiene']);
        }
      }
    );
    this.fetchWeather();
    setInterval(() => {
      this.fetchWeather();
    }, 180 * 60 * 1000);

    this.getAll();
    // Susbcribe to socket event and set callback
    //if soemone publishes dish_update run the functions
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