import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectTriggerComponent } from './direct-trigger.component';

describe('DirectTriggerComponent', () => {
  let component: DirectTriggerComponent;
  let fixture: ComponentFixture<DirectTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
