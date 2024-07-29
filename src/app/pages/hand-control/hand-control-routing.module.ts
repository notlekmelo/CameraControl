import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HandControlComponent } from './hand-control.component';

const routes: Routes = [
  {path: '', component: HandControlComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HandControlRoutingModule { }
