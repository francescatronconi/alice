import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShineComponent } from './shine.component';

describe('ShineComponent', () => {
  let component: ShineComponent;
  let fixture: ComponentFixture<ShineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
