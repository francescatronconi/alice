import { Component, OnInit } from '@angular/core';
import { GameChallenge, GameChallengeData } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: '[app-face-challenge]',
  templateUrl: './face-challenge.component.html',
  styleUrls: ['./face-challenge.component.scss']
})
export class FaceChallengeComponent implements OnInit {

  challenge: GameChallenge;
  data: GameChallengeData;

  constructor(
    public shared: SharedDataService,
  ) { }

  ngOnInit(): void {
    this.data = this.shared.play.challenge;
    this.shared.scenario.challenges
    .filter(challenge => challenge.id = this.data.challenge)
    .forEach(challenge => {
      this.challenge = challenge;
    })
  }

}
