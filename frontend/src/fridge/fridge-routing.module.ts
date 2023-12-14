import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './Inventory/inventory.component';
import { ShoppingListComponent } from './ShoppingList/shoppinglist.component';

const routes: Routes = [
  { path: 'fridge/inventory', component: InventoryComponent},
  { path: 'fridge/shopping-list', component: ShoppingListComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FridgeRoutingModule { }
