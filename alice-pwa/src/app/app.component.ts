import { Component } from '@angular/core';
import { LocationService } from './services/location.service';
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
    private loc: LocationService,
  ) {}

}
