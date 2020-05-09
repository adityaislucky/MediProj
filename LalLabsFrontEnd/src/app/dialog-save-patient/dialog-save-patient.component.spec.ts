import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSavePatientComponent } from './dialog-save-patient.component';

describe('DialogSavePatientComponent', () => {
  let component: DialogSavePatientComponent;
  let fixture: ComponentFixture<DialogSavePatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSavePatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSavePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
