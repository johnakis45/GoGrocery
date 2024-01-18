import { Component, OnInit } from '@angular/core';
import { DishCardModel } from 'src/app/global/models/Dish/dish.model';
import { InventoryModel } from 'src/app/global/models/inventory/inventory.model';
import { DishService } from 'src/app/global/services/cook/dish.service';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { ListService } from 'src/app/global/services/tasks/tasks.service';

@Component({
  selector: 'fridge-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
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

  meatnfish = [
    { title: 'Chicken' ,image: 'assets/fridge/meatnfish/chicken.png',quantity: "1"},
    { title: 'Pork' ,image: 'assets/fridge/meatnfish/pork.png',quantity: "3"},
    { title: 'Salmon' ,image: 'assets/fridge/meatnfish/salmon.png',quantity: "2"},
  ];

  dairy = [
    { title: 'Milk' ,image: 'assets/fridge/dairy/milk.png',quantity: "1"},
    { title: 'Eggs' ,image: 'assets/fridge/dairy/eggs.png',quantity: "7"},
    { title: 'Butter' ,image: 'assets/fridge/dairy/butter.png',quantity: "1"},
    { title: 'Mozzarella' ,image: 'assets/fridge/dairy/mozzarellacheese.png',quantity: "3"},
  ];

  drinks = [
    { title: 'Cola' ,image: 'assets/fridge/drinks/cola.png',quantity: "4"},
    { title: 'Cola Zero' ,image: 'assets/fridge/drinks/colazero.png',quantity: "5"},
    { title: 'Sprite' ,image: 'assets/fridge/drinks/sprite.png',quantity: "2"},
    { title: 'Dr Pepper' ,image: 'assets/fridge/drinks/drpepper.png',quantity: "3"},
    { title: 'Mountain Dew' ,image: 'assets/fridge/drinks/mtndew.png',quantity: "2"},
  ];


  selectedCategory: string | null = null;

  selectCategory(item: any): void {
    this.selectedCategory = this.selectedCategory === item.category ? null : item.category;
    console.log(this.selectedCategory);
  }

  // toggleCategory(category: string): void {
  //   console.log('Category clicked:', category);
  //   if (this.selectedCategory !== category) {
  //     this.selectedCategory = category;
  //     console.log('Category icon:', this.selectedCategory);
  //   }
  // }

}
