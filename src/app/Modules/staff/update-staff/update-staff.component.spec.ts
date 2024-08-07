import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStaffComponent } from './update-staff.component';

describe('UpdateStaffComponent', () => {
  let component: UpdateStaffComponent;
  let fixture: ComponentFixture<UpdateStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
