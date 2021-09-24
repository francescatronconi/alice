import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { on } from 'events';
import { BehaviorSubject, Subject } from 'rxjs';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { GameScenario } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService, SvgMap } from 'src/app/services/shared-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-svg-map',
  templateUrl: './svg-map.component.html',
  styleUrls: ['./svg-map.component.scss']
})
export class SvgMapComponent implements OnInit {

  svgmap: SvgMap;
  svg: Document;

  background: SvgMapArea;
  areas: SvgMapArea[];
  serializer: XMLSerializer;

  constructor(
    private route: ActivatedRoute,
    private shared: SharedDataService,
    private router: Router,
    private audio: AudioPlayService,
    ) { }

  ngOnInit(): void {
    this.serializer = new XMLSerializer();
    if (this.shared.scenario) {
      this.readScenario(this.shared.scenario);
    } else {
      this.shared.scenarioReadyObs.subscribe(scenario => {
        this.readScenario(this.shared.scenario);
      });
    }
  }

  readScenario(scenario: GameScenario) {
    scenario.svgmaps
    .filter(svgmap => svgmap.id === this.route.snapshot.paramMap.get('id'))
    .forEach(svgmap => this.svgmap = svgmap);
    if (this.svgmap) {
      this.initSvgMap();
    }
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

  clickMe() {
    this.shared.setZoomTo('biblioteca');
    this.router.navigate(['mappa']);
  }

  xml(area: SvgMapArea): string {
    let x = this.serializer.serializeToString(area.element);
    while (x.includes('href="~/')) {
      x = x.replace('href="~/', `href="${environment.gameUrl}/`);
    }
    return x;
  }

  clickArea(area: SvgMapArea) {
    this.shared.visitTappa(area.id);
  }

}

class SvgMapArea {

  id: string;
  element: HTMLElement;

  constructor(id: string, element: HTMLElement) {
    this.id = id;
    this.element = element;
  }

}