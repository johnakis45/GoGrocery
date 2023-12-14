import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ItemShopComponent } from './pages/item-shop/item-shop.component';
import { InventoryComponent } from './pages/home/Inventory/inventory.component';
import { TasksComponent } from './pages/tasks/tasks.component';

const routes: Routes = [
  // { path: 'socket-events', loadChildren: () => import('./pages/socket-events/socket-events.module').then(m => m.SocketEventsModule) },
  //{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
 // { path: 'cook', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
 { path: 'tasks', component: TasksComponent},
  { path: 'item-shop', component: ItemShopComponent},
  { path: 'home', component: HomeComponent}, 
  {path: 'inventory/:id', component: InventoryComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
