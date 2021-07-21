import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedDataService, SvgMap } from 'src/app/services/shared-data.service';

@Component({
  selector: '[app-svg-canvas]',
  templateUrl: './svg-canvas.component.html',
  styleUrls: ['./svg-canvas.component.scss']
})
export class SvgCanvasComponent implements OnInit {

  @Input() svgmap: SvgMap;
  @Output() onClickArea = new EventEmitter<SvgMapArea>();

  svg: Document;
  background: SvgMapArea;
  areas: SvgMapArea[];

  constructor(
    private shared: SharedDataService,
    ) { }

  ngOnInit(): void {
    this.initSvgMap();
  }

  initSvgMap() {
    this.shared.getHtmlResource(this.svgmap.svg).then(svg => {
      let parser = new DOMParser();
      this.svg = parser.parseFromString(svg, 'text/xml');
      if (this.svgmap.background) {
        this.background = new SvgMapArea(this.svgmap.id, this.svg.getElementById(this.svgmap.background));
      }
      this.areas = this.svgmap.ids
      .map(id => new SvgMapArea(id, this.svg.getElementById(id)))
      .filter(area => area.element);
    });
  }

  clickArea(area: SvgMapArea) {
    this.onClickArea.emit(area);
  }

}

export class SvgMapArea {

  id: string;
  element: HTMLElement;

  constructor(id: string, element: HTMLElement) {
    this.id = id;
    this.element = element;
  }

}