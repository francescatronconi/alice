import { Component, OnInit } from '@angular/core';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { GameChallenge, GameChallengeData, GameChallengeIdentikit, GameChallengeIdentikitData, PonteVirtualeService } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService, SvgMap } from 'src/app/services/shared-data.service';
import { SvgMapArea } from '../../widgets/svg-canvas/svg-canvas.component';

@Component({
  selector: 'app-challenge-identikit',
  templateUrl: './challenge-identikit.component.html',
  styleUrls: ['./challenge-identikit.component.scss']
})
export class ChallengeIdentikitComponent implements OnInit {

  challenge: GameChallengeIdentikit;
  data: GameChallengeIdentikitData;

  svgmap: SvgMap;
  max: {[id:string]: number};

  constructor(
    private shared: SharedDataService,
    private audio: AudioPlayService,
    ) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    console.log(this.data);
    console.log(this.challenge);
    this.svgmap = this.shared.getSvgMap(this.challenge.svgmap);
    this.max = {};
    this.challenge.options
    .forEach(option => this.max[option.id] = option.options);
  }

  init(challenge: GameChallenge, data: GameChallengeData) {
    this.challenge = challenge as GameChallengeIdentikit;
    this.data = data as GameChallengeIdentikitData;
  }

  clickArea(area: SvgMapArea) {
    this.audio.play('action');
    if (this.isDoneButton(area)) {
      this.checkDone();
      return;
    }
    if (this.isExitButton(area)) {
      this.exitGame();
      return;
    }
    this.toggleOption(area);
  }

  exitGame() {
    this.shared.cancelChallenge();
    this.shared.updateGui();
    this.shared.savePlay();
  }

  toggleOption(area: SvgMapArea) {
    if (this.data.options[area.id] === this.max[area.id]) {
      this.data.options[area.id] = 1;
    } else {
      this.data.options[area.id] = this.data.options[area.id] + 1;
    }
    this.shared.updateGui();
    this.shared.savePlay();
  }

  checkDone() {
    let wrong = this.challenge.options
    .filter(option => this.data.options[option.id] != option.success)
    .length;
    if (wrong === 0) {
      this.shared.successfulChallenge();
    } else {
      this.shared.failedChallenge();
    }
  }

  areaClass(area: SvgMapArea): {[id: string]: boolean} {
    let c = {};
    c[`identikit-area-${this.data.options[area.id]}`] = true;
    return c;
  }

  isDoneButton(area: SvgMapArea): boolean {
    return area.id === 'done' || area.hasClass('button-done');
  }
  isExitButton(area: SvgMapArea): boolean {
    return area.id === 'exit' || area.hasClass('button-exit');
  }

}
