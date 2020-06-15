import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTodaySalesComponent } from './dialog-today-sales.component';

describe('DialogTodaySalesComponent', () => {
  let component: DialogTodaySalesComponent;
  let fixture: ComponentFixture<DialogTodaySalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogTodaySalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTodaySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
