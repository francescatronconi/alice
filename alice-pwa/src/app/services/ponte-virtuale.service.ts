import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { MapLocation } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class PonteVirtualeService {

  start(scenario: GameScenario, play: GamePlay) {
    scenario.rules
    .filter((rule) => rule.trigger === 'start')
    .forEach((rule) => this.applyEffect(rule.effect, scenario, play))
    ;
  }

  visit(scenario: GameScenario, play: GamePlay, location: string) {
    scenario.rules
    .filter((rule) => (rule.trigger.match(/visit:(.*)/) && rule.trigger.match(/visit:(.*)/)[1] === location))
    .forEach((rule) => this.apply(rule, scenario, play))
    ;
  }

  apply(rule: GameRule, scenario: GameScenario, play: GamePlay): void {
    console.log(rule)
    if(this.checkCondition(rule.condition, play, scenario)) {
      this.applyEffect(rule.effect, scenario, play)}
    else {

    }
  }

  checkCondition(condition: GameCondition, play:GamePlay, scenario:GameScenario): boolean {
    let check: boolean = true;
    if(GameRule.validCondition(condition)) {
      if (GameConditionBadge.valid(condition as GameConditionBadge)) {
        check = GameConditionBadge.check(condition as GameConditionBadge, play);
      }
      if (GameConditionNoBadge.valid(condition as GameConditionNoBadge)) {
        check = GameConditionNoBadge.check(condition as GameConditionNoBadge, play);
      }
    }
    return check;
  }

  applyEffect(effect: GameEffect, scenario: GameScenario, play: GamePlay): void {
    if (GameEffectStory.valid(effect as GameEffectStory)) {
      GameEffectStory.run(effect as GameEffectStory, scenario, play);
    }
    if (GameEffectBadge.valid(effect as GameEffectBadge)) {
      GameEffectBadge.run(effect as GameEffectBadge, scenario, play);
    }
    if (GameEffectOptions.valid(effect as GameEffectOptions)) {
      GameEffectOptions.run(effect as GameEffectOptions, scenario, play);
    }
    if (GameEffectScore.valid(effect as GameEffectScore)) {
      GameEffectScore.run(effect as GameEffectScore, scenario, play);
    }
  }

  getOptions(scenario: GameScenario, play: GamePlay) {
    let options: Option[];
    if(play.options.length > 0) {
      scenario.options
      .filter((gameOption) => gameOption.id === play.options[0]) 
      .forEach((gameOption) => (options = gameOption.options))
      }
    return options;
  }

  setOption(play: GamePlay, scenario: GameScenario, option: Option) {
    this.applyEffect(option.effect, scenario, play)
    play.options.shift();
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
  badges: GameBadge[];
  options: GameOption[];
  locations: MapLocation[];

}

export class GameRule {

  trigger: string;
  effect: GameEffect;
  condition: GameCondition;

  static validCondition(condition: GameCondition) {
    return condition ? true : false;
  }
}

export class GameEffect {
}

export class GameCondition {
  
  nobadge: string;
  enabled: boolean;
}

export class GameConditionBadge extends GameCondition {
  badge: string;

  static valid(condition: GameConditionBadge) {
    console.log(condition)
    return condition.badge ? true : false;
  }

  static check(condition: GameConditionBadge, play: GamePlay) : boolean {
    return play.badges.includes(condition.badge);
  }

}

export class GameConditionNoBadge extends GameCondition {
  nobadge: string;

  static valid(condition: GameConditionNoBadge) {
    return condition.nobadge ? true : false;
  }

  static check(condition: GameConditionNoBadge, play: GamePlay) : boolean {
    return !play.badges.includes(condition.nobadge);;
  }
  
}

export class GameEffectStory extends GameEffect {
  story: GameEffectStoryItem[];
  static run(effect: GameEffectStory, scenario: GameScenario, play: GamePlay) {
    [].push.apply(play.story, effect.story.map(story => ({origin: story, published: false} as GamePlayStory) ));
  }
  static valid(effect: GameEffectStory) {
    return effect.story ? true : false;
  }
}

export class GameEffectStoryItem {
  read?: string;
}

export class GameEffectBadge extends GameEffect {
  badge: string;
  static run(effect: GameEffectBadge, scenario: GameScenario, play: GamePlay) {
    if (!play.badges.includes(effect.badge)) play.badges.push(effect.badge);
  }
  static valid(effect: GameEffectBadge) {
    return effect.badge ? true : false;
  }
}

export class GameEffectScore extends GameEffect {
 score: number;
  static run(effect: GameEffectScore, scenario: GameScenario, play: GamePlay) {
    play.score += effect.score;
  }
  static valid(effect: GameEffectScore) {
    return effect.score ? true : false;
  }
}

export class GameEffectOptions extends GameEffect {
  options: string;
  static run(effect: GameEffectOptions, scenario: GameScenario, play: GamePlay) {
    if (!play.options.includes(effect.options)) play.options.push(effect.options);
  }
  static valid(effect: GameEffectOptions) {
    return effect.options ? true : false;
  }
}

export class GamePlay {
  
  situation: string[];
  story: GamePlayStory[];
  badges: string[];
  options: string[];
  locationScore: [];
  score: number;
  zoomTo: string;

  constructor() {
    this.situation = [];
    this.story = [];
    this.badges = [];
    this.options = [];
    this.locationScore = [];
    this.score = 0;
  }
}

export class GamePlayStory {
  origin: GameEffectStoryItem;
  published: boolean;
}


export class GameBadge {
  badge: string;
  src: string;
}

export class GameOption {
  id: string;
  options: Option[];
}

export class Option {
  text: string;
  effect: GameEffect;
}

