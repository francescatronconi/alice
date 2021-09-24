import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeMapComponent } from './badge-map.component';

describe('BadgeMapComponent', () => {
  let component: BadgeMapComponent;
  let fixture: ComponentFixture<BadgeMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
