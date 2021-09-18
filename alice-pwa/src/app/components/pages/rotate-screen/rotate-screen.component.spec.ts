import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotateScreenComponent } from './rotate-screen.component';

describe('RotateScreenComponent', () => {
  let component: RotateScreenComponent;
  let fixture: ComponentFixture<RotateScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotateScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotateScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
