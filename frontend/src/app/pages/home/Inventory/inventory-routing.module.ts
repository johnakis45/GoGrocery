import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryViewComponent } from './Inventory_view/inventory-view.component';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      { path: 'view', component: InventoryViewComponent },
      { path: '**', redirectTo: 'view', pathMatch: 'full' },]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }