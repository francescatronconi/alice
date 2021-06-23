import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Feature, { FeatureLike } from 'ol/Feature';
import { MapLocation } from 'src/app/services/shared-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() location: MapLocation;
  @Input() position: any;
  @Output() close = new EventEmitter<boolean>();
  @Output() gioca = new EventEmitter<MapLocation>();


  constructor() { }

  ngOnInit(): void {
  }

  clickCloseLocation() {
    this.close.emit(true);
  }

  clickGioca() {
    this.gioca.emit(this.location);
    this.close.emit(true)
  }

  nearToPlay(): boolean {
    return this.location && (!this.location.near || this.checkDistance()) ? true: false;
  }

  private checkDistance() {
    let difQuadLat = Math.pow(this.location.lat - this.position.coords.latitude,2)
    let difQuadLon = Math.pow(this.location.lon - this.position.coords.longitude, 2)
    let distance = Math.sqrt(difQuadLon + difQuadLat) * 1000
    return distance < environment.nearby;
  }

}
