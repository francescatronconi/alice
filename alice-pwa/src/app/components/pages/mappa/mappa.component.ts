import { Component, OnDestroy, OnInit } from '@angular/core';

// openlayers
import Map from 'ol/Map';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import Feature, { FeatureLike } from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';

import { MapLocation, PlayChange, SharedDataService } from 'src/app/services/shared-data.service';
import { GamePlay, GameScenario, PonteVirtualeService } from 'src/app/services/ponte-virtuale.service';
import { LocationService } from 'src/app/services/location.service';
import { Coordinate } from 'ol/coordinate';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AudioPlayService } from 'src/app/services/audio-play.service';

@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.component.html',
  styleUrls: ['./mappa.component.scss']
})
export class MappaComponent implements OnInit, OnDestroy {

  position: any;
  map: Map;
  youLayer: VectorLayer;
  featuresLayer: VectorLayer;
  overlay: Overlay;
  location: MapLocation;
  featureById: { [id: string]: Feature };
  youFeature: Feature;
  playChangeSub: Subscription;
  subscriptions: Subscription[];

  showdisclaimer: boolean;
  canusegps: boolean;
  gpsIsNeeded: boolean;
  watchsubscribed: boolean;

  constructor(
    public shared: SharedDataService,
    private pv: PonteVirtualeService,
    private loc: LocationService,
    private audio: AudioPlayService,
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.featureById = {};
    this.position = null;
    this.subscriptions = [];
    this.subscriptions.push(this.shared.playChangedOb.subscribe(change => this.refreshFeatures(change)));
    // disclaimer
    let settings = this.shared.getSettings();
    if ('location' in settings) {
      this.showdisclaimer = false;
      if (settings['location'] === 'enabled') {
        this.enableGps();
      }
    } else {
      this.showdisclaimer = true;
    }
    this.startOlMap();
  }

  enableGps() {
    this.watchsubscribed = false;
    navigator.geolocation.getCurrentPosition((position) => {
      this.position = position;
      this.subscriptions.push(this.loc.init().subscribe(position => {
        this.updatePosition(position)
        if (!this.watchsubscribed) {
          this.watchsubscribed = true;
          this.subscriptions.push(this.loc.watchPosition().subscribe(position => {this.updatePosition(position)}));
        }
      }));
      this.addYourPosition();
    });
  }

  updatePosition(position: any) {
    if (position) {
      this.position = position;
      if (!this.map) {
        this.startOlMap();
      }
      this.youFeature.setGeometry(new Point(
        olProj.fromLonLat([this.position.coords.longitude, this.position.coords.latitude])
      ))
    }
  }

  refreshFeatures(change: PlayChange): void {
    this.addNewFeatures();
    this.removeStaleFeatures();
    if (this.shared.play.zoomTo) {
      this.map.setView(this.mapView());
    }
  }

  mapView(): View {
    let zoom: number;
    let center: Coordinate;
    if (this.shared.play.zoomTo) {
      this.shared.scenario.locations
      .filter(l => l.id === this.shared.play.zoomTo)
      .forEach(l => {
        center = olProj.fromLonLat([l.lon, l.lat])
        if (this.overlay) {
          this.location = l;
          this.overlay.setPosition(center);
        }
      });
      zoom = 18;
      this.shared.clearZoomTo();
    } else {
      center = olProj.fromLonLat([this.shared.scenario.map.lon, this.shared.scenario.map.lat]);
      zoom = this.shared.scenario.map.zoom;
    }
    return new View({
      center: center,
      zoom: zoom
    })
}

  private removeStaleFeatures() {
    this.shared.scenario.locations
      .filter(location => location.condition && !this.pv.checkCondition(location.condition, this.shared.play, this.shared.scenario))
      .filter(location => this.featureById.hasOwnProperty(location.id))
      .forEach(location => {
        this.removeFeatureLocation(location);
      });
  }

