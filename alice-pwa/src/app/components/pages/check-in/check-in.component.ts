import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {

  saved = JSON.parse(localStorage.getItem("ponte-virtuale-play"));
  punteggio = 'Il punteggio è ' + this.saved.score;

  constructor() { }

  ngOnInit(): void {
  }

}
