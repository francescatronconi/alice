import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapLocation } from './shared-data.service';
import { SvgMap } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class PonteVirtualeService {

  start(scenario: GameScenario, play: GamePlay) {
    play.event = new GameEventStart();
    this.runScenarioRules(scenario, play);
  }

  runScenarioRules(scenario: GameScenario, play: GamePlay) {
    scenario.rules.forEach(rule => this.checkAndRunRule(rule, scenario, play));
  }

  checkAndRunRule(rule: GameRule, scenario: GameScenario, play: GamePlay): void {
    if (
      GameEventStart.validEvent(rule, scenario, play) ||
      GameEventVisit.validEvent(rule, scenario, play) ||
      !rule.trigger
      ) {
        if(!rule.condition || this.checkCondition(rule.condition, play, scenario)) {
          if (rule.effect) {
            this.applyEffect(rule.effect, scenario, play);
          }
          if (rule.rules) {
            rule.rules.forEach(sub => this.checkAndRunRule(sub, scenario, play));
          }
        }
    }
  }

  visit(scenario: GameScenario, play: GamePlay, location: string) {
    play.event = new GameEventVisit(location);
    this.runScenarioRules(scenario, play);
  }

  apply(rule: GameRule, scenario: GameScenario, play: GamePlay): void {
    if(this.checkCondition(rule.condition, play, scenario)) {
      this.applyEffect(rule.effect, scenario, play)
    }
  }

  checkCondition(condition: GameCondition, play:GamePlay, scenario:GameScenario): boolean {
    let check: boolean = true;
    console.log(condition);
    if(GameRule.validCondition(condition)) {
      console.log("valid", condition);
      if (GameConditionBadge.valid(condition as GameConditionBadge)) {
        check = check && GameConditionBadge.check(condition as GameConditionBadge, play);
      }
      if (GameConditionNoBadge.valid(condition as GameConditionNoBadge)) {
        check = check && GameConditionNoBadge.check(condition as GameConditionNoBadge, play);
      }
      if (GameConditionTag.valid(condition as GameConditionTag)) {
        check = check && GameConditionTag.check(condition as GameConditionTag, play);
      }
      if (GameConditionNoTag.valid(condition as GameConditionNoTag)) {
        check = check && GameConditionNoTag.check(condition as GameConditionNoTag, play);
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
    if (GameEffectTag.valid(effect as GameEffectTag)) {
      GameEffectTag.run(effect as GameEffectTag, scenario, play);
    }
    if (GameEffectGoToLocation.valid(effect as GameEffectGoToLocation)) {
      GameEffectGoToLocation.run(effect as GameEffectGoToLocation, scenario, play);
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

  id: string;
  rules: GameRule[];
  badges: GameBadge[];
  options: GameOption[];
  locations: MapLocation[];
  svgmaps: SvgMap[];
}

export class GameEvent {
}

export class GameEventStart extends GameEvent {

  start = true;

  static validEvent(rule: GameRule, scenario: GameScenario, play: GamePlay): boolean {
    return (play.event as GameEventStart).start && rule.trigger === 'start';
  }

}

export class GameEventVisit {

  location: string;

  constructor(location: string) {
    this.location = location;
  }

  static validEvent(rule: GameRule, scenario: GameScenario, play: GamePlay): boolean {
    let event = (play.event as GameEventVisit);
    let r = /visit:(.*)/;
    return event.location && rule.trigger && rule.trigger.match(r) && rule.trigger.match(r)[1] === event.location;
  }

}

export class GameRule {

  trigger: string;
  effect: GameEffect;
  condition: GameCondition;
  rules: GameRule[];

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
    return condition.badge ? true : false;
  }

  static check(condition: GameConditionBadge, play: GamePlay) : boolean {
    console.log("condition badge", play.badges, condition.badge);
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

export class GameConditionTag extends GameCondition {
  tag: string;

  static valid(condition: GameConditionTag) {
    return condition.tag ? true : false;
  }

  static check(condition: GameConditionTag, play: GamePlay) : boolean {
    return play.tags.includes(condition.tag);
  }

}

export class GameConditionNoTag extends GameCondition {
  noTag: string;

  static valid(condition: GameConditionNoTag) {
    return condition.noTag ? true : false;
  }

  static check(condition: GameConditionNoTag, play: GamePlay) : boolean {
    return !play.tags.includes(condition.noTag);
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

export class GameEffectTag extends GameEffect {
  tag: string;
  static run(effect: GameEffectTag, scenario: GameScenario, play: GamePlay) {
    if (!play.tags.includes(effect.tag)) play.tags.push(effect.tag);
  }
  static valid(effect: GameEffectTag) {
    return effect.tag ? true : false;
  }
}

export class GameEffectGoToLocation extends GameEffect {
  location: string;
  static run(effect: GameEffectGoToLocation, scenario: GameScenario, play: GamePlay) {
    scenario.locations
    .filter(l => l.id === effect.location)
    .forEach(l => {
      play.zoomTo = effect.location;
    });
  }
  static valid(effect: GameEffectGoToLocation) {
    return effect.location ? true : false;
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
  
  id: string;
  situation: string[];
  story: GamePlayStory[];
  badges: string[];
  options: string[];
  locationScore: [];
  score: number;
  zoomTo: string;
  tags: string[];
  event: GameEvent;

  constructor() {
    this.situation = [];
    this.story = [];
    this.badges = [];
    this.options = [];
    this.locationScore = [];
    this.score = 0;
    this.tags= [];
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

