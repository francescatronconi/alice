import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  
  locations: MapLocation[];

  constructor() { 
    this.locations = [
      {id:"1", name: 'Giardino della cattedrale', icon: 'live', lon: 10.506664809575186, lat: 43.84051516173453 },
      {id:"2", name: 'Biblioteca Civica Agorà', icon: 'live', lon: 10.505977822127294, lat: 43.84181374706096 },
      {id:"3", name: 'Conservatorio', icon: 'live', lon: 10.50644001063504, lat: 43.84288571680807 },
      //{name: 'Giardino della cattedrale', icon: 'live', lon: 10.506664809575186, lat: 43.84051516173453 },
      //{name: 'Giardino della cattedrale', icon: 'live', lon: 10.506664809575186, lat: 43.84051516173453 },
      //{name: 'Giardino della cattedrale', icon: 'live', lon: 10.506664809575186, lat: 43.84051516173453 },
    ];
  }

}

export class StoryChapter {

  title?: string;
  audio?: string;
  video?: string;

}

export class MapLocation {

  id: string;
  name: string;
  icon: string;
  lat: number;
  lon: number;

}