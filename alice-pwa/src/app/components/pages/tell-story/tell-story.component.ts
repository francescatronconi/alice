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
  chapters: {[key:string]: StoryChapter};

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.chapters = {
      video: {title: 'Daniele e il naso', video: 'https://www.dantar.it/resources/agora/resources/daniele-tarini.mp4'},
      audio: {title: 'Pentatonix God bless you merry gentlemen', audio: 'https://www.dantar.it/resources/agora/resources/merry.mp3'},
    };
    this.route.params.subscribe(params => {
      this.key = params.key;
      this.chapter = this.chapters[this.key];
    });
  }

}
