import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-svg-map',
  templateUrl: './svg-map.component.html',
  styleUrls: ['./svg-map.component.scss']
})
export class SvgMapComponent implements OnInit {

  constructor(
    private shared: SharedDataService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  clickMe() {
    this.shared.setZoomTo('biblioteca');
    this.router.navigate(['mappa']);
  }

}
