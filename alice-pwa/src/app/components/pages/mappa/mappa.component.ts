import { Component, OnInit } from '@angular/core';

// openlayers
import Map from 'ol/Map';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import Feature, { FeatureLike } from 'ol/Feature'; 
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector' ;
import VectorSource from 'ol/source/Vector' ;
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';

import { TickersService } from 'src/app/services/tickers.service';
import { MapLocation, SharedDataService } from 'src/app/services/shared-data.service';
import { GamePlay, GameScenario, PonteVirtualeService} from 'src/app/services/ponte-virtuale.service';
import { environment } from 'src/environments/environment';
import { features } from 'process';
import { style } from '@angular/animations';


@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.component.html',
  styleUrls: ['./mappa.component.scss']
})
export class MappaComponent implements OnInit {

  position: any;
  map: Map;
  layer: VectorLayer;
  currentposition: number[];
  currentLocation: MapLocation;
  overlay: Overlay;
  play:GamePlay;
  scenario:GameScenario;
  location:MapLocation;
  listFeature: Feature[];

  constructor(
    private tickers: TickersService,
    public shared: SharedDataService,
    private pv: PonteVirtualeService,
  ) { }

  ngOnInit(): void {
    if (navigator.geolocation) {
      this.initMap();
    } else {
      this.position = null;
    }
  }

  initMap() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.position = position;
      if (this.shared.play && this.shared.play.zoomTo) {
        this.shared.scenario.locations
        .filter(l => l.id === this.shared.play.zoomTo)
        .forEach(l => {
          this.currentposition = [l.lon, l.lat];
        });
        this.shared.clearZoomTo();
      } else {
        this.currentposition = [this.position.coords.longitude, this.position.coords.latitude];
      }
      this.startOlMap();
      this.refreshLoop();
    });
  }

  refreshLoop() {
    this.tickers.loop('refresh-position', 2000, () => {
      navigator.geolocation.getCurrentPosition((position) => {
        this.position = position;
        this.currentposition = [this.position.coords.longitude, this.position.coords.latitude];
      });
      // console.log("position upd =>",this.currentposition[0], this.currentposition[1])
      var coordinates = olProj.fromLonLat([this.currentposition[0], this.currentposition[1]])
      this.layer.getSource().getFeatures()[0].setGeometry(coordinates ? new Point(coordinates) : null)
      // console.log(this.layer);
      //this.layer.redraw();
    });
  }

  startOlMap() {
    this.map = new Map({
      target: 'olmap',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat(this.currentposition),
        zoom: 13
      })
    });
    this.layer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(olProj.fromLonLat(this.currentposition)),
            name : "Tu"
          })
        ]
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          src: './assets/svg/cat.svg',
        })
      })
    });
    this.map.addLayer(this.layer);
    this.listFeature = [];
    this.play= JSON.parse(localStorage.getItem("ponte-virtuale-play"));
    this.shared.scenario.locations.map(location => {
        let feature = new Feature({
          geometry: new Point(olProj.fromLonLat([location.lon, location.lat])),
          location: location,
        })
        feature.setStyle(new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            src: location.icon,
          })
        }));
        if(!location.condition || this.pv.checkCondition(location.condition, this.play, this.scenario)) {
          this.listFeature.push(feature)
        }
    })
    this.map.addLayer(new VectorLayer({
      source: new VectorSource({features: this.listFeature})
    }))
    this.overlay = new Overlay({
      element: document.getElementById('popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    this.map.addOverlay(this.overlay);
  }

  clickEmpty(evt: any) {
    let coordinate = this.map.getEventCoordinate(evt);
    let feature = new Feature({
      geometry: new Point(olProj.fromLonLat([10.506664809575186, 43.84051516173453])),
      location: location,
    })
    feature.setStyle(new Style({
      image: new Icon({
        anchor: [0.5, 0.5],
        src: './assets/svg/cat.svg',
      })
    }));
    this.layer.getSource().addFeature(feature);
  }

  clickTappa(evt: any) {
    var pixel = []
    pixel = this.map.getEventPixel(evt);
    var features: FeatureLike[] = this.map.getFeaturesAtPixel(pixel);
    var coordinate = this.map.getEventCoordinate(evt);
    console.log(coordinate);
    if(features.length > 0) {
      this.currentLocation = features[0].get('location');
      this.overlay.setPosition(coordinate);
    } else {
      this.clickEmpty(evt);
    }
  };

  closeLocation(value: boolean): void {
      this.overlay.setPosition(undefined);
  }

  gioca(location: MapLocation): void {
    this.shared.visitTappa(location.id);
  }

}

