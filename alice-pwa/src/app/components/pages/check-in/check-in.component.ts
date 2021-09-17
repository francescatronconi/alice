import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService, SvgMap } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit {
  
  svgmap: SvgMap;

  constructor(
    public shared: SharedDataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    //this.router.navigate(this.shared.scenario.buttons[0].action);
    this.svgmap = this.shared.getSvgMap('welcome');
  }
}
