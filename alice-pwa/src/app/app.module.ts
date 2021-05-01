import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckInComponent } from './components/pages/check-in/check-in.component';
import { ButtonsOverlayComponent } from './components/pages/buttons-overlay/buttons-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckInComponent,
    ButtonsOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
