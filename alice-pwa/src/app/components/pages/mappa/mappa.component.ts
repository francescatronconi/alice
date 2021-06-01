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
import { SharedDataService } from 'src/app/services/shared-data.service';

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
  currentFeature: FeatureLike;
  overlay: Overlay;

  constructor(
    private tickers: TickersService,
    public shared: SharedDataService,
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
      this.currentposition = [this.position.coords.longitude, this.position.coords.latitude];
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
    this.map.addLayer(new VectorLayer({
      source: new VectorSource({
        features: this.shared.scenario.locations.map(location => new Feature({
          geometry: new Point(olProj.fromLonLat([location.lon, location.lat])),
          longitude : location.lon,
          latitude: location.lat,
          name : location.name,
          id: location.id,
        })
        )
      }),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 0.5],
          src: './assets/svg/cat.svg',
        })
      }),
    }));
    this.overlay = new Overlay({
      element: document.getElementById('popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    this.map.addOverlay(this.overlay)
  }

  clickTappa(evt: any) {
    var pixel = []
    pixel = this.map.getEventPixel(evt);
    var feature: FeatureLike[] = this.map.getFeaturesAtPixel(pixel);
    var coordinate = this.map.getEventCoordinate(evt)
    if(feature.length > 0) {
      this.currentFeature = feature[0];
      if (feature[0].get('id') != null) {
        updateTappeLocalStorage(this.currentFeature);
      }
      this.overlay.setPosition(coordinate);
    }
  };


  closeLocation(value: boolean): void {
      this.overlay.setPosition(undefined);
  }

  gioca(location: FeatureLike): void {
    this.shared.visitTappa(location.get('id'));
  }

}

function updateTappeLocalStorage(featureSelected: any) {
  var id = featureSelected.get('id');
  var tappe = JSON.parse(localStorage.getItem("tappe"));
  tappe = tappe ? tappe : [];
  var tappasuperato = tappe.find(element => element === id);
  if (tappasuperato === undefined) {
    tappe.push(id);
    localStorage.setItem("tappe", JSON.stringify(tappe));
  }
}

