import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HrefResolverService {
  
  constructor() { }

  digest(hypertext: string) {
    let html = hypertext;
    let maxreplace = 100;
    while (html.includes('src="~/') && maxreplace > 0) {
      html = html.replace(/src="~\/(.*)"/g, `src="${environment.gameUrl}/$1"`);
      maxreplace = maxreplace -1;
    }
    return html;
  }

}
