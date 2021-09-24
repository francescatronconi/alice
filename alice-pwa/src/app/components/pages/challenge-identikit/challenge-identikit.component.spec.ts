import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeIdentikitComponent } from './challenge-identikit.component';

describe('ChallengeIdentikitComponent', () => {
  let component: ChallengeIdentikitComponent;
  let fixture: ComponentFixture<ChallengeIdentikitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeIdentikitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeIdentikitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
