import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HandControlComponent } from './pages/hand-control/hand-control.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/hand-control/hand-control.module').then(m => m.HandControlModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
