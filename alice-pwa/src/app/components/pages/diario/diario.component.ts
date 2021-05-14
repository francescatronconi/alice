import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.scss']
})
export class DiarioComponent implements OnInit {
  listaTappeId: String[]=[]
  locationsVisitate: String[]=[]
  constructor(
    private shared: SharedDataService) 
  {}

  ngOnInit(): void {
    this.listaTappeId = JSON.parse(localStorage.getItem("tappe"))
    this.shared.locations.map(location => {
      if(this.listaTappeId.includes(location.id)) {
        this.locationsVisitate.push(location.name)
      }
    })
  }

}
