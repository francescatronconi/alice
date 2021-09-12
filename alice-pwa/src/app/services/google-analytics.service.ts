import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  // cfr https://blexin.com/it/blog/google-analytics/

  constructor(private router: Router) {
  }

  public init(gaMeasurementId: string) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        gtag('config', gaMeasurementId,
          {
            'page_path': event.urlAfterRedirects
          }
        );
      }
    });
  }

  public event(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null) {
    gtag('event', eventName, {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    })
  }

}