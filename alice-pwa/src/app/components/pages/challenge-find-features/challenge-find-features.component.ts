import { Component, OnInit } from '@angular/core';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { GameChallenge, GameChallengeData, GameChallengePlaceFeatures, GameChallengePlaceFeaturesGuess, PonteVirtualeService } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService, SvgMap } from 'src/app/services/shared-data.service';
import { SvgMapArea } from '../../widgets/svg-canvas/svg-canvas.component';

@Component({
  selector: 'app-challenge-find-features',
  templateUrl: './challenge-find-features.component.html',
  styleUrls: ['./challenge-find-features.component.scss']
})
export class ChallengeFindFeaturesComponent implements OnInit {

  challenge: GameChallengePlaceFeatures;
  data: GameChallengePlaceFeaturesGuess;

  svgmap: SvgMap;

  constructor(
    private shared: SharedDataService,
    private audio: AudioPlayService,
    ) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    console.log(this.data);
    console.log(this.challenge);
    this.svgmap = this.shared.getSvgMap(this.challenge.svgmap);
  }

  init(challenge: GameChallenge, data: GameChallengeData) {
    this.challenge = challenge as GameChallengePlaceFeatures;
    this.data = data as GameChallengePlaceFeaturesGuess;
  }

  clickArea(area: SvgMapArea) {
    this.audio.play('action');
    console.log(area);
    this.data.guess[area.id] = !this.data.guess[area.id];
    if (this.isDoneButton(area)) {
      let allFound = this.challenge.success.filter(present => !this.data.guess[present]).length === 0;
      let noWrong = Object.keys(this.data.guess).filter(miss => !this.data.guess[miss]).filter(miss => this.challenge.success.includes(miss)).length === 0;
      if (allFound && noWrong) {
        this.shared.successfulChallenge();
      } else {
        this.shared.failedChallenge();
      }
    } else {
      this.shared.updateGui();
      this.shared.savePlay();
    }
  }

  areaClass(area: SvgMapArea): {[id: string]: boolean} {
    if (this.isDoneButton(area)) {
      return {};
    }
    return {removed: this.data.guess[area.id] ? false: true};
  }

  isDoneButton(area: SvgMapArea): boolean {
    return area.id === 'done';
  }

}
