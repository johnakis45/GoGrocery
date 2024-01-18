// app.component.ts

import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit,ViewChild, ElementRef } from '@angular/core';
import { InventoryModel } from 'src/app/global/models/inventory/inventory.model';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';
import { SmartSpeakerService } from 'src/app/global/services/smart-speaker/smart-speaker.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { ListService } from 'src/app/global/services/tasks/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bathroom_items',
  templateUrl: './bathroom_items.component.html',
  styleUrls: ['./bathroom_items.component.scss']
})
export class BathroomItemsComponent implements OnInit, OnDestroy {
  @ViewChild('notification') notification!: ElementRef;

  public items: InventoryModel[] = [];
  public  displayItems: InventoryModel[] = [];


  weather: string = "";
  title: string = "";
  constructor(private socketService: SocketsService,
    private http: HttpClient,
    private speaker: SmartSpeakerService,
    private inventoryService: InventoryService,
    private ListService: ListService,
    private route: ActivatedRoute,
    private router : Router) { }
    completed: boolean = false;

  public GesturesStr: string[] = [
    "SWIPE_LEFT",
    "SWIPE_UP",
    "SWIPE_DOWN",
    "SWIPE_RIGHT",
    "CIRCLE_CLOCKWISE",
    "CIRCLE_COUNTERCLOCKWISE",
    "PINCH",
  ];

  ngOnInit(): void {
    console.log("Bathroom items component loaded!");
    (window as any)["electronAPI"].onGesture(
      (arg: any) => {
        console.log("Gesture recognised: ", this.GesturesStr[arg])
        if (this.GesturesStr[arg] === 'SWIPE_RIGHT') {
          this.router.navigate(['bathroom/home']); 
        }
        if (this.GesturesStr[arg] === 'SWIPE_LEFT') {
          this.router.navigate(['bathroom/home']);
        }
      }
    );
    
    this.route.url.subscribe(segments => {
      const lastSegment = segments[segments.length - 1].path;
      if (lastSegment === 'hygiene') {
        this.title = 'Hygiene';
      } else if (lastSegment === 'cleaning') {
        this.title = 'Cleaning';
      }
    });
    // this.fetchWeather();
    // setInterval(() => {
    //   this.fetchWeather();
    // }, 180 * 60 * 1000);

    this.getAll();
    this.socketService.subscribe("inventory_update", (data: any) => {
      this.getAll();
    });
    this.speaker.addCommand("add gloves", () => { if(this.title == "Cleaning"){ this.add("gloves"); } });
    this.speaker.addCommand("add toilet paper", () => { if(this.title == "Hygiene"){ this.add("Toilet paper"); } });
    this.speaker.addCommand("go home", () => { this.router.navigate(['bathroom/home']);  });
    this.speaker.initialize();
    this.speaker.start();

  }

  public add(cat : string){
    console.log("add item");
    const existingItem = this.ListService.getByTitle(cat);
    existingItem.subscribe(
      (item: InventoryModel | null) => {
        if (item !== null) {
          // Existing item found
          item.quantity += 1;
          this.inventoryService.updateList(item).subscribe(
            () => {
              console.log("Item quantity updated.");
              this.socketService.publish("list_update", item);
            },
            error => {
              console.error("Error updating item quantity:", error);
              // Handle error updating quantity if needed
            }
          );
        } else {
          // Item not found, create a new one
          const newItem = new InventoryModel();
          newItem.title = cat;
          if(cat == "gloves"){
            newItem.description = "Disposable gloves";
            newItem.category = "Cleaning";
            newItem.image = "assets/gloves.png";
          }else if(cat == "toilet paper"){
            newItem.description = "Toilet paper";
            newItem.category = "Hygiene";
            newItem.image = "assets/toiletpaper.png";
          }
          newItem.completed = this.completed;
          
          newItem.quantity = 1;
  
          console.log("add item");
  
          this.ListService.create(newItem).subscribe(
            result => {
              this.socketService.publish("list_update", newItem);
            },
            error => {
              console.error("Error creating new item:", error);
              // Handle error creating new item if needed
            }
          );
        }
  
        this.isAdded = true;
  
        // Reset the "Added" text after a delay (you can adjust the delay as needed)
        setTimeout(() => {
          this.isAdded = false;
        }, 2000); // 2000 milliseconds (2 seconds) in this example
      },
      error => {
        console.error("Error getting item by title:", error);
  
        // Handle other errors if needed
        this.isAdded = false; // Ensure isAdded is set to false in case of an error
      }
      
    );
      
    this.notification.nativeElement.classList.add("notification-show");
    setTimeout(() => {
      console.log("remove");
      this.notification.nativeElement.classList.remove("notification-show");
    }, 2000);

  }

  ngOnDestroy(): void {
    this.speaker.stop();
  }

  private getAll(): void {
    this.inventoryService.getAllInventory().subscribe((result) => {
      this.items = result;
      console.log(this.items);
      this.displayItems = this.items.filter(item => item.category === this.title);
    });
  }


  isAdded: boolean = false;
  public addItem(image: string, title: string, quantity: number, category: string, description: string) {
    
    const existingItem = this.ListService.getByTitle(title);
    existingItem.subscribe(
      (item: InventoryModel | null) => {
        if (item !== null) {
          // Existing item found
          item.quantity += 1;
          this.inventoryService.updateList(item).subscribe(
            () => {
              console.log("Item quantity updated.");
              this.socketService.publish("list_update", item);
            },
            error => {
              console.error("Error updating item quantity:", error);
              // Handle error updating quantity if needed
            }
          );
        } else {
          // Item not found, create a new one
          const newItem = new InventoryModel();
          newItem.title = title;
          newItem.description = description;
          newItem.completed = this.completed;
          newItem.category = category;
          newItem.quantity = 1;
          newItem.image = image;
  
          console.log("add item");
  
          this.ListService.create(newItem).subscribe(
            result => {
              this.socketService.publish("list_update", newItem);
            },
            error => {
              console.error("Error creating new item:", error);
              // Handle error creating new item if needed
            }
          );
        }
  
        this.isAdded = true;
  
        // Reset the "Added" text after a delay (you can adjust the delay as needed)
        setTimeout(() => {
          this.isAdded = false;
        }, 2000); // 2000 milliseconds (2 seconds) in this example
      },
      error => {
        console.error("Error getting item by title:", error);
  
        // Handle other errors if needed
        this.isAdded = false; // Ensure isAdded is set to false in case of an error
      }
      
    );

    this.notification.nativeElement.classList.add("notification-show");
    setTimeout(() => {
      console.log("remove");
      this.notification.nativeElement.classList.remove("notification-show");
    }, 2000);

    //this.showNotification(title);


  }

  }