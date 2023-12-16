import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemShopComponent } from './item-shop/item-shop.component';
import { InventoryComponent } from './home/Inventory/inventory.component';
import { TasksComponent } from './tasks/tasks.component';
import { MobileComponent } from './mobile.component';

const routes: Routes = [
  {
    path: '',
    component: MobileComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect /mobile to /mobile/home
      { path: 'home', component: HomeComponent },
      { path: 'item-shop', component: ItemShopComponent },
      { path: 'home/inventory', component: InventoryComponent },
      { path: 'home/inventory/:id', component: InventoryComponent },
      { path: 'tasks', component: TasksComponent }, 
      // Add other child routes for mobile module components
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }