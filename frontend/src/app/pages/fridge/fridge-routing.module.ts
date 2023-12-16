import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemShopComponent } from './item-shop/item-shop.component';
import { FridgeComponent } from './fridge.component';

const routes: Routes = [
  {
    path: '',
    component: FridgeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect /mobile to /mobile/home
      { path: 'home', component: FridgeComponent },
      { path: 'item-shop', component: ItemShopComponent }
      // Add other child routes for mobile module components
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FridgeRoutingModule { }
