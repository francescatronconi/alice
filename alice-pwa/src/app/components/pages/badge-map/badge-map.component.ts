import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SharedDataService, SvgMap } from 'src/app/services/shared-data.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { TickersService } from 'src/app/services/tickers.service';

@Component({
  selector: 'app-badge-map',
  templateUrl: './badge-map.component.html',
  styleUrls: ['./badge-map.component.scss'],
  animations: [
    trigger('badge', [
      // states
      state('mini', style({
        transform: 'scale(1)',
      }), { params: { x: 0, y: 0, s: 1 } }),
      state('full', style({
        transform: 'translate(50px,50px) scale({{s}}) translate({{x}}px,{{y}}px) ',
      }), { params: { x: 0, y: 0, s: 10 } }),
      // transitions
      transition('mini => full', animate('1000ms ease-in-out')),
      transition('full => mini', animate('1000ms ease-in-out')),
    ]),
    trigger('names', [
      // states
      state('mini', style({
        transform: 'translate({{x}}px,{{y}}px) scale({{s}})',
      }), { params: { x: 0, y: 0, s: 0.1 } }),
      state('full', style({
        transform: 'translate(10px,10px) scale(10)',
      })),
      // transitions
      transition('mini => full', animate('1000ms ease-in-out')),
      transition('full => mini', animate('1000ms ease-in-out')),
    ]),
    trigger('fadeinout', [
      transition(':enter', [style({opacity: 0}), animate('1s', style({opacity: 1}))]),
      transition(':leave', [style({opacity: 1}), animate('1s', style({opacity: 0}))]),
    ]),
    trigger('fadefullmini', [
      // states
      state('mini', style({opacity: 0})),
      state('full', style({opacity: 0.8})),
      // transitions
      transition('mini => full', animate('1000ms ease-in-out')),
      transition('full => mini', animate('1000ms ease-in-out')),
    ]),
    trigger('zoominout', [
      transition(':enter', [style({transform: 'scale(0)'}), animate('1s', style({transform: 'scale(1)'}))]),
      transition(':leave', [style({transform: 'scale(1)'}), animate('1s', style({transform: 'scale(0)'}))]),
    ]),
    trigger('mediaitem', [
      transition(':enter', [style({opacity: 0}), animate('1s', style({opacity: 1}))]),
      transition(':leave', [style({opacity: 1}), animate('1s', style({opacity: 0}))]),
    ]),
    trigger('dissolve', [
      state('hidden', style({opacity: 0})),
      state('shown', style({opacity: 1})),
      transition('hidden => shown', animate('500ms ease-in-out')),
      transition('shown => hidden', animate('500ms ease-in-out')),
    ]),
    trigger('pulsating', [
      // states
      state('big', style({
        transform: 'scale(1.2)',
      }), { params: { s: 1.2 } }),
      state('small', style({
        transform: 'scale(1)',
      }), { params: { s: 1 } }),
      // transitions
      transition('big => small', animate('1000ms ease-in-out')),
      transition('small => big', animate('1000ms ease-in-out')),
    ]),
  ],

})
export class BadgeMapComponent implements OnInit {

  svgmap: SvgMap;
  svg: Document;

  background: BadgeMapItem;
  areas: BadgeMapItem[];
  selected: BadgeMapItem;
  triggers: TriggerMapItem[];
  serializer: XMLSerializer;

  constructor(
    private shared: SharedDataService,
    private route: ActivatedRoute,
    private audio: AudioPlayService,
    private timers: TickersService,
  ) { }

  ngOnInit(): void {
    this.serializer = new XMLSerializer();
    this.route.params.subscribe(params => {
      this.svgmap = this.shared.getSvgMap(params['id'] ? params['id'] : 'badges');
      this.initSvgMap();
    });
    // if (this.openBadgeName()) {
    //   this.timers.once('dwindle', 1000, () => {
    //     if (this.selected && this.selected.checkBadge(this.shared)) {
    //       this.closeSelected();
    //     };
    //   });
    // }
  }

  private openBadgeName(): string {
    return this.route.snapshot.paramMap.get('badge');
  }

  badgeStatePin(badge: BadgeMapItem) {
    return { value: badge.state, params: { x: -badge.dx, y: -badge.dy, t: badge.transform, s: 0.9 / badge.ds} };
  }

