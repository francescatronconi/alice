import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  visit(scenario: GameScenario, play: GamePlay, location: string) {
    scenario.rules
    .filter((rule) => (rule.trigger.code === 'visit' && rule.trigger.location === location))
    .forEach((rule) => this.applyEffect(rule.effect, scenario, play))
    ;
  }

  applyEffect(effect: GameEffect, scenario: GameScenario, play: GamePlay): void {
    if (effect.code === 'story') {
      GameEffectStory.run(effect as GameEffectStory, scenario, play);
    }
    if (effect.code === 'badge') {
      GameEffectBadge.run(effect as GameEffectBadge, scenario, play);
    }
    if (effect.code === 'options') {
      GameEffectOptions.run(effect as GameEffectOptions, scenario, play);
    }
    if (effect.code === 'score') {
      GameEffectScore.run(effect as GameEffectScore, scenario, play);
    }
  }

  getOptions(scenario: GameScenario, play: GamePlay) {
    let options: Option[];
    if(play.options.length > 0) {
      scenario.options
      .filter((gameOption) => gameOption.code === play.options[0]) 
      .forEach((gameOption) => (options = gameOption.options))
      }
    return options;
  }

  setOption(play: GamePlay, scenario: GameScenario, option: Option) {
    this.applyEffect(option.effect, scenario, play)
    play.options.shift();
    console.log("play", play)
    console.log("option", option)
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

}

export class GameRule {

  trigger: GameTrigger;
  effect: GameEffect;

}

export class GameTrigger {

  code: string;
  location?: string;

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
  badge: string;
  static run(effect: GameEffectBadge, scenario: GameScenario, play: GamePlay) {
    if (!play.badges.includes(effect.badge)) play.badges.push(effect.badge);
  }
}

export class GameEffectScore extends GameEffect {
 score: number;
  static run(effect: GameEffectScore, scenario: GameScenario, play: GamePlay) {
    play.score += effect.score;
  }
}

export class GameEffectOptions extends GameEffect {
  options: string;
  story: GameEffectStoryItem[];
  static run(effect: GameEffectOptions, scenario: GameScenario, play: GamePlay) {
    if (!play.options.includes(effect.options)) play.options.push(effect.options);
    if (effect.story) 
    [].push.apply(play.story, effect.story.map(story => ({origin: story, published: false} as GamePlayStory) ));
  }
}

export class GamePlay {
  situation: string[];
  story: GamePlayStory[];
  badges: string[];
  options: string[];
  score: number;

  constructor() {
    this.situation = [];
    this.story = [];
    this.badges = [];
    this.options = [];
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

  code: string;
  options: Option[];

}

export class Option {
  text: string;
  effect: GameEffect;
}


