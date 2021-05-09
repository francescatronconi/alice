import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoryChapter } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-tell-story',
  templateUrl: './tell-story.component.html',
  styleUrls: ['./tell-story.component.scss']
})
export class TellStoryComponent implements OnInit {

  chapter: StoryChapter;
  key: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.key = params.key;
      this.chapter = {title: 'The chapter title', audio: 'https://www.dantar.it/resources/agora/resources/merry.mp3'};
    });

  }

}
