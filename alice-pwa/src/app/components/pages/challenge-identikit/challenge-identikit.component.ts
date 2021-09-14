import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { GameChallenge, GameChallengeData, GameChallengeIdentikit, GameChallengeIdentikitData, PonteVirtualeService } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService, SvgMap } from 'src/app/services/shared-data.service';
import { SvgCanvasComponent, SvgMapArea } from '../../widgets/svg-canvas/svg-canvas.component';

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

  wrappers: SvgMapAreaWrapper[];

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

  clickWrapper(wrapper: SvgMapAreaWrapper) {
    this.audio.play('action');
    this.toggleContainer(wrapper);
  }

  toggleContainer(wrapper: SvgMapAreaWrapper) {
    wrapper.current = wrapper.current +1;
    if (wrapper.current >= wrapper.options.length) {
      wrapper.current = 0;
    }
    this.data.options[`identikit-${wrapper.index}`];
  }

  containerClass(wrapper: SvgMapAreaWrapper): string {
    return `identikit-area-${wrapper.current}`;
  }

  checkDoneOld() {
    let wrong = this.challenge.options
    .filter(option => this.data.options[option.id] != option.success)
    .length;
    if (wrong === 0) {
      this.shared.successfulChallenge();
    } else {
      this.shared.failedChallenge();
    }
  }

  checkDone() {
    let wrong = this.wrappers
    .filter(wrapper => wrapper.options)
    .filter(wrapper => wrapper.current != wrapper.correct)
    .length;
    console.log(wrong);
    if (wrong === 0) {
      this.shared.successfulChallenge();
    } else {
      this.shared.failedChallenge();
    }
  }

  isDoneButton(area: SvgMapArea): boolean {
    return area.id === 'done' || area.hasClass('button-done');
  }
  isExitButton(area: SvgMapArea): boolean {
    return area.id === 'exit' || area.hasClass('button-exit');
  }
  isToggleButton(area: SvgMapArea): boolean {
    return area.id === 'exit' || area.hasClass('button-toggle');
  }

  wrapAreas(areas: SvgMapArea[]) {
    if (!this.wrappers) {
      this.wrappers = areas.map((area, index) => new SvgMapAreaWrapper(index, area));
    }
    return this.wrappers;
  }

}

class SvgMapAreaWrapper {

  index: number;
  area: SvgMapArea;
  options: SvgMapArea[];
  current: number;
  correct: number;
  
  constructor(index: number, area: SvgMapArea) {
    this.index = index;
    this.area = area;
    if (area.hasClass('identikit')) {
      this.readOptions();
    }
  }

  readOptions() {
    this.options = [];
    this.area.element.querySelectorAll('.option').forEach(option => {
      let index = this.options.length;
      option.classList.add(`identikit-option`);
      option.classList.add(`identikit-option-${index}`);
      if (option.classList.contains('correct')) {
        this.correct = index;
      };
      this.options.push(new SvgMapArea(option.getAttribute('id'), option as HTMLElement));
    });
    this.current = 0;
  }

  getClass() {
    let c = {};
    c[`identikit-area-${this.current}`] = true;
    return c;
  }  

}
