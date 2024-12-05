import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseshistoryComponent } from './expenseshistory.component';

describe('ExpenseshistoryComponent', () => {
  let component: ExpenseshistoryComponent;
  let fixture: ComponentFixture<ExpenseshistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseshistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
