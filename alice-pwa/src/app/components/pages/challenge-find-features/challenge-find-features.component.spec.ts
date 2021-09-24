import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeFindFeaturesComponent } from './challenge-find-features.component';

describe('ChallengeFindFeaturesComponent', () => {
  let component: ChallengeFindFeaturesComponent;
  let fixture: ComponentFixture<ChallengeFindFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeFindFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeFindFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
