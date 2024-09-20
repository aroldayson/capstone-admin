import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashdetailsComponent } from './cashdetails.component';

describe('CashdetailsComponent', () => {
  let component: CashdetailsComponent;
  let fixture: ComponentFixture<CashdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
