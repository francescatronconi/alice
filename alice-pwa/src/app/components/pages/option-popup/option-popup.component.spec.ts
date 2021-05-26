import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionPopupComponent } from './option-popup.component';

describe('OptionPopupComponent', () => {
  let component: OptionPopupComponent;
  let fixture: ComponentFixture<OptionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
