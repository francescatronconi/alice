import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { SharedDataService } from './services/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Alice il gioco';
  environment = environment;

  constructor (
    private titleService: Title,
    public shared: SharedDataService,
  ) {
    this.titleService.setTitle(this.title);
    this.shared.scenarioReadyObs.subscribe(scenario => {
      if (!this.shared.play) {
        this.shared.startGame();
      }
    });

  }

}
