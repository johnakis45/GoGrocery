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
import { InventoryViewComponent } from './home/Inventory/Inventory_view/inventory-view.component';
import { CategoryComponent } from './home/category/category.component';
import { HomeComponent } from './home/home.component';
import { TasksViewComponent } from './tasks/tasks-view/tasks-view.component';
import { CookComponent } from './cook/cook.component';
import { DishComponent } from './cook/dish/dish.component';
import { TimeService } from 'src/app/global/services/time_service/time-service.service';
import { ItemViewComponent } from './item-shop/item-preview/item/item.component';
import { InventoryComponentApp } from './home/Inventory/inventory.component';


const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
  declarations: [
    MobileComponent,
    TasksComponent,
    ItemShopComponent,
    ItemPreviewComponent,
    InventoryComponentApp,
    InventoryViewComponent,
    CategoryComponent,
    HomeComponent,
    TasksViewComponent,
    CookComponent,
    DishComponent,
    ItemViewComponent
  ],
  imports: [
    SocketIoModule.forRoot(socketIoConfig),
    CommonModule,
    MobileRoutingModule,
    HttpClientModule
  ],
  providers: [TimeService],
  bootstrap: [MobileComponent]
})
export class MobileModule { }
