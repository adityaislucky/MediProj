import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSalesGraphComponent } from './dialog-sales-graph.component';

describe('DialogSalesGraphComponent', () => {
  let component: DialogSalesGraphComponent;
  let fixture: ComponentFixture<DialogSalesGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSalesGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSalesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
