import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FridgeRoutingModule } from './fridge-routing.module';
import { FridgeComponent } from './fridge.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ItemShopComponent } from './pages/item-shop/item-shop.component';
import { ItemPreviewComponent } from './pages/item-shop/item-preview/item-preview.component';
import { InventoryComponent } from './pages/home/Inventory/inventory.component';

const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
  declarations: [
    FridgeComponent,
    TasksComponent,
    ItemShopComponent,
    ItemPreviewComponent,
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
