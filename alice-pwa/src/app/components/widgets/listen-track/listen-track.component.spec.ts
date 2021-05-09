import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListenTrackComponent } from './listen-track.component';

describe('ListenTrackComponent', () => {
  let component: ListenTrackComponent;
  let fixture: ComponentFixture<ListenTrackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListenTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
