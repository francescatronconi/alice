import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ChallengeViewDirective } from 'src/app/directives/challenge-view.directive';
import { GameChallenge, GameChallengeData } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ChallengeFindFeaturesComponent } from '../challenge-find-features/challenge-find-features.component';

@Component({
  selector: '[app-face-challenge]',
  templateUrl: './face-challenge.component.html',
  styleUrls: ['./face-challenge.component.scss']
})
export class FaceChallengeComponent implements OnInit {

  challenge: GameChallenge;
  data: GameChallengeData;
  @ViewChild(ChallengeViewDirective, {static: true}) appChallengeView!: ChallengeViewDirective;

  constructor(
    public shared: SharedDataService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this.data = this.shared.play.challenge;
    // resolve component to show
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ChallengeFindFeaturesComponent);
    const viewContainerRef = this.appChallengeView.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ChallengeFindFeaturesComponent>(componentFactory);
    // init component
    this.shared.scenario.challenges
    .filter(challenge => challenge.id = this.data.challenge)
    .forEach(challenge => {
      componentRef.instance.init(challenge, this.shared.play.challenge);
      this.challenge = challenge;
    })
  }

}
