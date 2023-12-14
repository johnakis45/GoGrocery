import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FridgeRoutingModule } from './fridge-routing.module';
import { FridgeComponent } from './fridge.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { InventoryComponent } from './Inventory/inventory.component';
import { ShoppingListComponent } from './ShoppingList/shoppinglist.component';



const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
  declarations: [
    FridgeComponent,
    InventoryComponent,
    ShoppingListComponent
  ],
  imports: [
    SocketIoModule.forRoot(socketIoConfig),
    BrowserModule,
    FridgeRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [FridgeComponent]
})
export class FridgeModule { }
