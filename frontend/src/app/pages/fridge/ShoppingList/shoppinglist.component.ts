import { Component, OnInit,  Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TaskModel } from 'src/app/global/models/tasks/task.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { ListService } from 'src/app/global/services/tasks/tasks.service';

@Component({
  selector: 'fridge-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppingListComponent implements OnInit {
  public shopping_list: TaskModel[] = [];
  private routeSub: Subscription = new Subscription();
  constructor(private route: ActivatedRoute,
    private socketsService: SocketsService,
    private ListService: ListService
  ) { }

  @Input() selectedCategory: string = '';

  ngOnInit(): void {
    this.ListService.getAll().subscribe((result) => {
      this.shopping_list = result;
    });
    this.socketsService.subscribe("list_update", (data: any) => {
      this.ListService.getAll().subscribe((result) => {
        this.shopping_list = result;
      });
    });
  }
  isInputFocused: boolean = false;

  onInputFocus(event: FocusEvent): void {
    this.isInputFocused = true;
  }

  onInputBlur(event: FocusEvent): void {
    this.isInputFocused = false;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  itemss=[
    { title: "Gala",image: "assets/fridge/fruits/apple.png",quantity: 13,},
    { title: "Gala",image: "assets/fridge/fruits/apple.png",quantity: 13,},
    { title: "Gala",image: "assets/fridge/fruits/apple.png",quantity: 13,},    
    { title: "Gala",image: "assets/fridge/fruits/apple.png",quantity: 13,},
    { title: "Gala",image: "assets/fridge/fruits/apple.png",quantity: 13,},
  ]


  getColClass(length: number): string {
    if (length === 1) {
      return 'col-12';
    } else if (length === 2) {
      return 'col-6';
    } else if (length >= 3) {
      return 'col-4';
    } else {
      return 'col'; // Default to 'col' if the length is 0 or negative
    }
  }


}
