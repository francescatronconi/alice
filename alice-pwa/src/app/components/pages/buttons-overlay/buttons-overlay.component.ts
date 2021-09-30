import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { ButtonsMenuService, MenuButton } from 'src/app/services/buttons-menu.service';
import { MapButton } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: '[app-buttons-overlay]',
  templateUrl: './buttons-overlay.component.html',
  styleUrls: ['./buttons-overlay.component.scss']
})
export class ButtonsOverlayComponent implements OnInit {

  credits: string;
  fullscreen: string;

  buttons: {[layout: string]: MapButton[]} = {
    'top-left': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-right': [],
  };
  layouts: string[] = [];

  constructor(
    private shared: SharedDataService,
    private audio: AudioPlayService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.credits = this.shared.scenario.credits;
    this.fullscreen = this.shared.scenario.fullscreen ? this.shared.getGameResourceUrl(this.shared.scenario.fullscreen) : null;
    this.shared.scenario.buttons.forEach(button => {
      let layout = button.layout ? button.layout : 'top-left';
      this.buttons[layout].push(button);
      if (!this.layouts.includes(layout)) {
        this.layouts.push(layout);
      }
    });
  }

  clickItem(button: MapButton) {
    this.audio.play('action');
    if (button.action) {
      this.router.navigate(button.action);
    }
    if (button.href) {
      window.open(button.href, '_blank');
    }
  }

}
