import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CodesGetComponent } from './codes-get/codes-get.component';
import { CodesPostComponent } from './codes-post/codes-post.component';

@NgModule({
  declarations: [
    AppComponent,
    CodesGetComponent,
    CodesPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
