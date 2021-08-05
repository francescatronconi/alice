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

  constructor(
    public menu: ButtonsMenuService,
    private shared: SharedDataService,
    private audio: AudioPlayService,
  ) { }

  ngOnInit(): void {
  }

  clickItem(button: MenuButton) {
    this.audio.play('action');
    button.action(this.shared);
  }

}
