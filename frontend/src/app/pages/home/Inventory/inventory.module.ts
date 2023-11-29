import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { InventoryViewComponent } from './Inventory_view/inventory-view.component';


@NgModule({
  declarations: [InventoryViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
