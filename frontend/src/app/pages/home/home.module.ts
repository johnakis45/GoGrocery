import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DairyViewComponent } from './Dairy/Dairy_view/dairy-view.component';


@NgModule({
  declarations: [HomeComponent,
    DairyViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
