import { Component, OnInit } from '@angular/core';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { ButtonsMenuService, MenuButton } from 'src/app/services/buttons-menu.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: '[app-buttons-overlay]',
  templateUrl: './buttons-overlay.component.html',
  styleUrls: ['./buttons-overlay.component.scss']
})
export class ButtonsOverlayComponent implements OnInit {

  credits: string;
  fullscreen: string;

  constructor(
    public menu: ButtonsMenuService,
    private shared: SharedDataService,
    private audio: AudioPlayService,
  ) { }

  ngOnInit(): void {
    this.credits = this.shared.scenario.credits;
    this.fullscreen = this.shared.scenario.fullscreen ? this.shared.getGameResourceUrl(this.shared.scenario.fullscreen) : null;
  }

  clickItem(button: MenuButton) {
    this.audio.play('action');
    button.action(this.shared);
  }

}
