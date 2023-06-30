import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CodesComponent } from './codes/codes.component';

const routes: Routes = [
  { path: 'codes', component: CodesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
