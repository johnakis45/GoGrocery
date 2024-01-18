import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { DishCardModel } from 'src/app/global/models/Dish/dish.model';
import { InventoryModel } from 'src/app/global/models/inventory/inventory.model';
import { DishService } from 'src/app/global/services/cook/dish.service';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';
import { SmartSpeakerService } from 'src/app/global/services/smart-speaker/smart-speaker.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { ListService } from 'src/app/global/services/tasks/tasks.service';

@Component({
  selector: 'fridge-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  @ViewChild('notification') notification!: ElementRef;
  public items: InventoryModel[] = [];

  public fruits: InventoryModel[] = [];
  public vegetables: InventoryModel[] = [];
  public oils: InventoryModel[] = [];
  public meatnfish: InventoryModel[] = [];
  public dairy: InventoryModel[] = [];
  public bakery: InventoryModel[] = [];
  public beverages: InventoryModel[] = [];
  public other: InventoryModel[] = [];

  constructor(
    private dishService: DishService,
    private socketService: SocketsService,
    private speaker: SmartSpeakerService,
    private inventoryService : InventoryService,
    private ListService : ListService) { }

  ngOnInit(): void { 
    this.getAll();
    // Susbcribe to socket event and set callback
    //if soemone publishes dish_update run the functions
    this.socketService.subscribe("inventory_update", (data: any) => {
      this.getAll();
    });
    this.speaker.addCommand("add two bananas", () => { this.add("Banana",2) });
    this.speaker.addCommand("add milk", () => { this.add("Milk") });
    this.speaker.addCommand("remove this", () => { console.log("What should I remove?") });
    this.speaker.initialize();
    this.speaker.start();
  }

  public add(cat : string,quantity: number = 1){
    console.log("add item");
    const existingItem = this.ListService.getByTitle(cat);
    existingItem.subscribe(
      (item: InventoryModel | null) => {
        if (item !== null) {
          // Existing item found
          if(quantity > 1){
            item.quantity += quantity;
          }else{
            item.quantity += 1;
          }
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
          if(cat == "Banana"){
            newItem.description = "Banana";
            newItem.category = "Fruits_Vegetables";
            newItem.subcategory = "Fruits";
            newItem.image = "assets/fridge/fruits/banana.png";
            newItem.quantity = 2;
          }else if(cat == "Milk"){
            newItem.description = "Milk";
            newItem.category = "Dairy_Eggs";
            newItem.subcategory = "Dairy";
            newItem.image = "assets/milk.png";
            newItem.quantity = 1;
          }
          newItem.completed = false;
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
      }
    );
      
    this.notification.nativeElement.classList.add("notification-show");
    setTimeout(() => {
      console.log("remove");
      this.notification.nativeElement.classList.remove("notification-show");
    }, 2000);

  }




  private getAll(): void {
    this.inventoryService.getAllInventory().subscribe((result) => {
      this.items = result;
      this.sortItemsByCategory();
    });
  }

  getNonEmptyArrays(): { category: string, items: InventoryModel[] }[] {
    const arrays = [
      { category: 'Fruits', items: this.fruits },
      { category: 'Vegetables', items: this.vegetables },
      { category: 'Oils', items: this.oils },
      { category: 'Meat & Fish', items: this.meatnfish },
      { category: 'Dairy & Eggs', items: this.dairy },
      { category: 'Bakery', items: this.bakery },
      { category: 'Beverages', items: this.beverages },
      { category: 'Other', items: this.other }
    ];
    return arrays.filter(array => array.items.length > 0);
  }



  sortItemsByCategory(): void {
    // Assuming you have these arrays for each category
    // Add more categories as needed

    this.items.forEach(item => {
      if (item.place == "Fridge") {
        switch (item.category) {
          case 'Fruits_Vegetables':
            if(item.subcategory == "Fruits"){
              this.fruits.push(item);
            }else{
              this.vegetables.push(item);
            }
            break;
          case 'Cooking_Oils':
            this.oils.push(item);
            break;
          case 'Meat_Fish':
            this.meatnfish.push(item);
            break;
          case 'Dairy_Eggs':
            this.dairy.push(item);
            break;
          case 'Bakery_Snacks':
            this.bakery.push(item);
            break;
          case 'Beverages':
            this.beverages.push(item);
            break;
          default:
            this.other.push(item);
            console.log(`Item ${item.title} has an unknown category ${item.category}`);
        }
      }
    });

  }

  isInputFocused: boolean = false;

  onInputFocus(event: FocusEvent): void {
    this.isInputFocused = true;
  }

  onInputBlur(event: FocusEvent): void {
    this.isInputFocused = false;
  }

  

  // fruits = [
  //   { title: 'Apple' ,image: 'assets/fridge/fruits/apple.png',quantity: "2"},
  //   { title: 'Pear' ,image: 'assets/fridge/fruits/pear.png',quantity: "3"},
  //   { title: 'Orange' ,image: 'assets/fridge/fruits/orange.png',quantity: "2"},
  //   { title: 'Banana' ,image: 'assets/fridge/fruits/banana.png',quantity: "1"},
  // ];

  // vegetables = [
  //   { title: 'Carrot' ,image: 'assets/fridge/vegetables/carrot.png',quantity: "4"},
  //   { title: 'Tomato' ,image: 'assets/fridge/vegetables/tomato.png',quantity: "3"},
  //   { title: 'Cucumber' ,image: 'assets/fridge/vegetables/cucumber.png',quantity: "3"},
  //   { title: 'Onion' ,image: 'assets/fridge/vegetables/onion.png',quantity: "2"},
  //   { title: 'Red Pepper' ,image: 'assets/fridge/vegetables/redpepper.png',quantity: "2"},
  //   { title: 'Green Pepper' ,image: 'assets/fridge/vegetables/greenpepper.png',quantity: "2"},
  //   { title: 'Orange Pepper' ,image: 'assets/fridge/vegetables/orangepepper.png',quantity: "1"},

  // ];

  // meatnfish = [
  //   { title: 'Apple' ,image: 'assets/fridge/fruits/apple.png',quantity: "2"},
  //   { title: 'Pear' ,image: 'assets/fridge/fruits/pear.png',quantity: "2"},
  //   { title: 'Orange' ,image: 'assets/fridge/fruits/orange.png',quantity: "2"},
  //   { title: 'Banana' ,image: 'assets/fridge/fruits/banana.png',quantity: "2"},
  // ];

  // dairy = [
  //   { title: 'Apple' ,image: 'assets/fridge/fruits/apple.png',quantity: "2"},
  //   { title: 'Pear' ,image: 'assets/fridge/fruits/pear.png',quantity: "2"},
  //   { title: 'Orange' ,image: 'assets/fridge/fruits/orange.png',quantity: "2"},
  //   { title: 'Banana' ,image: 'assets/fridge/fruits/banana.png',quantity: "2"},
  // ];

  // drinks = [
  //   { title: 'Apple' ,image: 'assets/fridge/fruits/apple.png',quantity: "2"},
  //   { title: 'Pear' ,image: 'assets/fridge/fruits/pear.png',quantity: "2"},
  //   { title: 'Orange' ,image: 'assets/fridge/fruits/orange.png',quantity: "2"},
  //   { title: 'Banana' ,image: 'assets/fridge/fruits/banana.png',quantity: "2"},
  // ];



}
