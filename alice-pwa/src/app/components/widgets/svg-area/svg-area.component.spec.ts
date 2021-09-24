import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgAreaComponent } from './svg-area.component';

describe('SvgAreaComponent', () => {
  let component: SvgAreaComponent;
  let fixture: ComponentFixture<SvgAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
