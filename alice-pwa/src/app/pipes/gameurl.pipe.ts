import { Pipe, PipeTransform } from '@angular/core';
import { SharedDataService } from '../services/shared-data.service';

@Pipe({
  name: 'gameurl'
})
export class GameurlPipe implements PipeTransform {

  constructor(private shared: SharedDataService) {
  }

  transform(url: string): unknown {
    return this.shared.getGameResourceUrl(url);
  }

}
