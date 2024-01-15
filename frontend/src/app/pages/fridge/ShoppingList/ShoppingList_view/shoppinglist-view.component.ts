import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InventoryModel } from 'src/app/global/models/inventory/inventory.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';
import { ListService } from 'src/app/global/services/tasks/tasks.service';

@Component({
  selector: 'fridge-shoppinglist-view',
  templateUrl: './shoppinglist-view.component.html',
  styleUrls: ['./shoppinglist-view.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500)),
    ])
  ]
})

export class ShoppingListViewComponent implements OnInit {
 public items: InventoryModel[] = [];
  public imageURL: string = 'assets/Screenshot_4.png';
  public title: string = '';
  public quantity: number = 0;
  public category: string = '';
  public description: string = '';;
  public completed: boolean = false;
  public image: string = '';
  constructor(
    private inventoryService: InventoryService,
    private ListService: ListService,
    private socketService: SocketsService,
  ) { }

  ngOnInit(): void {
  }

  itemss=[
    { title: "Gala",image: "assets/fridge/fruits/apple.png",quantity: 13,},
    { title: "Gala",image: "assets/fridge/fruits/apple.png",quantity: 13,},
    { title: "Gala",image: "assets/fridge/fruits/apple.png",quantity: 13,},    
    { title: "Gala",image: "assets/fridge/fruits/apple.png",quantity: 13,},
    { title: "Gala",image: "assets/fridge/fruits/apple.png",quantity: 13,},


  ]

  private getInventoryByCategory(cat: string): void {
    this.inventoryService.getAllInventoryByCategory(cat).subscribe((result) => {
      this.items = result;
    });
  }

  private getAllTasks(): void {
    this.inventoryService.getAllInventory().subscribe((result) => {
      this.items = result;
    });
  }

  public postTask(): void {
    // Emit event for update tasks

    // this--> const task = new TaskModel({ title: this.title, description: this.description });
    const task = new InventoryModel();
    // or that -->
    task.title = this.title;
    task.category = this.category;
    task.quantity = this.quantity;

    this.inventoryService.createInventory(task).subscribe((result) => {
      this.title = '';
      this.quantity = 0;
      this.category = 'dairy';
      this.socketService.publish("inventory_update", task);
      this.socketService.publish("list_update", task);
    });
  }

  public deleteTask(task: InventoryModel): void {
    const response = confirm("Are you sure you want to delete this task?");
    if (response) {
      this.inventoryService.deleteInventory(task._id).subscribe(() => {
        this.getAllTasks();
        this.socketService.publish("inventory_update", {});
      });
    }
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
  }
}
