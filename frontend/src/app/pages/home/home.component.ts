import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }
  isInputFocused: boolean = false;

  onInputFocus(event: FocusEvent): void {
    this.isInputFocused = true;
  }

  onInputBlur(event: FocusEvent): void {
    this.isInputFocused = false;
  }

  cards = [
    { title: 'Fruits & Vegetables', imageUrl: 'assets/categories/fruits.png', Backcolor: "rgba(83, 177, 117, 0.3)",color:"rgba(83, 177, 117, 0.7)" },
    { title: 'Cooking Oil\n& Ghee', imageUrl: 'assets/categories/oils.png', Backcolor: "rgba(248, 164, 76, 0.3)" ,color:"rgba(248, 164, 76, 0.7)" },
    { title: 'Meat & Fish', imageUrl: 'assets/categories/meat.png', Backcolor: 'rgba(247, 165, 147, 0.3)', color:"rgba(247, 165, 147, 1)" },
    { title: 'Bakery & Snacks', imageUrl: 'assets/categories/bread.png', Backcolor: 'rgba(211, 176, 224, 0.3)', color:"rgba(211, 176, 224, 1)" },
    { title: 'Dairy & Eggs', imageUrl: 'assets/categories/milk.png', Backcolor: 'rgba(253, 229, 152, 0.3)', color:"rgba(253, 229, 152, 1)" },
    { title: 'Beverages', imageUrl: 'assets/categories/beverages.png', Backcolor: 'rgba(183, 223, 245, 0.7)', color:"rgba(183, 223, 245, 1)" },
    { title: 'Hygiene Sypplies', imageUrl: 'assets/categories/hygiene.png', Backcolor: 'rgba(131, 106, 246, 0.3)', color:"rgba(131, 106, 246, 1)"},
    { title: 'Cleaning Sypplies', imageUrl: 'assets/categories/cleaning.png', Backcolor: 'rgba(215, 59, 119, 0.3)', color:"rgba(215, 59, 119, 1)" },
    // Add more cards as needed
  ];

}
