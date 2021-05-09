import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TellStoryComponent } from './tell-story.component';

describe('TellStoryComponent', () => {
  let component: TellStoryComponent;
  let fixture: ComponentFixture<TellStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TellStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TellStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
