import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './Inventory/inventory.component';
import { ShoppingListComponent } from './ShoppingList/shoppinglist.component';
import { FridgeComponent } from './fridge.component';
import { CategoryComponent } from './Category/category.component';

const routes: Routes = [
  {
    path: '',
    component: FridgeComponent,
    children: [
      { path: '', redirectTo: 'inventory', pathMatch: 'full' }, // Redirect /mobile to /mobile/home
      { path: 'inventory', component : InventoryComponent},
      { path: 'shopping-list', component: ShoppingListComponent },
      { path: 'category', component: CategoryComponent}
      // Add other child routes for mobile module components
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FridgeRoutingModule { }
