import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { InventoryModel } from 'src/app/global/models/inventory/inventory.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500)),
    ])
  ]
})

export class InventoryViewComponent implements OnInit {
  public items: InventoryModel[] = [];
  public imageURL: string = 'assets/Screenshot_4.png';
  public title: string = '';
  public quantity: number = 0;
  public category: string = 'dairy';
  public categories: string[] = ['general', 'dairy', 'meat', 'vegetables', 'fruits', 'drinks', 'snacks', 'other'];
  constructor(
    private inventoryService: InventoryService,
    private socketService: SocketsService
  ) { }

  ngOnInit(): void {
    this.getAllTasks();

    // Susbcribe to socket event and set callback
    this.socketService.subscribe("tasks_update", (data: any) => {
      this.getAllTasks();
    });
  }

  private getAllTasks(): void {
    this.inventoryService.getAll().subscribe((result) => {
      this.items = result;
    });
  }

  public postTask(): void {
    // Emit event for update tasks

    // this--> const task = new TaskModel({ title: this.title, description: this.description });
    const task = new InventoryModel();
    // or that -->
    task.name = this.title;
    task.category = this.category;
    task.quantity = this.quantity;

    this.inventoryService.create(task).subscribe((result) => {
      this.title = '';
      this.quantity = 0;
      this.category = 'dairy';
      this.socketService.publish("inventory_update", task);
    });
  }

  public deleteTask(task: InventoryModel): void {
    const response = confirm("Are you sure you want to delete this task?");
    if (response) {
      this.inventoryService.delete(task._id).subscribe(() => {
        this.getAllTasks();
        this.socketService.publish("inventory_update", {});
      });
    }
  }


  isAdded: boolean = false;
  addItem(item : any) {
    console.log("add item");
    this.isAdded = true;
    //this.postTask();

    // Reset the "Added" text after a delay (you can adjust the delay as needed)
    setTimeout(() => {
      this.isAdded = false;
    }, 2000); // 2000 milliseconds (2 seconds) in this example
  }
}
