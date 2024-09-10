import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRemitComponent } from './view-remit.component';

describe('ViewRemitComponent', () => {
  let component: ViewRemitComponent;
  let fixture: ComponentFixture<ViewRemitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRemitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRemitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
