import { Component, Input } from '@angular/core';
import type { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DishCardModel } from 'src/app/global/models/Dish/dish.model';
import { ItemModel } from 'src/app/global/models/items/item.model';
import { DishService } from 'src/app/global/services/cook/dish.service';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';
import { ItemsService } from 'src/app/global/services/item-shop/item-shop.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'dish-cook',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss'],
})
export class DishComponent implements OnInit {
  id: string = '';
  public dish: DishCardModel = new DishCardModel();
  public ingredients: ItemModel[] = [];
  private routeSub: Subscription = new Subscription();
  constructor(private route: ActivatedRoute,
    private socketsService: SocketsService,
    private dishService: DishService,
    private itemService: ItemsService,
    private inventoryService: InventoryService
  ) { }



  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getDishById(this.id);

    this.socketsService.subscribe("dish_update", (data: any) => {
      this.getDishById(this.id);
    });
  }

  private getDishById(cat: string): void {
    this.dishService.getByIdDish(cat).subscribe((result) => {
      this.dish = result;
      console.log(result);
      this.forEachIngredient();
    });
  }

  private forEachIngredient(): void {
    console.log("forEachIngredient");
    this.dish.ingredients.forEach(element => {
      console.log(element);
      this.itemService.getById(element).subscribe((result) => {
        
        this.ingredients.push(result);
      });
    });
  }

}
