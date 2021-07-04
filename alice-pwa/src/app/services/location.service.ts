import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public locationTrackingActive = false;
  public position: any;
  private watchLocationOb: Subject<any>;
  //private getLocationOb: Subject<any>;

  constructor() {
    if (navigator.geolocation) {
      this.watchLocationOb = new BehaviorSubject<any>(this.position);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.position = position;
        }
      );
    }
  }

  // getPosition(): Observable<any> {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         this.position = position;
  //         //this.getLocationOb.next(this.position);
  //       },
  //       (err) => {
  //         //console.log(err);
  //       }
  //     );
  //   }
  //   return this.getLocationOb;
  // }

  watchPosition(): Observable<any> {
    const opts = { enableHighAccuracy: true, maximumAge: 60000, timeout: 30000 };
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          this.locationTrackingActive = true;
          this.position = position;
          this.watchLocationOb.next(this.position);
        },
        (err) => {
          //console.log(err);
          this.locationTrackingActive = false;
        },
        opts
      );
    }
    return this.watchLocationOb;
  }

}
