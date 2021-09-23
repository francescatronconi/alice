import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-direct-trigger',
  templateUrl: './direct-trigger.component.html',
  styleUrls: ['./direct-trigger.component.scss']
})
export class DirectTriggerComponent implements OnInit {

  constructor(
    private shared: SharedDataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.shared.qrCode(this.route.snapshot.paramMap.get('id'));
    }
  }

}
