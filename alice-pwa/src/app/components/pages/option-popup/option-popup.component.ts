import { Component, OnInit, Input } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Option } from 'src/app/services/ponte-virtuale.service';

@Component({
  selector: '[app-option-popup]',
  templateUrl: './option-popup.component.html',
  styleUrls: ['./option-popup.component.scss']
})
export class OptionPopupComponent implements OnInit {

 options: Option[];

  constructor(
    public shared: SharedDataService,
    ) {}


  ngOnInit(): void {
    this.options = this.shared.getOptions();
  }

  clickOption(option: Option) {
    this.shared.setOption(option);
  }

}
