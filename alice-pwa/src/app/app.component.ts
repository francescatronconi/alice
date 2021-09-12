import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { SharedDataService } from './services/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Alice il gioco';
  environment = environment;

  constructor (
    private titleService: Title,
    public shared: SharedDataService,
    private analytics: GoogleAnalyticsService,
  ) {
    this.titleService.setTitle(this.title);
    this.analytics.init(environment.gaMeasurementId);
    this.analytics.event('start', 'app', 'init');
  }

}
