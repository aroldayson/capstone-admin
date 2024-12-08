import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListoftransactionComponent } from './listoftransaction.component';

describe('ListoftransactionComponent', () => {
  let component: ListoftransactionComponent;
  let fixture: ComponentFixture<ListoftransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListoftransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListoftransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
