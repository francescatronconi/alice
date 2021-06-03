import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

   punteggio = 'Il punteggio è ' + this.shared.play.score;

  constructor(
    public shared: SharedDataService
  ) { }

  ngOnInit(): void {
  }

}
