import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  gaMeasurementId: string;

  // cfr https://blexin.com/it/blog/google-analytics/

  constructor(private router: Router) {
  }

  public init(gaMeasurementId: string) {
    this.gaMeasurementId = gaMeasurementId;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.gaMeasurementId) {
          gtag('config', this.gaMeasurementId,
          {
            'page_path': event.urlAfterRedirects
          }
          );
        } else {
          console.log('gtag config', this.gaMeasurementId, event.urlAfterRedirects);
        }
      }
    });
  }

  public event(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null) {
      let options = {
        eventCategory: eventCategory,
        eventLabel: eventLabel,
        eventAction: eventAction,
        eventValue: eventValue
      };
      if (this.gaMeasurementId) {
        gtag('event', eventName, options)
      } else {
        console.log('gtag event', eventName, options);
      }
  }

}