import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubtsComponent } from './doubts.component';

describe('DoubtsComponent', () => {
  let component: DoubtsComponent;
  let fixture: ComponentFixture<DoubtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoubtsComponent]
    });
    fixture = TestBed.createComponent(DoubtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
