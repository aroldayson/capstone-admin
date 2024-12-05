import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtranexpenseComponent } from './listtranexpense.component';

describe('ListtranexpenseComponent', () => {
  let component: ListtranexpenseComponent;
  let fixture: ComponentFixture<ListtranexpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListtranexpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListtranexpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
