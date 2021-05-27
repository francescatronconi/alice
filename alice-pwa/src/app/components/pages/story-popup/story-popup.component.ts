import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { GamePlayStory } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: '[app-story-popup]',
  templateUrl: './story-popup.component.html',
  styleUrls: ['./story-popup.component.scss']
})
export class StoryPopupComponent implements OnInit {

  storyA: GamePlayStory;
  storyB: GamePlayStory;

  constructor(
    private shared: SharedDataService,
    ) { }

  ngOnInit(): void {
    this.storyA = this.shared.currentStory;
    this.storyB = null;
  }

  clickOk() {
    this.shared.readCurrentStory();
    if (this.storyA) {
      this.storyB = this.shared.currentStory;
      this.storyA = null
    } else {
      this.storyA = this.shared.currentStory;
      this.storyB = null
    }
  }

}
