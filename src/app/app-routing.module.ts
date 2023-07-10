import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CodesComponent } from './codes/codes.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'codes', component: CodesComponent},
  { path: '', component: HomeComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
