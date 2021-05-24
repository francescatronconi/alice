import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GamePlay, GamePlayStory, GameScenario, PonteVirtualeService } from './ponte-virtuale.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  
  locations: MapLocation[];
  scenario: GameScenario;
  play: GamePlay;

  constructor(
    private pv: PonteVirtualeService,
  ) { 
    this.locations = [
      {id:"1", name: 'Giardino della cattedrale', icon: 'live', lon: 10.506664809575186, lat: 43.84051516173453, badge:'./assets/svg/cat.svg' },
      {id:"2", name: 'Biblioteca Civica Agorà', icon: 'live', lon: 10.505977822127294, lat: 43.84181374706096, badge:''},
      {id:"3", name: 'Conservatorio', icon: 'live', lon: 10.50644001063504, lat: 43.84288571680807, badge:''},
      //{name: 'Giardino della cattedrale', icon: 'live', lon: 10.506664809575186, lat: 43.84051516173453 },
      //{name: 'Giardino della cattedrale', icon: 'live', lon: 10.506664809575186, lat: 43.84051516173453 },
      //{name: 'Giardino della cattedrale', icon: 'live', lon: 10.506664809575186, lat: 43.84051516173453 },
    ];
    this.pv.loadGameScenario(environment.gameUrl)
    .then((scenario) => {
      this.scenario = scenario;
      console.log("scenario", scenario)
      this.loadPlay();
    });
  }

  startGame() {
    this.play = new GamePlay();
    this.pv.start(this.scenario, this.play);
    this.savePlay();
  }

  savePlay() {
    localStorage.setItem("ponte-virtuale-play", JSON.stringify(this.play));
  }

  loadPlay() {
    let saved = localStorage.getItem("ponte-virtuale-play");
    if (saved) {
      this.play = JSON.parse(saved);
    }
  }

  readNewStory(story: GamePlayStory) {
    story.published = true;
    this.savePlay();
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
  badge:string;

}