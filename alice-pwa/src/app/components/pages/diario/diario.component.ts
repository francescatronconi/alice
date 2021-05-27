import { Component, OnInit } from '@angular/core';
import { GamePlayStory } from 'src/app/services/ponte-virtuale.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.scss']
})
export class DiarioComponent implements OnInit {
  listaTappeId: String[]=[]
  locationsVisitate: String[]=[]
  storySoFar: GamePlayStory[];
  storyToRead: GamePlayStory[];
  constructor(
    public shared: SharedDataService) 
  {}

  ngOnInit(): void {
    this.initListaTappeId();
    if (this.shared.play) {
      this.initStorySoFar();
    }
  }

  initStorySoFar() {
    this.storySoFar = this.shared.play.story.filter(item => item.published);
    this.storyToRead = this.shared.play.story.filter(item => !item.published);
  }

  initListaTappeId() {
    this.listaTappeId = JSON.parse(localStorage.getItem("tappe"))
    if (this.listaTappeId !== null) {
      this.shared.locations.map(location => {
        if(this.listaTappeId.includes(location.id)) {
          this.locationsVisitate.push(location.name)
        }
      })
    }
  }

}
