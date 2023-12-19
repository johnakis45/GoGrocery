import { Component, OnInit } from '@angular/core';
import { DishCardModel } from 'src/app/global/models/Dish/dish.model';
import { TimeService } from 'src/app/global/services/time_service/time-service.service';

@Component({
  selector: 'app-cook',
  templateUrl: './cook.component.html',
  styleUrls: ['./cook.component.scss']
})
export class CookComponent implements OnInit {
  public status="Cook";
  public dishes: DishCardModel[] = [];
  timeOfDay: string = '';

  constructor(private timeService: TimeService) {}

  ngOnInit() {
    this.updateTimeOfDay();
    setInterval(() => {
      this.updateTimeOfDay();
    }, 60000); // Update every minute
  }

  private updateTimeOfDay() {
    this.timeOfDay = this.timeService.getTimeOfDay();
  }
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
     { title: '🥞 Breakfast ' ,category: "Breakfast" },
     { title: '🍜 Noodles ' ,category: "Noodles" },
     { title: '🍛 Rice ' ,category: "Rice" },
     { title: '🍱 Bento ' ,category: "Bento" },
     { title: '🍲 Stew ' ,category: "Stew" },
     { title: '🍤 Seafood ' ,category: "Seafood" },
     { title: '🍗 Chicken ' ,category: "Chicken" },
      { title: '🍖 Meat ' ,category: "Meat" },
      { title: '🍟 Fries ' ,category: "Fries" },
      { title: '🍦 Dessert ' ,category: "Dessert" },
      { title: '🍩 Snack ' ,category: "Snack" },
      { title: '🍪 Cookie ' ,category: "Cookie" },
      { title: '🍮 Pudding ' ,category: "Pudding" },
      { title: '🍫 Chocolate ' ,category: "Chocolate" },
      { title: '🍬 Candy ' ,category: "Candy" },
      { title: '🍭 Lollipop ' ,category: "Lollipop" },
      { title: '🍯 Honey ' ,category: "Honey" },
      { title: '🍼 Milk ' ,category: "Milk" }
    
  ];

  ddishes = [
    { title: 'Fried Shrimp' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking" , ingredients : ["Gala","Fish"],info:"Breakfast",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to "},
    { title: 'Fried Shrimp' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking",ingredients : ["Gala"],info:"Lunch",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to "},
    { title: 'Fried Shrimp ' ,image: 'assets/shrimp.png',time: "20",category: "Seafood",status : "Cooking",ingredients : ["Fisaa","Fish"],info:"Dinner",description : "Soak the shrimp – In a large bowl, mix together the milk, ½ teaspoon salt, the black pepper, half the granulated garlic, half the paprika, and half of the oregano. Add in the shrimp and let soak for 10 minutes.Coat the shrimp – Once the shrimp is finished soaking, shake free of excess milk. Mix together the remaining spices and flour on a plate and coat the shrimp well. Make sure you coat the shrimp really well with flour. Coat them several times with the seasoned flour. You should not be able to see the shrimp under the flour.Fry the shrimp – Heat the oil to 375 degrees and fry each batch of shrimp for about 1-2 minutes or until it’s nice and crispy.Serve – Allow the shrimp to " },
  ];

  selectedCategory: string | null = null;


  selectCategory(item: any): void {
    this.selectedCategory = this.selectedCategory === item.category ? null : item.category;
    console.log(this.selectedCategory);
  }

}
