import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  badges: string[] =[];

  constructor() { }

  ngOnInit(): void {
    let localStoragePlay = JSON.parse(localStorage.getItem("ponte-virtuale-play"))
    this.badges = localStoragePlay.badge
  }

}
