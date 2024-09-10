import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistorytransacComponent } from './view-historytransac.component';

describe('ViewHistorytransacComponent', () => {
  let component: ViewHistorytransacComponent;
  let fixture: ComponentFixture<ViewHistorytransacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHistorytransacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHistorytransacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
