import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHisRemitComponent } from './view-his-remit.component';

describe('ViewHisRemitComponent', () => {
  let component: ViewHisRemitComponent;
  let fixture: ComponentFixture<ViewHisRemitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHisRemitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHisRemitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
