import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FridgeRoutingModule } from './fridge-routing.module';
import { FridgeComponent } from './fridge.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
//import { InventoryComponent } from './pages/fridge/home/Inventory/inventory.component';

const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
  declarations: [
    FridgeComponent
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
