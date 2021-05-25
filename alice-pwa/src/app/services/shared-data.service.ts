import { HttpClient } from '@angular/common/http';
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
  currentStory: GamePlayStory;

  constructor(
    private pv: PonteVirtualeService,
    private http: HttpClient,
  ) { 
    this.locations = [
      {id:"1", name: 'Giardino della cattedrale', icon: 'live', lon: 10.506664809575186, lat: 43.84051516173453, badge:'./assets/svg/cat.svg' },
      {id:"2", name: 'Biblioteca Civica Agorà', icon: 'live', lon: 10.505977822127294, lat: 43.84181374706096, badge:''},
      {id:"3", name: 'Conservatorio', icon: 'live', lon: 10.50644001063504, lat: 43.84288571680807, badge:''},
      //{name: 'Giardino della cattedrale', icon: 'live', lon: 10.506664809575186, lat: 43.84051516173453 },
      //{name: 'Giardino della cattedrale', icon: 'live', lon: 10.506664809575186, lat: 43.84051516173453 },
      //{name: 'Giardino della cattedrale', icon: 'live', lon: 10.506664809575186, lat: 43.84051516173453 },
    ];
    this.pv.loadGameScenario(`${environment.gameUrl}/game.json`)
    .then((scenario) => {
      this.scenario = scenario;
      this.loadPlay();
    });
  }

  startGame() {
    this.play = new GamePlay();
    this.pv.start(this.scenario, this.play);
    this.findNextStory();
    this.savePlay();
  }

  savePlay() {
    localStorage.setItem("ponte-virtuale-play", JSON.stringify(this.play));
  }

  loadPlay() {
    let saved = localStorage.getItem("ponte-virtuale-play");
    if (saved) {
      this.play = JSON.parse(saved);
      this.findNextStory();
    }
  }

  findNextStory() {
    let unpublished = this.play.story.filter(item => !item.published);
    this.currentStory = unpublished.length > 0 ? unpublished[0] : null ;
    console.log(this.currentStory);
  }

  readCurrentStory() {
    this.currentStory.published = true;
    this.findNextStory();
    this.savePlay();
  }

  visitTappa(location: string) {
    this.pv.visit(this.scenario, this.play, location);
    this.savePlay();
  }

  getHtmlResource(url: string): Promise<string> {
    return this.http
    .get<string>(`${environment.gameUrl}/${url}`, {responseType: 'text' as 'json'})
    .toPromise();
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