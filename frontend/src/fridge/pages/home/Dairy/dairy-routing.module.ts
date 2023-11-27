import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DairyViewComponent } from './Dairy_view/dairy-view.component';
import { DairyComponent } from './dairy.component';

const routes: Routes = [
  {
    path: '',
    component: DairyComponent,
    children: [
      { path: 'view', component: DairyViewComponent },
      { path: '**', redirectTo: 'view', pathMatch: 'full' },]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DairyRoutingModule { }