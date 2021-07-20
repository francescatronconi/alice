import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameScenario } from 'src/app/services/ponte-virtuale.service';
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
  serializer: XMLSerializer;

  constructor(
    private shared: SharedDataService,
    ) { }

  ngOnInit(): void {
    this.serializer = new XMLSerializer();
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

  xml(area: SvgMapArea): string {
    return this.serializer.serializeToString(area.element);
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