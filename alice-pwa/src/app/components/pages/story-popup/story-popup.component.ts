import { Component, OnInit } from '@angular/core';
import { GamePlayStory } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: '[app-story-popup]',
  templateUrl: './story-popup.component.html',
  styleUrls: ['./story-popup.component.scss']
})
export class StoryPopupComponent implements OnInit {

  constructor(private shared: SharedDataService) { }

  story: GamePlayStory;

  ngOnInit(): void {
    let unpublished = this.shared.play.story
    .filter(story => !story.published);
    this.story = unpublished.length > 0 ? unpublished[0] : null;
  }

  clickOk() {
    this.shared.readNewStory(this.story);
    this.ngOnInit();
  }

}
