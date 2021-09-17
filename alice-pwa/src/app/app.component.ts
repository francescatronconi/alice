import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { SharedDataService, SvgMap } from './services/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Alice il gioco';
  environment = environment;
  svgFrame: SvgMap;

  constructor (
    private titleService: Title,
    public shared: SharedDataService,
  ) {
    this.titleService.setTitle(this.title);
    this.shared.scenarioReadyObs.subscribe(scenario => {
      this.svgFrame = this.shared.getSvgMap('frame');
      if (!this.shared.play) {
        this.shared.startGame();
      }
    });

  }

}
