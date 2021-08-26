import { Component, Input, OnInit } from '@angular/core';
import { GamePlayStory } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: '[app-read-story]',
  templateUrl: './read-story.component.html',
  styleUrls: ['./read-story.component.scss']
})
export class ReadStoryComponent implements OnInit {

  @Input() story: GamePlayStory;

  html: string;
  video: string;

  constructor(private shared: SharedDataService) { }

  ngOnInit(): void {
    if (this.story.origin.video) {
      this.video = `${environment.gameUrl}/${this.story.origin.video}`;
    }
    if (this.story.origin.read) {
      this.shared.getHtmlResource(this.story.origin.read).then(html => {
        let nexthtml = html;
        let maxreplace = 100;
        while (this.html != nexthtml && maxreplace > 0) {
          this.html = nexthtml;
          nexthtml = this.html.replace(/src="~\/(.*)"/g, `src="${environment.gameUrl}/$1"`);
          maxreplace = maxreplace -1;
        }
      });
    }
  }

}
