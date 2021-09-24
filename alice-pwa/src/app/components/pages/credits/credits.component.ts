import { Component, OnInit } from '@angular/core';
import { HrefResolverService } from 'src/app/services/href-resolver.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {

  credits: string;

  constructor(
    private shared: SharedDataService,
    private resolver: HrefResolverService,
  ) { }

  ngOnInit(): void {
    if (this.shared.scenario.credits) {
      this.shared.getHtmlResource(this.shared.scenario.credits)
      .then(credits => {
        this.credits = credits;
      });
    }
  }

}
