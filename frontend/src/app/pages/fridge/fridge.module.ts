import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FridgeRoutingModule } from './fridge-routing.module';
import { FridgeComponent } from './fridge.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { InventoryComponent } from './Inventory/inventory.component';
import { InventoryViewComponent } from './Inventory/Inventory_view/inventory-view.component';
import { ShoppingListViewComponent } from './ShoppingList/ShoppingList_view/shoppinglist-view.component';
import { ShoppingListComponent } from './ShoppingList/shoppinglist.component';
import { CategoryComponent } from './Category/category.component';
import { CategoryViewComponent } from './Category/Category_view/category-view.component';

const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
  declarations: [
    FridgeComponent,
    InventoryViewComponent,
    InventoryComponent,
    ShoppingListViewComponent,
    ShoppingListComponent,
    CategoryComponent,
    CategoryViewComponent
  ],
  imports: [
    SocketIoModule.forRoot(socketIoConfig),
    CommonModule,
    FridgeRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [FridgeComponent]
})
export class FridgeModule { }
