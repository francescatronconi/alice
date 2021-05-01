import { Component } from '@angular/core';
import { ButtonsMenuService } from './services/buttons-menu.service';
import { SharedDataService } from './services/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Alice a Lucca';

  constructor (
    public menu: ButtonsMenuService,
    public shared: SharedDataService,
  ) {
    this.menu.add({id: 'diary', icon: './assets/svg/alice-plain.svg', action: (shared: SharedDataService) => {
      console.log('Touched diary!');
    }})
  }

}
