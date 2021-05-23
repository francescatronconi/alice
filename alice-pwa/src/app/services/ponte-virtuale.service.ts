import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PonteVirtualeService {

  start(scenario: GameScenario, play: GamePlay) {
    scenario.rules
    .filter((rule) => rule.trigger.code === 'start')
    .forEach((rule) => this.applyEffect(rule.effect, scenario, play))
    ;
  }

  applyEffect(effect: GameEffect, scenario: GameScenario, play: GamePlay): void {
    if (effect.code === 'story') {
      GameEffectStory.run(effect as GameEffectStory, scenario, play);
    }
  }

  constructor(
    private http: HttpClient,
  ) { }

  loadGameScenario(url: string): Promise<GameScenario> {
    return this.http.get<GameScenario>(url).toPromise();
  };

}

export class GameScenario {

  rules: GameRule[];

}

export class GameRule {

  trigger: GameTrigger;
  effect: GameEffect;

}

export class GameTrigger {

  code: string;

}

export class GameEffect {
  code: string;
}
export class GameEffectStory extends GameEffect {
  code: 'story';
  story: GameEffectStoryItem[];
  static run(effect: GameEffectStory, scenario: GameScenario, play: GamePlay) {
    [].push.apply(play.story, effect.story.map(story => ({origin: story, published: false} as GamePlayStory) ));
  }
}
export class GameEffectStoryItem {
  code: string;
}
export class GameEffectStoryItemRead extends GameEffectStoryItem {
  code: 'read';
  read?: string;
}

export class GamePlay {
  situation: string[];
  story: GamePlayStory[];

  constructor() {
    this.situation = [];
    this.story = [];
  }
}
export class GamePlayStory {
  origin: GameEffectStory;
  published: boolean;
}