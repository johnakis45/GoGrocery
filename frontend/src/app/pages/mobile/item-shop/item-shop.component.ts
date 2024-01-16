import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'item-shop',
  templateUrl: './item-shop.component.html',
  styleUrls: ['./item-shop.component.scss']
})

export class ItemShopComponent implements OnInit {

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
    { title: 'Fruits & Vegetables', imageUrl: 'assets/categories/fruits.png', Backcolor: "rgba(83, 177, 117, 0.3)",color:"rgba(83, 177, 117, 0.7)",routerLink:"/home/Inventory",category: "Fruits_Vegetables" },
    { title: 'Cooking Oils', imageUrl: 'assets/categories/oils.png', Backcolor: "rgba(248, 164, 76, 0.3)" ,color:"rgba(248, 164, 76, 0.7)",routerLink:"/home/Inventory",category:"Cooking_Oils"},
    { title: 'Meat & Fish', imageUrl: 'assets/categories/meat.png', Backcolor: 'rgba(247, 165, 147, 0.3)', color:"rgba(247, 165, 147, 1)",routerLink:"/home/Inventory",category:"Meat_Fish"},
    { title: 'Bakery & Snacks', imageUrl: 'assets/categories/bread.png', Backcolor: 'rgba(211, 176, 224, 0.3)', color:"rgba(211, 176, 224, 1)",routerLink:"/home/Inventory",  category:"Bakery_Snacks"},
    { title: 'Dairy & Eggs', imageUrl: 'assets/categories/milk.png', Backcolor: 'rgba(253, 229, 152, 0.3)', color:"rgba(253, 229, 152, 1)",routerLink:"/home/Inventory",category:"Dairy_Eggs"},
    { title: 'Beverages', imageUrl: 'assets/categories/beverages.png', Backcolor: 'rgba(183, 223, 245, 0.7)', color:"rgba(183, 223, 245, 1)",routerLink:"/home/Inventory",category:"Beverages"},
    { title: 'Hygiene Sypplies', imageUrl: 'assets/categories/hygiene.png', Backcolor: 'rgba(131, 106, 246, 0.3)', color:"rgba(131, 106, 246, 1)",routerLink:"/home/Inventory", category:"Hygiene_Sypplies"},
    { title: 'Cleaning Sypplies', imageUrl: 'assets/categories/cleaning.png', Backcolor: 'rgba(215, 59, 119, 0.3)', color:"rgba(215, 59, 119, 1)",routerLink:"/home/Inventory",category:"Cleaning_Sypplies"},
    // Add more cards as needed
  ];

  selectedCategory: string | null = null;

  toggleCategory(category: string): void {
    console.log('Category clicked:', category);
    if (this.selectedCategory !== category) {
      this.selectedCategory = category;
      console.log('Category icon:', this.selectedCategory);
    }
  }

  

}
