import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HandControlRoutingModule } from './hand-control-routing.module';
import { HandControlComponent } from './hand-control.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HandControlComponent
  ],
  imports: [
    CommonModule,
    HandControlRoutingModule,
    FormsModule 
  ]
})
export class HandControlModule { }