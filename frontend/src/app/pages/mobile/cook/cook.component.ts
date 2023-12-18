import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cook',
  templateUrl: './cook.component.html',
  styleUrls: ['./cook.component.scss']
})
export class CookComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  isInputFocused: boolean = false;

  onInputFocus(event: FocusEvent): void {
    this.isInputFocused = true;
  }

  onInputBlur(event: FocusEvent): void {
    this.isInputFocused = false;
  }

  categories = [
    { title: '🌭 Sandwich ' ,category: "Sandwich" },
    { title: '🍕 Pizza ' ,category: "Pizza" },
    { title: '🍔 Burger ' ,category: "Burger" },
     { title: '🍲 Soup ' ,category: "Soup" },
     { title: '🍝 Spaghetti ' ,category: "Spaghetti" },
     { title: '🍣 Sushi ' ,category: "Sushi" },
     { title: '🥗 Salad ' ,category: "Salad" },
     { title: '🥞 Breakfast ' ,category: "Breakfast" }
    
  ];

  dishes = [
    { title: '🌭 Sandwich ' ,image: 'assets/shrimp.png',category: "Sandwich" },
    { title: '🌭 Sandwich ' ,image: 'assets/shrimp.png',category: "Sandwich" },
    { title: '🌭 Sandwich ' ,image: 'assets/shrimp.png',category: "Sandwich" },
  ];

  selectedCategory: string | null = null;


  selectCategory(item: any): void {
    this.selectedCategory = this.selectedCategory === item.category ? null : item.category;
    console.log(this.selectedCategory);
  }

}
