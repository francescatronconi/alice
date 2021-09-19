import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcceptCookieService {

  accept: boolean;
  stated: boolean;

  private acceptKey = 'pv-accept-cookies';
  private statedKey = 'pv-stated-cookies';

  constructor() {
    this.stated = JSON.parse(localStorage.getItem(this.statedKey)) && true || false;
    this.accept = JSON.parse(localStorage.getItem(this.acceptKey)) && true || false;
  }

  doAccept() {
    this.accept = true;
    this.stated = true;
    localStorage.setItem(this.acceptKey, 'true');
    localStorage.setItem(this.statedKey, 'true');
  }

  doDeny() {
    this.accept = false;
    this.stated = true;
    localStorage.setItem(this.acceptKey, 'false');
    localStorage.setItem(this.statedKey, 'true');
  }

}
