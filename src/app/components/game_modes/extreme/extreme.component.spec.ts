import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtremeComponent } from './extreme.component';

describe('ExtremeComponent', () => {
  let component: ExtremeComponent;
  let fixture: ComponentFixture<ExtremeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtremeComponent]
    });
    fixture = TestBed.createComponent(ExtremeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
