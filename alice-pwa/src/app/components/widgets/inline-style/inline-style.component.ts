import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inline-style',
  templateUrl: './inline-style.component.html',
  styleUrls: ['./inline-style.component.scss']
})
export class InlineStyleComponent implements OnInit {

  constructor(private shared: SharedDataService) { }
  style: string;
  scss: string;

  ngOnInit(): void {
    this.shared.getHtmlResource('game.css').then(scss => {
      console.log(scss);
      this.scss = scss;
      while (this.scss.includes("url('~/")) {
        this.scss = this.scss.replace(/url\('~\/(.*)'\)/, `url('${environment.gameUrl}/$1')`);
      }
      this.style = `<style>${this.scss}</style>`;
    });
  }

  srcUrl() {
    return `${environment.gameUrl}/style.scss`;
  }

}
