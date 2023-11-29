import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ItemShopComponent } from './pages/item-shop/item-shop.component';

const routes: Routes = [
  // { path: 'socket-events', loadChildren: () => import('./pages/socket-events/socket-events.module').then(m => m.SocketEventsModule) },
  { path: 'fridge/tasks', loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'fridge/home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'fridge/cook', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'fridge/item-shop', component: ItemShopComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FridgeRoutingModule { }
