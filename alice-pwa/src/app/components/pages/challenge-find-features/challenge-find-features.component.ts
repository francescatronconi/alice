import { Component, OnInit } from '@angular/core';
import { GameChallenge, GameChallengeData, GameChallengePlaceFeatures, GameChallengePlaceFeaturesGuess } from 'src/app/services/ponte-virtuale.service';

@Component({
  selector: 'app-challenge-find-features',
  templateUrl: './challenge-find-features.component.html',
  styleUrls: ['./challenge-find-features.component.scss']
})
export class ChallengeFindFeaturesComponent implements OnInit {

  data: GameChallengePlaceFeaturesGuess;
  features: GameChallengePlaceFeatures;

  constructor() { }

  ngOnInit(): void {
  }

  init(challenge: GameChallenge, data: GameChallengeData) {
    this.features = challenge as GameChallengePlaceFeatures;
    this.data = data as GameChallengePlaceFeaturesGuess;
  }

}
