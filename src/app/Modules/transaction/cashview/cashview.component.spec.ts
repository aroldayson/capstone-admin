import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashviewComponent } from './cashview.component';

describe('CashviewComponent', () => {
  let component: CashviewComponent;
  let fixture: ComponentFixture<CashviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
