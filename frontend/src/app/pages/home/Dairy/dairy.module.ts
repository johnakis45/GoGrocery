import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DairyRoutingModule } from './dairy-routing.module';
import { DairyComponent } from './dairy.component';


@NgModule({
  declarations: [DairyComponent],
  imports: [
    CommonModule,
    FormsModule,
    DairyRoutingModule
  ]
})
export class DairyModule { }
