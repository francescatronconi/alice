import { Component, OnInit, Input } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { GameOption, Option } from 'src/app/services/ponte-virtuale.service';
import { AudioPlayService } from 'src/app/services/audio-play.service';
import { HrefResolverService } from 'src/app/services/href-resolver.service';

@Component({
  selector: '[app-option-popup]',
  templateUrl: './option-popup.component.html',
  styleUrls: ['./option-popup.component.scss']
})
export class OptionPopupComponent implements OnInit {

  opt: GameOption;
  read: string;

  constructor(
    public shared: SharedDataService,
    public audio: AudioPlayService,
    private resolver: HrefResolverService,
    ) {}


  ngOnInit(): void {
    this.opt = this.shared.getOptions();
    if (this.opt.read) {
      this.shared.getHtmlResource(this.opt.read).then(html => {
        this.read = this.resolver.digest(html)
      });
    }
  }

  clickOption(option: Option) {
    this.audio.play('action');
    this.shared.setOption(option);
  }

}
