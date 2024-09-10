import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacPaidComponent } from './transac-paid.component';

describe('TransacPaidComponent', () => {
  let component: TransacPaidComponent;
  let fixture: ComponentFixture<TransacPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransacPaidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransacPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
