import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsOverlayComponent } from './buttons-overlay.component';

describe('ButtonsOverlayComponent', () => {
  let component: ButtonsOverlayComponent;
  let fixture: ComponentFixture<ButtonsOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonsOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
