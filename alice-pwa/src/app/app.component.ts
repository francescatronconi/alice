import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonsMenuService } from './services/buttons-menu.service';
import { GamePlayStory } from './services/ponte-virtuale.service';
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
    private router: Router,
  ) {
    this.menu.add({id: 'diario', icon: './assets/svg/diario.svg', action: (shared: SharedDataService) => {
      this.router.navigate(['diario']);
    }});
    this.menu.add({id: 'mappa', icon: './assets/svg/mappa.svg', action: (shared: SharedDataService) => {
      this.router.navigate(['mappa']);
    }});
    this.menu.add({id: 'badge', icon: './assets/svg/badge.svg', action: (shared: SharedDataService) => {
      this.router.navigate(['badge']);
    }});
    this.menu.add({id: 'biblioteca', icon: './assets/svg/biblioteca.svg', action: (shared: SharedDataService) => {
      this.router.navigate(['biblioteca']);
    }});
    this.menu.add({id: 'porta', icon: './assets/svg/porta.svg', action: (shared: SharedDataService) => {
      this.router.navigate(['porta']);
    }});
  }

}
