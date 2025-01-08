import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdetailscustomerComponent } from './viewdetailscustomer.component';

describe('ViewdetailscustomerComponent', () => {
  let component: ViewdetailscustomerComponent;
  let fixture: ComponentFixture<ViewdetailscustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewdetailscustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewdetailscustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
