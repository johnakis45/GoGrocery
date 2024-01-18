import { Component, OnInit } from '@angular/core';
import { DishCardModel } from 'src/app/global/models/Dish/dish.model';
import { InventoryModel } from 'src/app/global/models/inventory/inventory.model';
import { DishService } from 'src/app/global/services/cook/dish.service';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { ListService } from 'src/app/global/services/tasks/tasks.service';

@Component({
  selector: 'fridge-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public items: InventoryModel[] = [];

  public expired: InventoryModel[] = [];
  public expiresSoon: InventoryModel[] = [];
  public low: InventoryModel[] = [];

  constructor(
    private dishService: DishService,
    private socketService: SocketsService,
    private inventoryService : InventoryService) { }

  ngOnInit(): void { 
    this.getAll();
    // Susbcribe to socket event and set callback
    //if soemone publishes dish_update run the functions
    this.socketService.subscribe("inventory_update", (data: any) => {
      this.getAll();
    });
  }

  private getAll(): void {
    this.inventoryService.getAllInventory().subscribe((result) => {
      this.items = result;
      this.sortItemsByCategory();
    });
  }


  getCategories(): { category: string, items: InventoryModel[] }[] {
    const arrays = [
        { category: 'Expired', items: this.expired },
        { category: 'Expires Soon', items: this.expiresSoon },
        { category: 'Low Quantity', items: this.low }
      ];
    return arrays.filter(array => array.items.length > 0);
  }

sortItemsByCategory(): void {
    this.items.forEach(item => {
        if (item.place == "Fridge") {
            const expirationDate = new Date(item.expiration_date);
            const now = new Date();
            const diffInDays = Math.ceil((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

            if (diffInDays < 0) {
                this.expired.push(item);
            } else if (diffInDays <= 4) {
                this.expiresSoon.push(item);
            }

            if (item.quantity === 1) {
                this.low.push(item);
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
