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
    .forEach((rule) => this.applyEffect(rule.effect, scenario, play, ""))
    ;
  }

  visit(scenario: GameScenario, play: GamePlay, location: string) {
    scenario.rules
    .filter((rule) => (rule.trigger.code === 'visit' && rule.trigger.locationid === location))
    .forEach((rule) => this.applyEffect(rule.effect, scenario, play, location))
    ;
  }

  applyEffect(effect: GameEffect, scenario: GameScenario, play: GamePlay, location: string): void {
    if (effect.code === 'story') {
      GameEffectStory.run(effect as GameEffectStory, scenario, play);
    }
    if (effect.code === 'badge') {
      GameEffectBadge.run(play, location);
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
  locationid: string;

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
  read?: string;
}

export class GameEffectBadge extends GameEffect {
  static run(play: GamePlay, location: string) {
    play.badge.push(location);
  }

}

export class GamePlay {
  situation: string[];
  story: GamePlayStory[];
  badge: string[];

  constructor() {
    this.situation = [];
    this.story = [];
    this.badge = [];
  }
}

export class GamePlayStory {
  origin: GameEffectStoryItem;
  published: boolean;
}


export class GamePlayBadge {
  locationId: string
}


