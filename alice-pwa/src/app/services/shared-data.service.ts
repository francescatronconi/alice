import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
}

export class StoryChapter {

  title?: string;
  audio?: string;
  video?: string;

}