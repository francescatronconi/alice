import { BrowserModule } from '@angular/platform-browser';
import { ChangeDetectorRef, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckInComponent } from './components/pages/check-in/check-in.component';
import { ButtonsOverlayComponent } from './components/pages/buttons-overlay/buttons-overlay.component';
import { DiarioComponent } from './components/pages/diario/diario.component';
import { MappaComponent } from './components/pages/mappa/mappa.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ListenTrackComponent } from './components/widgets/listen-track/listen-track.component';
import { TellStoryComponent } from './components/pages/tell-story/tell-story.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WatchVideoComponent } from './components/widgets/watch-video/watch-video.component';
import { PopupComponent } from './components/pages/popup/popup.component';
import { HttpClientModule } from '@angular/common/http';
import { StoryPopupComponent } from './components/pages/story-popup/story-popup.component';
import { BadgeComponent } from './components/pages/badge/badge.component';
import { ReadStoryComponent } from './components/widgets/read-story/read-story.component';
import { OptionPopupComponent } from './components/pages/option-popup/option-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    CheckInComponent,
    ButtonsOverlayComponent,
    DiarioComponent,
    MappaComponent,
    ListenTrackComponent,
    TellStoryComponent,
    WatchVideoComponent,
    PopupComponent,
    StoryPopupComponent,
    BadgeComponent,
    ReadStoryComponent,
    OptionPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    //{ provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
