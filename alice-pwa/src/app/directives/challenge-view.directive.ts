import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appChallengeView]'
})
export class ChallengeViewDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
