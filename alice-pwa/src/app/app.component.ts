import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AcceptCookieService } from './services/accept-cookie.service';
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
    public cookies: AcceptCookieService,
  ) {
    this.setupFavicon('assets/favicon-wvoce.ico');
    this.titleService.setTitle(this.title);
    this.shared.scenarioReadyObs.subscribe(scenario => {
      if (scenario.favicon) {
        this.setupFavicon(this.shared.getGameResourceUrl(scenario.favicon));
      }
      this.svgFrame = this.shared.getSvgMap('frame');
      if (!this.shared.play) {
        this.shared.startGame();
      }
    });
  }

  private setupFavicon(url: string) {
    // https://stackoverflow.com/questions/260857/changing-website-favicon-dynamically
    let link: HTMLLinkElement = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = url;
  }

}
