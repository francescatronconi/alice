import { Component, OnInit } from '@angular/core';
import { GameBadge } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  environment = environment;
  saved = JSON.parse(localStorage.getItem("ponte-virtuale-play"));
  punteggio = 'Il punteggio è ' + this.saved.score;
  
  constructor(public shared: SharedDataService) { }
  
  ngOnInit(): void {
  }
  
  badges(): GameBadge[] {
    let m: {[id:string]: GameBadge} = {};
    this.shared.scenario.badges.forEach(b => m[b.badge] = b);
    return this.shared.play.badges.map(b => m[b]);
  }

}
