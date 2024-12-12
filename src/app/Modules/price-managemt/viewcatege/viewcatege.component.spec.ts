import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcategeComponent } from './viewcatege.component';

describe('ViewcategeComponent', () => {
  let component: ViewcategeComponent;
  let fixture: ComponentFixture<ViewcategeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewcategeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcategeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
