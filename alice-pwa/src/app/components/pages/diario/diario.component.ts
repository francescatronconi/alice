import { Component, OnInit } from '@angular/core';
import { GamePlayStory } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.scss']
})
export class DiarioComponent implements OnInit {
  storySoFar: GamePlayStory[];
  storyToRead: GamePlayStory[];
  constructor(
    public shared: SharedDataService) 
  {}

  ngOnInit(): void {
  }

  initStorySoFar() {
    this.storySoFar = this.shared.play.story.filter(item => item.published);
    this.storyToRead = this.shared.play.story.filter(item => !item.published);
  }

}
