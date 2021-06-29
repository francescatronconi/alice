import { Component } from '@angular/core';
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
    public shared: SharedDataService,
  ) {}

}
