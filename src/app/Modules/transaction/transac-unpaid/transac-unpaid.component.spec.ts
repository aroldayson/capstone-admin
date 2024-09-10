import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacUnpaidComponent } from './transac-unpaid.component';

describe('TransacUnpaidComponent', () => {
  let component: TransacUnpaidComponent;
  let fixture: ComponentFixture<TransacUnpaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransacUnpaidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransacUnpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
