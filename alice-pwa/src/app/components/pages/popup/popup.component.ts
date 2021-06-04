import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Feature, { FeatureLike } from 'ol/Feature';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() currentFeature: FeatureLike;
  @Input() position: any;
  @Input() nearToPlay:boolean;
  @Output() close = new EventEmitter<boolean>();
  @Output() gioca = new EventEmitter<FeatureLike>();

  constructor() { }

  ngOnInit(): void {
  }

  clickCloseLocation() {
    this.close.emit(true);
  }

  clickGioca() {
    this.gioca.emit(this.currentFeature);
    this.close.emit(true)
  }

}
