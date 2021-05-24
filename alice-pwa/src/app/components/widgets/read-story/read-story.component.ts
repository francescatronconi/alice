import { Component, Input, OnInit } from '@angular/core';
import { GamePlayStory } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: '[app-read-story]',
  templateUrl: './read-story.component.html',
  styleUrls: ['./read-story.component.scss']
})
export class ReadStoryComponent implements OnInit {

  @Input() story: GamePlayStory;

  html: string;

  constructor(private shared: SharedDataService) { }

  ngOnInit(): void {
    this.shared.getHtmlResource(this.story.origin.read).then(html => {
      this.html = html;
    });
  }

}
