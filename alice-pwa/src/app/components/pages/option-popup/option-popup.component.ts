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
  free: boolean;
  freetext: string;

  constructor(
    public shared: SharedDataService,
    public audio: AudioPlayService,
    private resolver: HrefResolverService,
    ) {}


  ngOnInit(): void {
    this.opt = this.shared.getOptions();
    this.free = this.opt.free;
    this.freetext = this.free? '': null;
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

  clickDone() {
    this.audio.play('action');
    let found = this.opt.options.filter(o => 
      (o.text != undefined && o.text === this.freetext.toLowerCase().trim()) 
      || (o.texts && o.texts.includes(this.freetext.toLowerCase().trim()))
      );
    if (found.length > 0) {
      this.shared.setOption(found[0]);
    } else {
      this.shared.setOption(this.opt.options[0]);
    }
  }

}
