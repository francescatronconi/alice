import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
  }

  clickItem(button: MenuButton) {
    button.action(this.shared);
  }

}
