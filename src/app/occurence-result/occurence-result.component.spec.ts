import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccurenceResultComponent } from './occurence-result.component';

describe('OccurenceResultComponent', () => {
  let component: OccurenceResultComponent;
  let fixture: ComponentFixture<OccurenceResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccurenceResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccurenceResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
