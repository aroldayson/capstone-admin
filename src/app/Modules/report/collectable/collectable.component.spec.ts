import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectableComponent } from './collectable.component';

describe('CollectableComponent', () => {
  let component: CollectableComponent;
  let fixture: ComponentFixture<CollectableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
