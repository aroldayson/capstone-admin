import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofCustomerComponent } from './editprof-customer.component';

describe('EditprofCustomerComponent', () => {
  let component: EditprofCustomerComponent;
  let fixture: ComponentFixture<EditprofCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditprofCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditprofCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
