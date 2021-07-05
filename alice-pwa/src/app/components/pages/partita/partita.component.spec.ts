import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartitaComponent } from './partita.component';

describe('PartitaComponent', () => {
  let component: PartitaComponent;
  let fixture: ComponentFixture<PartitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
