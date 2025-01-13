import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewhistorytransactionComponent } from './viewhistorytransaction.component';

describe('ViewhistorytransactionComponent', () => {
  let component: ViewhistorytransactionComponent;
  let fixture: ComponentFixture<ViewhistorytransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewhistorytransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewhistorytransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
