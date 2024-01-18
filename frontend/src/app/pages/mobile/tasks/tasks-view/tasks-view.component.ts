import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InventoryModel } from 'src/app/global/models/inventory/inventory.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';



@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss']
})

export class TasksViewComponent implements OnInit {
  @ViewChild('notification') notification!: ElementRef;
  public tasks: InventoryModel[] = [];
  public title: string = '';
  public description: string = '';
  public quantity: number = 0;
  public category: string = 'general';
  public completed: boolean = false;
  public image: string = '';
  constructor(
    private InventoryService: InventoryService,
    private socketService: SocketsService
  ) {
    this.notification = new ElementRef(null);
  }

  ngOnInit(): void {
    this.getAllTasks();

    // Susbcribe to socket event and set callback
    this.socketService.subscribe("list_update", (data: any) => {
      this.getAllTasks();
    });
  }

  private getAllTasks(): void {
    this.InventoryService.getAllList().subscribe((result) => {
      this.tasks = result;
    });
  }

  public postTask(): void {
    // Emit event for update tasks

    // this--> const task = new TaskModel({ title: this.title, description: this.description });
    const task = new InventoryModel();
    // or that -->
    task.title = this.title;
    task.description = this.description;
    task.completed = this.completed;
    task.category = this.category;
    task.quantity = this.quantity;
    task.image = this.image;

    this.InventoryService.createList(task).subscribe((result) => {
      this.title = '';
      this.description = '';
      this.completed = false;
      this.socketService.publish("list_update", task);
    });
  }

  public deleteTask(task: InventoryModel): void {
    //const response = confirm("Are you sure you want to delete this task?");
    this.notification.nativeElement.classList.add("notification-show");

    setTimeout(() => {
      this.notification.nativeElement.classList.remove("notification-show");
    }, 2000);
   //if (response) {
      this.InventoryService.deleteList(task._id).subscribe(() => {
        this.getAllTasks();
        this.socketService.publish("list_update", {});
      });
    //}
  }

  public add(task: InventoryModel): void {
    task.quantity += 1;
    this.InventoryService.updateList(task).subscribe(() => {
      this.getAllTasks();
      this.socketService.publish("list_update", task);
    });
  }

  public subtract(task: InventoryModel): void {
    let quantity = task.quantity;
    if (quantity == 1) {
      this.notification.nativeElement.classList.add("notification-show");

    setTimeout(() => {
      this.notification.nativeElement.classList.remove("notification-show");
    }, 2000);
      this.InventoryService.deleteList(task._id).subscribe(() => {
        this.getAllTasks();
        this.socketService.publish("list_update", {});
      });
      return;
    }
    task.quantity -= 1;
    this.InventoryService.updateList(task).subscribe(() => {
      this.getAllTasks();
      this.socketService.publish("list_update", task);
    });
  }

}
