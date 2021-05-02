import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TickersService {

  tickers: {[name:string]: any};

  constructor() {
    this.tickers = {};
  }

  once(name: string, ms: number, callback: ()=>void) {
    this.stop(name);
    this.tickers[name] = setInterval(()=>{
      this.stop(name);
      callback();
    }, ms);
  }

  loop(name: string, ms: number, callback: ()=>void) {
    this.stop(name);
    this.tickers[name] = setInterval(callback, ms);
  }

  stop(name: string) {
    if (this.tickers[name]) {
      clearInterval(this.tickers[name]);
    }
  }

}
