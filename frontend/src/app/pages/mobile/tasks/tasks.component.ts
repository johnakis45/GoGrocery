import { Component, OnInit } from '@angular/core';
import { InventoryModel } from 'src/app/global/models/inventory/inventory.model';
import { TaskModel } from 'src/app/global/models/tasks/task.model';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { ListService } from 'src/app/global/services/tasks/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private socketsService: SocketsService,
    private listService: ListService,
    private InventoryService: InventoryService) { }
  public shopping_list: TaskModel[] = [];
  ngOnInit(): void {
    this.getShoppingList();
    this.socketsService.subscribe("list_update", (data: any) => {
      this.getShoppingList();
    });
  }

  getShoppingList() {
    this.listService.getAll().subscribe((result) => {
      this.shopping_list = result;
    });
  }

  isClicked = false;

  buyAll() {
    this.isClicked = true;
    this.listService.getAll().subscribe((result) => {
      this.shopping_list = result;

      this.shopping_list.forEach(item => {
        this.addItem(item.image,item.title,item.quantity,item.category,item.description,item.expiration_date);
      });

      this.shopping_list.forEach(item => {
        this.listService.delete(item._id).subscribe(() => {
          console.log('Deleted item:', item);
          this.socketsService.publish('list_update', {});
        });
      });

      this.shopping_list = [];
    });
  }

  public addItem(image: string, title: string, quantity: number, category: string, description: string,expiration_date : string) {
    console.log("add item");
    const existingItem = this.InventoryService.getByTitleInventory(title);
    existingItem.subscribe(
      (item: InventoryModel | null) => {
        if (item !== null) {
          console.log("found");
          // Existing item found
          item.quantity += quantity;
          this.InventoryService.updateInventory(item).subscribe(
            () => {
              console.log("Item quantity updated.");
              this.socketsService.publish("list_update", item);
            },
            error => {
              console.error("Error updating item quantity:", error);
              // Handle error updating quantity if needed
            });
        } else {
          // Item not found, create a new one
          const newItem = new InventoryModel();
          newItem.title = title;
          newItem.description = description;
          newItem.completed = false;
          newItem.category = category;
          newItem.quantity = quantity;
          newItem.image = image;
          newItem.expiration_date = expiration_date;

          console.log("add item");

          this.InventoryService.createInventory(newItem).subscribe(
            result => {
              this.socketsService.publish("inventory_update", newItem);
            },
            error => {
              console.error("Error creating new item:", error);
              // Handle error creating new item if needed
            }
          );
        }
      }
    );
  }

  // this.notification.nativeElement.classList.add("notification-show");
  // setTimeout(() => {
  //   console.log("remove");
  //   this.notification.nativeElement.classList.remove("notification-show");
  // }, 2000);


}
