import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MobileRoutingModule } from './mobile-routing.module';
import { MobileComponent } from './mobile.component';
import { TasksComponent } from './tasks/tasks.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ItemShopComponent } from './item-shop/item-shop.component';
import { ItemPreviewComponent } from './item-shop/item-preview/item-preview.component';
import { InventoryComponent } from './home/Inventory/inventory.component';
import { InventoryViewComponent } from './home/Inventory/Inventory_view/inventory-view.component';
import { CategoryComponent } from './home/category/category.component';
import { HomeComponent } from './home/home.component';
import { TasksViewComponent } from './tasks/tasks-view/tasks-view.component';

const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
  declarations: [
    MobileComponent,
    TasksComponent,
    ItemShopComponent,
    ItemPreviewComponent,
    InventoryComponent,
    InventoryViewComponent,
    CategoryComponent,
    HomeComponent,
    TasksViewComponent
  ],
  imports: [
    SocketIoModule.forRoot(socketIoConfig),
    CommonModule,
    MobileRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [MobileComponent]
})
export class MobileModule { }