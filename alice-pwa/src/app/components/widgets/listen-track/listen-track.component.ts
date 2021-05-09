import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-listen-track',
  templateUrl: './listen-track.component.html',
  styleUrls: ['./listen-track.component.scss'],
  animations: [
    trigger('mediaitem', [
      state('hidden', style({opacity: 0, transform: 'translate(0px,60px)'})),
      state('shown', style({opacity: 1, transform: 'translate(0px,0px)'})),
      transition('hidden => shown', animate('500ms')),
      transition('shown => hidden', animate('500ms')),
    ]),
  ],
  
})

export class ListenTrackComponent implements OnInit {

  @Input() src: string;
  @Input() state: string;
  @Output() ended = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.state = this.state ? this.state : 'hidden';
  }

  onEnded(event: any) {
    console.log(event);
  }

  logMe(something) {
    console.log(something);
  }

  clickAudio() {
    this.state = this.state === 'shown' ? 'hidden' : 'shown';
  }

}
