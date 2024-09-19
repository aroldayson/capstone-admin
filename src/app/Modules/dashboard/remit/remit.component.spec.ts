import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitComponent } from './remit.component';

describe('RemitComponent', () => {
  let component: RemitComponent;
  let fixture: ComponentFixture<RemitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
