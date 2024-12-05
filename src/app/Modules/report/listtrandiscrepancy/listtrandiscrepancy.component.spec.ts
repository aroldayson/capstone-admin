import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtrandiscrepancyComponent } from './listtrandiscrepancy.component';

describe('ListtrandiscrepancyComponent', () => {
  let component: ListtrandiscrepancyComponent;
  let fixture: ComponentFixture<ListtrandiscrepancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListtrandiscrepancyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListtrandiscrepancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
