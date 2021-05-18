import { Component, OnInit } from '@angular/core';

// openlayers
import Map from 'ol/Map';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import Feature from 'ol/Feature';
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

  constructor(
    private tickers: TickersService,
    private shared: SharedDataService,
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
      this.startOlMap();
      //this.refreshLoop();
    });
  }

  refreshLoop() {
    this.tickers.loop('refresh-position', 1000, () => {
      //this.currentposition[0] = 43.715101
      //this.currentposition[1] = 10.396559
      console.log(this.layer);
      //this.layer.redraw();
    });
  }

  startOlMap() {
    this.currentposition = [this.position.coords.longitude, this.position.coords.latitude];
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
    var overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    this.map = new Map({
      overlays: [overlay],
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
      }),
    });
    this.map.addLayer(this.layer);
    this.map.addLayer(new VectorLayer({
      source: new VectorSource({
        features: this.shared.locations.map(location => new Feature({
          geometry: new Point(olProj.fromLonLat([location.lon, location.lat])),
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
    var mappa = this.map
    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };
    var displayFeatureInfo = function(pixel, coordinate) {
      var featureSelected;
      mappa.forEachFeatureAtPixel(pixel, function(feature) {
        featureSelected = feature
      });
      if(featureSelected != null) {
        var name = featureSelected.get('name')
        content.innerHTML = '<p>hai cliccato:</p><code>'+ name +'</code>';
        overlay.setPosition(coordinate)
        updateTappeLocalStorage(featureSelected);
      }
      console.log(featureSelected)
    };
    mappa.on('click', function(evt) {
      var pixel = evt.pixel;
      var coordinate = evt.coordinate;
      displayFeatureInfo(pixel, coordinate);

    });
  }
}

function updateTappeLocalStorage(featureSelected: any) {
  checkTappeLocalStorage();
  var id = featureSelected.get('id');
  console.log('id: ' + id)
  if (id != null) {
    var tappe = JSON.parse(localStorage.getItem("tappe"));
    var trovato = tappe.find(element => element === id);
    if (trovato === undefined) {
      tappe.push(id);
      localStorage.setItem("tappe", JSON.stringify(tappe));
    }
  }
}

function checkTappeLocalStorage() {
  var tappe = localStorage.getItem("tappe");
  if (tappe === null || tappe === undefined) {
    localStorage.setItem("tappe", JSON.stringify([]));
  }
}

