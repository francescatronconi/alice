import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceChallengeComponent } from './face-challenge.component';

describe('FaceChallengeComponent', () => {
  let component: FaceChallengeComponent;
  let fixture: ComponentFixture<FaceChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
