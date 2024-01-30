import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppComponent
  ],
  providers: [],
 
})
export class AppModule { }