  initSvgMap() {
    this.shared.getHtmlResource(this.svgmap.svg).then(svg => {
      let parser = new DOMParser();
      this.svg = parser.parseFromString(svg, 'text/xml');
      this.areas = [];
      this.triggers = [];
      this.background = null;
      let elements = this.svg.getElementsByClassName('item');
      for (let index=0; index < elements.length; index++) {
        let element = elements.item(index) as HTMLElement;
        if (element.classList.contains('item')) {
          this._addBadge(element);
        }
        if (element.classList.contains('trigger')) {
          this._addTrigger(element);
        }
        if (element.classList.contains('background')) {
          this._setBackground(element);
        }
      }
      if (this.openBadgeName()) {
        let move: BadgeMapItem[] = [];
        this.areas
        .filter(a => a.id === this.openBadgeName())
        .forEach(a => {
          a.state = 'full';
          move.push(a);
          this.selected = a;
        });
        move.forEach(area => {
          this.moveForward(area);
        });
      };
    });
  }
  private _addBadge(element: HTMLElement) {
    this.areas.push(new BadgeMapItem(element.getAttribute('name'), element).initStyle(this.shared));
  }
  private _addTrigger(element: HTMLElement) {
    this.triggers.push(new TriggerMapItem(element.getAttribute('name'), element));
  }
  private _setBackground(element: HTMLElement) {
    this.background = new BadgeMapItem('background', element);
  }

  xml(area: BadgeMapItem): string {
    let x = this.serializer.serializeToString(area.element);
    while (x.includes('href="~/')) {
      x = x.replace('href="~/', `href="${environment.gameUrl}/`);
    }
    while (x.includes('{score}')) {
      x = x.replace('{score}', `${this.shared.play.score}`);
    }
    return x;
  }

  txml(trig: TriggerMapItem): string {
    let x = this.serializer.serializeToString(trig.element);
    while (x.includes('href="~/')) {
      x = x.replace('href="~/', `href="${environment.gameUrl}/`);
    }
    return x;
  }

  private moveForward(area: BadgeMapItem) {
    this.areas.splice(this.areas.indexOf(area), 1);
    this.areas.push(area);
  }

  clickArea(area: BadgeMapItem) {
    this.audio.play('action');
    if (area.state === 'full') {
      this.handleFullClickArea(area);
    } else {
      this.handleMiniClickArea(area);
    }
  }
  
  areaClasses(): {[cl: string]: boolean} {
    return this.shared.statusCssClasses();
  }

  private closeSelected() {
    this.selected.state = 'mini';
    this.selected = null;
  }

  private handleFullClickArea(area: BadgeMapItem) {
    this.triggerAction(this.selected);
    this.closeSelected();
  }

  private handleMiniClickArea(area: BadgeMapItem) {
    if (this.selected) {
      this.closeSelected();
    } else {
      if (area.checkBadge(this.shared)) {
        area.state = 'full';
        this.selected = area;
        this.moveForward(area);
      } else {
        this.triggerAction(area);
      }
    }
  }

  private triggerAction(area: BadgeMapItem) {
    this.shared.triggerAction(`${area.checkBadge(this.shared) ? 'activate' : 'search'}:${area.id}`);
  }

  clickBackground() {
    if (this.selected) {
      this.audio.play('action');
      this.closeSelected();
    }
  }

  clickTrigger(trig: TriggerMapItem) {
    this.audio.play('action');
    this.shared.triggerAction(`${trig.element.getAttribute('id')}:${this.selected.id}`);
  }

}

export class BadgeMapItem {

  state: string;
  id: string;
  element: HTMLElement;
  transform: string;
  style: string;
  dx: number;
  dy: number;
  ds: number;

  constructor(id: string, element: HTMLElement) {
    this.id = id;
    this.element = element;
    this.state = 'mini';
    this.transform = this.element.getAttribute('transform');
    if (this.transform) {
      this.captureTranslate();
      this.captureMatrix();
    }
  }

  initStyle(shared: SharedDataService): BadgeMapItem {
    this.style = this.checkBadge(shared) ? 'present': 'missing';
    return this;
  }

  checkBadge(shared: SharedDataService): boolean {
    return shared.play.badges.includes(this.id);
  }

  captureTranslate() {
    let r = /translate\(([0-9\.]+),([0-9\.]+)\)/;
    let m = this.transform.match(r);
    if (m) {
      this.ds = 0.15;
      this.dx = Number(m[1]);
      this.dy = Number(m[2]);
    }
  }

  captureMatrix() {
    let r = /matrix\([0-9\.]+,[0-9\.]+,[0-9\.]+,([0-9\.]+),([0-9\.]+),([0-9\.]+)\)/;
    let m = this.transform.match(r);
    if (m) {
      this.ds = Number(m[1]); 
      this.dx = Number(m[2]);
      this.dy = Number(m[3]);
    }
  }

}

export class TriggerMapItem {

  state: string;
  id: string;
  element: Element;
  style: string;

  constructor(id: string, element: Element) {
    this.id = id;
    this.element = element;
    this.state = 'mini';
  }

}