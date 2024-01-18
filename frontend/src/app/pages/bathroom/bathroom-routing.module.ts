import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BathroomComponent } from './bathroom.component';
import { BathroomHomeComponent } from './home/home_bathroom.component';
import { BathroomItemsComponent } from './bahtroom_items/bathroom_items.component';

const routes: Routes = [
  {
    path: '',
    component: BathroomComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect /mobile to /mobile/home
      { path: 'home', component : BathroomHomeComponent},
      { path: 'home/hygiene', component: BathroomItemsComponent },
      { path: 'home/cleaning', component: BathroomItemsComponent }
      // Add other child routes for mobile module components
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FridgeRoutingModule { }
