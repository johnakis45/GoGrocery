import { Component, OnInit } from '@angular/core';
import { DishCardModel } from 'src/app/global/models/Dish/dish.model';
import { DishService } from 'src/app/global/services/cook/dish.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'fridge-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public status="Add";
  public dishes: DishCardModel[] = [];

  constructor(
    private dishService: DishService,
    private socketService: SocketsService) { }

  ngOnInit(): void { 
    this.getAllDishes();
    // Susbcribe to socket event and set callback
    //if soemone publishes dish_update run the functions
    this.socketService.subscribe("dish_update", (data: any) => {
      this.getAllDishes();
    });
  }

  private getAllDishes(): void {
    this.dishService.getAllDishes().subscribe((result) => {
      this.dishes = result;
    });
  }

  isInputFocused: boolean = false;

  onInputFocus(event: FocusEvent): void {
    this.isInputFocused = true;
  }

  onInputBlur(event: FocusEvent): void {
    this.isInputFocused = false;
  }

  expired = [
    { title: 'Apple' ,image: 'assets/fridge/fruits/apple.png',quantity: "2"},
    { title: 'Pear' ,image: 'assets/fridge/fruits/pear.png',quantity: "3"},
    { title: 'Orange' ,image: 'assets/fridge/fruits/orange.png',quantity: "2"},
    { title: 'Banana' ,image: 'assets/fridge/fruits/banana.png',quantity: "1"},
  ];

  expiressoon = [
    { title: 'Carrot' ,image: 'assets/fridge/vegetables/carrot.png',quantity: "4"},
    { title: 'Tomato' ,image: 'assets/fridge/vegetables/tomato.png',quantity: "3"},
    { title: 'Cucumber' ,image: 'assets/fridge/vegetables/cucumber.png',quantity: "3"},
    { title: 'Onion' ,image: 'assets/fridge/vegetables/onion.png',quantity: "2"},
    { title: 'Red Pepper' ,image: 'assets/fridge/vegetables/redpepper.png',quantity: "2"},
    { title: 'Green Pepper' ,image: 'assets/fridge/vegetables/greenpepper.png',quantity: "2"},
    { title: 'Orange Pepper' ,image: 'assets/fridge/vegetables/orangepepper.png',quantity: "1"},

  ];

  lowquantity = [
    { title: 'Apple' ,image: 'assets/fridge/fruits/apple.png',quantity: "2"},
    { title: 'Pear' ,image: 'assets/fridge/fruits/pear.png',quantity: "2"},
    { title: 'Orange' ,image: 'assets/fridge/fruits/orange.png',quantity: "2"},
    { title: 'Banana' ,image: 'assets/fridge/fruits/banana.png',quantity: "2"},
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
