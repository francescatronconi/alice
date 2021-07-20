import { Component, OnInit } from '@angular/core';
import { GameChallenge, GameChallengeData, GameChallengePlaceFeatures, GameChallengePlaceFeaturesGuess } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService, SvgMap } from 'src/app/services/shared-data.service';
import { SvgMapArea } from '../../widgets/svg-canvas/svg-canvas.component';

@Component({
  selector: 'app-challenge-find-features',
  templateUrl: './challenge-find-features.component.html',
  styleUrls: ['./challenge-find-features.component.scss']
})
export class ChallengeFindFeaturesComponent implements OnInit {

  data: GameChallengePlaceFeaturesGuess;
  features: GameChallengePlaceFeatures;

  svgmap: SvgMap;

  constructor(private shared: SharedDataService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    console.log(this.data);
    console.log(this.features);
    this.svgmap = this.shared.getSvgMap('challenge-01');
  }

  init(challenge: GameChallenge, data: GameChallengeData) {
    this.features = challenge as GameChallengePlaceFeatures;
    this.data = data as GameChallengePlaceFeaturesGuess;
  }

  clickArea(area: SvgMapArea) {
    console.log(area);
    if (area.id === 'feature-01') {
      this.shared.play.challenge = null;
      this.shared.updateGui();
      this.shared.savePlay();
    }
  }

}
