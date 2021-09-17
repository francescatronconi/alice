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
  @Input() css: {[id: string]: boolean};

  svg: Document;
  background: SvgMapArea;
  areas: SvgMapArea[];

  constructor(
    private shared: SharedDataService,
    ) { }

  ngOnInit(): void {
    if (!this.css) {
      this.css = {'fullsvg': true};
    }
    this.initSvgMap();
  }

  initSvgMap() {
    this.shared.getHtmlResource(this.svgmap.svg).then(svg => {
      let parser = new DOMParser();
      this.svg = parser.parseFromString(svg, 'text/xml');
      if (this.svgmap.background) {
        this.background = new SvgMapArea(this.svgmap.id, this.svg.getElementById(this.svgmap.background));
      }
      if (this.svgmap.ids) {
        this.findAreasByIds();
      } else {
        this.areas = [];
      }
      this.addAreasByClass();
    });
  }

  private findAreasByIds() {
    this.areas = this.svgmap.ids
    .map(id => new SvgMapArea(id, this.svg.getElementById(id)))
    .filter(area => area.element ? true: false);
  }

  private addAreasByClass() {
    let items = this.svg.getElementsByClassName("item");
    for (let index = 0; index < items.length; index++) {
      const element = items.item(index);
      this.areas.push(new SvgMapArea(element.getAttribute("id"), element as HTMLElement));
    }
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

  hasClass(classname: string) {
    return this.element.classList.contains(classname);
  }

}