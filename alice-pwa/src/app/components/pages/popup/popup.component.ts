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
  @Output() close = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  clickCloseLocation() {
    this.close.emit(true);
  }

}
