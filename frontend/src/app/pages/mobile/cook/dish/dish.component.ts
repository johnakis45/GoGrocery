import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, forkJoin, map } from 'rxjs';
import { DishCardModel } from 'src/app/global/models/Dish/dish.model';
import { InventoryModel } from 'src/app/global/models/inventory/inventory.model';
import { ItemModel } from 'src/app/global/models/items/item.model';
import { TaskModel } from 'src/app/global/models/tasks/task.model';
import { DishService } from 'src/app/global/services/cook/dish.service';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';
import { ItemsService } from 'src/app/global/services/item-shop/item-shop.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { ListService } from 'src/app/global/services/tasks/tasks.service';
import { Location } from '@angular/common';


@Component({
  selector: 'dish-cook',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss'],
})
export class DishComponent implements OnInit {
  id: string = '';
  added : boolean = false;
  public missing : number = 0;
  public dish: DishCardModel = new DishCardModel();
  public available_items: ItemModel[] = [];
  public missing_items: ItemModel[] = [];
  public shopping_items: ItemModel[] = [];
  public ingredients: ItemModel[] = [];
  public inventory: InventoryModel[] = [];
  public shopping_list: TaskModel[] = [];
  private routeSub: Subscription = new Subscription();
  constructor(private route: ActivatedRoute,
    private socketsService: SocketsService,
    private dishService: DishService,
    private itemService: ItemsService,
    private inventoryService: InventoryService,
    private ListService: ListService,
    private location: Location
  ) { }



  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getDishById(this.id);
  
    this.socketsService.subscribe("dish_update", (data: any) => {
      this.getDishById(this.id);
    });
  
    // Listen for updates to the list
    this.socketsService.subscribe("list_update", (data: any) => {
      // Refresh the arrays
      this.missing_items = [];
      this.available_items = [];
      this.shopping_items = [];
      Promise.all([this.getShoppingList(), this.getInvertory()]).then(() => {
        this.forEachIngredient();
      });
    });
  }
  private getDishById(cat: string): void {
    this.dishService.getByIdDish(cat).subscribe((result) => {
      this.dish = result;
      console.log(result);
      this.getShoppingList();
      this.getInvertory();
      this.forEachIngredient();
    });
  }

  private forEachIngredient(): void {
    console.log("forEachIngredient");
     // Empty the arrays
    let observables = this.dish.ingredients.map(element => {
      return this.itemService.getById(element).pipe(map((result) => {
        // Search if the result is in the inventory
        const inventoryItem = this.inventory.find(item => item.title === result.title);
        const listItem = this.shopping_list.find(item => item.title === result.title);
        
        // If there's no such title in the inventory
        if (!inventoryItem && !listItem) {
          // Increase missing
          this.missing++;
    
          // Add them to missingItems
          this.missing_items.push(result);
        } else if(!inventoryItem && listItem){
          this.shopping_items.push(result);
        }else{
          this.available_items.push(result);
        }
        return result;
      }));
    });
    forkJoin(observables).subscribe(() => {
      this.mergeItems();
      // console.log(this.available_items);
      // console.log(this.shopping_items);
      // console.log(this.missing_items);
      // console.log(this.ingredients);
    });
  }

  


  private mergeItems(): void {
    // Merge missing_items and available_items
    // Elements of missing_items should be first
    this.ingredients = [...this.missing_items,...this.shopping_items, ...this.available_items];
  }



  private getInvertory(): void {
    this.inventoryService.getAllInventory().subscribe((result) => {
      this.inventory = result;
    });
  }

  private getShoppingList(): void {
    this.ListService.getAll().subscribe((result) => {
      this.shopping_list = result;
    });
  }

  isAdded = false;

addMissingItems() {
  let audio = new Audio();
  audio.src = "assets/shooting-sound-fx-159024.mp3";
  audio.load();
  audio.play();
  this.isAdded = true;
  // Add your code to add the missing items here
}


  playSound() {
    let audio = new Audio();
    audio.src = "assets/shooting-sound-fx-159024.mp3";
    audio.load();
    audio.play();
  }

  public addItem(item : ItemModel): void {
    console.log(item);
    const list_item = new TaskModel();
    list_item.title = item.title;
    list_item.description = "";
    list_item.completed = false;
    list_item.category = item.category;
    list_item.quantity = 1;
    list_item.image = item.image;
    console.log(list_item);

    this.ListService.create(list_item).subscribe(
      result => {
        // Publish an update to the list
        this.socketsService.publish("list_update", list_item);},
      error => {
        console.error("Error creating new item:", error);
        // Handle error creating new item if needed
      }
    );
    this.playSound();
  }

  public async AddAllMissingItems(): Promise<void> {
    console.log(this.missing_items);
    for (const element of this.missing_items) {
      await this.addItem(element);
    }
    setTimeout(() => {
       window.location.reload();
     }, 500);
   }
  
}
