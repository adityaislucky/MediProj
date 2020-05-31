import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTestManagementComponent } from './dialog-test-management.component';

describe('DialogTestManagementComponent', () => {
  let component: DialogTestManagementComponent;
  let fixture: ComponentFixture<DialogTestManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTestManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
