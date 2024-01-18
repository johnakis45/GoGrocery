import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FridgeRoutingModule } from './bathroom-routing.module';
import { BathroomComponent } from './bathroom.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { BathroomItemsComponent } from './bahtroom_items/bathroom_items.component';
import { BathroomHomeComponent } from './home/home_bathroom.component';

const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
  declarations: [
    BathroomComponent,
    BathroomItemsComponent,
    BathroomHomeComponent
  ],
  imports: [
    SocketIoModule.forRoot(socketIoConfig),
    CommonModule,
    FridgeRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [BathroomModule]
})
export class BathroomModule { }
