import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  badgespath: any;
  badges: string[] =[];

  constructor() { }

  ngOnInit(): void {
    this.badgespath = JSON.parse(localStorage.getItem("badges"))
    if (this.badgespath !== null) {
      this.badges.push(this.badgespath)
    }
  }

}
