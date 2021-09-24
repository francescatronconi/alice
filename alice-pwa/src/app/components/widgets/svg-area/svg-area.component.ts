import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SvgMapArea } from '../svg-canvas/svg-canvas.component';

@Component({
  selector: '[app-svg-area]',
  templateUrl: './svg-area.component.html',
  styleUrls: ['./svg-area.component.scss']
})
export class SvgAreaComponent implements OnInit {

  @Input() area: SvgMapArea;
  @Output() onClickArea = new EventEmitter<SvgMapArea>();

  serializer: XMLSerializer;

  constructor() { }

  ngOnInit(): void {
    this.serializer = new XMLSerializer();
  }

  xml(): string {
    if (this.area.element) {
      let x = this.serializer.serializeToString(this.area.element);
      while (x.includes('href="~/')) {
        x = x.replace('href="~/', `href="${environment.gameUrl}/`);
      }
      return x;
    } else {
      return '';
    }
  }

  clickArea(area: SvgMapArea) {
    this.onClickArea.emit(area);
  }

}
