import { Component, OnInit } from '@angular/core';
import { DishCardModel } from 'src/app/global/models/Dish/dish.model';
import { DishService } from 'src/app/global/services/cook/dish.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'fridge-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

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

  inventory = [
    { title: 'Fried Shrimp' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking" , ingredients : ["Gala","Fish"],info:"Breakfast",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to "},
    { title: 'Fried Shrimp' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking",ingredients : ["Gala"],info:"Lunch",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to "},
    { title: 'Fried Shrimp ' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking",ingredients : ["Fisaa","Fish"],info:"Dinner",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to " },
    { title: 'Fried Shrimp' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking" , ingredients : ["Gala","Fish"],info:"Breakfast",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to "},
    { title: 'Fried Shrimp' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking",ingredients : ["Gala"],info:"Lunch",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to "},
    { title: 'Fried Shrimp ' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking",ingredients : ["Fisaa","Fish"],info:"Dinner",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to " },
    { title: 'Fried Shrimp' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking" , ingredients : ["Gala","Fish"],info:"Breakfast",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to "},
    { title: 'Fried Shrimp' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking",ingredients : ["Gala"],info:"Lunch",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to "},
    { title: 'Fried Shrimp ' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking",ingredients : ["Fisaa","Fish"],info:"Dinner",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to " },
    { title: 'Fried Shrimp' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking" , ingredients : ["Gala","Fish"],info:"Breakfast",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to "},
    { title: 'Fried Shrimp' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking",ingredients : ["Gala"],info:"Lunch",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to "},
    { title: 'Fried Shrimp ' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking",ingredients : ["Fisaa","Fish"],info:"Dinner",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to " },
  
  ];

  // cards = [
  //   { title: 'Fruits', imageUrl: 'assets/categories/fruits.png', Backcolor: "rgba(83, 177, 117, 0.3)",color:"rgba(83, 177, 117, 0.7)",routerLink:"/home/Inventory",category: "Fruits_Vegetables" },
  //   { title: 'Vegetables', imageUrl: 'assets/categories/oils.png', Backcolor: "rgba(248, 164, 76, 0.3)" ,color:"rgba(248, 164, 76, 0.7)",routerLink:"/home/Inventory",category:"Cooking_Oils"},
  //   { title: 'Meat & Fish', imageUrl: 'assets/categories/meat.png', Backcolor: 'rgba(247, 165, 147, 0.3)', color:"rgba(247, 165, 147, 1)",routerLink:"/home/Inventory",category:"Meat_Fish"},
  //   { title: 'Dairy & Eggs', imageUrl: 'assets/categories/milk.png', Backcolor: 'rgba(253, 229, 152, 0.3)', color:"rgba(253, 229, 152, 1)",routerLink:"/home/Inventory",category:"Dairy_Eggs"},
  //   { title: 'Beverages', imageUrl: 'assets/categories/beverages.png', Backcolor: 'rgba(183, 223, 245, 0.7)', color:"rgba(183, 223, 245, 1)",routerLink:"/home/Inventory",category:"Beverages"},
    
  // ];

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
