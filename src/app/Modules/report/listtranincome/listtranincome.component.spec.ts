import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtranincomeComponent } from './listtranincome.component';

describe('ListtranincomeComponent', () => {
  let component: ListtranincomeComponent;
  let fixture: ComponentFixture<ListtranincomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListtranincomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListtranincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