  private addNewFeatures() {
    this.shared.scenario.locations
      .filter(location => !location.condition || this.pv.checkCondition(location.condition, this.shared.play, this.shared.scenario))
      .filter(location => !this.featureById.hasOwnProperty(location.id))
      .forEach(location => {
        this.addFeatureLocation(location);
      });
  }

  startOlMap() {
    // Map
    this.map = new Map({
      target: 'olmap',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ]
    });
    // popup overlay
    this.overlay = new Overlay({
      element: document.getElementById('popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    this.map.addOverlay(this.overlay);
    // Main view and center
    this.map.setView(this.mapView());
    // features
    this.featuresLayer = new VectorLayer({
      source: new VectorSource({ features: [] })
    });
    this.gpsIsNeeded = this.shared.scenario.locations.filter(location => location.near).length > 0;
    let sorted = this.shared.scenario.locations.map(location => location);
    sorted.sort((a, b) => b.lat < a.lat ? -1 : 1)
    sorted
      .filter(location => !location.condition || this.pv.checkCondition(location.condition, this.shared.play, this.shared.scenario))
      .filter(location => this.canusegps || !location.near)
      .forEach(location => {
        this.addFeatureLocation(location);
      });
    this.map.addLayer(this.featuresLayer);
  }

  addYourPosition() {
    this.youFeature = new Feature({
      geometry: new Point(olProj.fromLonLat([this.position.coords.longitude, this.position.coords.latitude])),
      name: "Tu"
    });
    this.youFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: this.shared.scenario.map.user && this.shared.scenario.map.user.anchor ? this.shared.scenario.map.user.anchor : [0.5, 0.5],
          src: this.shared.scenario.map.user ? this.shared.getGameResourceUrl(this.shared.scenario.map.user.icon) : './assets/svg/user.svg',
        })
      })
    );
    this.youLayer = new VectorLayer({
      source: new VectorSource({
        features: [this.youFeature]
      }),
    });
    this.map.addLayer(this.youLayer);
  }

  private addFeatureLocation(location: MapLocation) {
    let feature = new Feature({
      geometry: new Point(olProj.fromLonLat([location.lon, location.lat])),
      location: location,
    });
    feature.setStyle(new Style({
      image: new Icon({
        anchor: location.anchor ? location.anchor : [0.5, 0.5],
        src: location.icon,
      })
    }));
    this.featuresLayer.getSource().addFeature(feature);
    this.featureById[location.id] = feature;
  }

  private removeFeatureLocation(location: MapLocation) {
    this.featuresLayer.getSource().removeFeature(this.featureById[location.id]);
    delete this.featureById[location.id];
  }

  clickMappa(evt: any) {
    var pixel = [];
    pixel = this.map.getEventPixel(evt);
    var features: FeatureLike[] = this.map.getFeaturesAtPixel(pixel);
    var coordinate = this.map.getEventCoordinate(evt);
    if (features.length > 0) {
      this.audio.play('action');
      this.location = features[0].get('location');
      if (this.location) {
        this.overlay.setPosition(coordinate);
      } else {
        this.overlay.setPosition(undefined);
      }
    } else {
      this.closeLocation();
    }
  };

  clickCloseLocation() {
    this.audio.play('action');
    this.closeLocation();
  }

  closeLocation(): void {
    this.location = null;
    this.overlay.setPosition(undefined);
  }

  clickGioca(location: MapLocation): void {
    this.audio.play('action');
    this.shared.visitTappa(location.id);
  }

  clickAllowNavigation(canusegps: boolean) {
    this.audio.play('action');
    this.canusegps = canusegps;
    this.shared.putSetting('location', canusegps ? 'enabled': 'disabled');
    this.showdisclaimer = false;
    if (canusegps) {
      this.enableGps();
    }
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

  findWayHref(location: MapLocation) {
    if (this.position) {
      return `https://www.google.com/maps/dir/${this.position.coords.latitude},${this.position.coords.longitude}/${location.lat},${location.lon}`;
    } else {
      return `https://www.google.com/maps?q=${location.lat},${location.lon}`;
    }
  }

}

