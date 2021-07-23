import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ButtonsMenuService } from './buttons-menu.service';
import { Option, GamePlay, GamePlayStory, GameScenario, PonteVirtualeService, GameCondition, GameEffect} from './ponte-virtuale.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  scenario: GameScenario;
  play: GamePlay;
  currentStory: GamePlayStory;
  options: Option[];

  private playChangedSource = new Subject<PlayChange>();
  playChangedOb = this.playChangedSource.asObservable();
  private scenarioReadySource = new Subject<GameScenario>();
  scenarioReadyObs = this.scenarioReadySource.asObservable();

  markChanged(change: PlayChange) {
    this.playChangedSource.next(change);
  }

  constructor(
    private pv: PonteVirtualeService,
    private http: HttpClient,
    public menu: ButtonsMenuService,
    private router: Router,
  ) { 
    this.pv.loadGameScenario(`${environment.gameUrl}/game.json`)
    .then((scenario) => {
      this.scenario = scenario;
      this.loadButtons();
      this.loadPlay();
      this.scenarioReadySource.next(scenario);
    });
  }

  private loadButtons() {
    this.scenario.buttons.forEach(b => this.menu.add({
      id: b.id, icon: b.icon, action: () => {
        this.router.navigate(b.action);
      }
    }));
  }

  startGame() {
    this.play = new GamePlay();
    this.play.id = this.scenario.id;
    this.pv.start(this.scenario, this.play);
    this.findNextStory();
    this.options = this.getOptions();
    this.updateGui();
    this.savePlay();
  }

  resolveEffect(effect: GameEffect) {
    this.pv.applyEffect(effect, this.scenario, this.play);
    this.updateGui();
    this.savePlay();
  }

  savePlay() {
    localStorage.setItem("ponte-virtuale-play", JSON.stringify(this.play));
    this.markChanged({change: 'play-saved'});
  }

  deletePlay() {
    localStorage.removeItem("ponte-virtuale-play");
  }

  restartGame() {
    this.deletePlay();
  }

  closeWindow() {
    window.close();
  }

  clearZoomTo() {
    this.play.zoomTo = null;
  }

  setZoomTo(id: string) {
    this.scenario.locations
    .filter(l => l.id === id)
    .forEach(l => {
      this.play.zoomTo = id;
    })
  }

  loadPlay() {
    let saved = localStorage.getItem("ponte-virtuale-play");
    if (saved) {
      let play = JSON.parse(saved);
      if (play.id && play.id === this.scenario.id) {
        this.play = play;
      } else {
        localStorage.removeItem("ponte-virtuale-play");
      }
    }
  }

  updateGui() {
    this.findNextStory();
    this.findZoomTo();
    this.options = this.getOptions();
    if (this.play.route) {
      this.router.navigate(this.play.route);
      this.play.route = null;
    }
  }

  findZoomTo() {
    if (this.play.zoomTo) {
      this.router.navigate(['mappa']);
    }
  }

  findNextStory() {
    let unpublished = this.play.story.filter(item => !item.published);
    this.currentStory = unpublished.length > 0 ? unpublished[0] : null ;
  }

  readCurrentStory() {
    this.currentStory.published = true;
    this.findNextStory();
    this.savePlay();
  }

  visitTappa(location: string) {
    this.pv.visit(this.scenario, this.play, location);
    this.updateGui();
    this.savePlay();
  }

  successfulChallenge() {
    this.pv.successfulChallenge(this.scenario, this.play);
    this.updateGui();
    this.savePlay();
  }

  failedChallenge() {
    this.pv.failedChallenge(this.scenario, this.play);
    this.updateGui();
    this.savePlay();
  }

  qrCode(code: string): boolean  {
    this.pv.qr(this.scenario, this.play, code);
    this.updateGui();
    this.savePlay();
    return true;
  }

  getOptions() {
    return this.pv.getOptions(this.scenario, this.play);
  }

  setOption(option : Option) {
    this.pv.setOption(this.play, this.scenario, option)
    this.updateGui();
    this.savePlay();
  }

  removeOptions() {
    this.options = null
  }

  public getHtmlResource(url: string): Promise<string> {
    return this.http
    .get<string>(`${environment.gameUrl}/${url}`, {responseType: 'text' as 'json'})
    .toPromise();
  }

  public getSvgMap(id: string): SvgMap {
    let result: SvgMap = null;
    this.scenario.svgmaps
    .filter(svgmap => svgmap.id === id)
    .forEach(svgmap => {
      result = svgmap;
    });
    return result;
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
  near: boolean;
  condition: GameCondition;
  description: string;
}

export class SvgMap {
  //{"id": "agora", "svg": "./assets/svg/agora.svg", "background": "bg", "ids": ["hall", "desk", "comics"]}
  id: string;
  svg: string;
  background: string;
  ids: string[];
}

export class PlayChange {
  change: string;
}
