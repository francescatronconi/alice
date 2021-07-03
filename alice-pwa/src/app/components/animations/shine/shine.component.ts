import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { shineBackward, shineForward } from '../animations';

@Component({
  selector: '[app-shine]',
  templateUrl: './shine.component.html',
  styleUrls: ['./shine.component.scss'],
  animations: [
    trigger('shinef', [
      transition(':enter', [useAnimation(shineForward)]),
    ]),
    trigger('shineb', [
      transition(':enter', [useAnimation(shineBackward)]),
    ]),
  ]
})
export class ShineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
