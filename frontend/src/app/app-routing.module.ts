import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
 //{ path: 'socket-events', loadChildren: () => import('./pages/socket-events/socket-events.module').then(m => m.SocketEventsModule) },
 { path: 'fridge', loadChildren: () => import('./pages/fridge/fridge.module').then(m => m.FridgeModule) },
 { path: 'mobile', loadChildren: () => import('./pages/mobile/mobile.module').then(m => m.MobileModule ) },
 { path: 'bathroom', loadChildren: () => import('./pages/bathroom/bathroom.module').then(m => m.BathroomModule ) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
