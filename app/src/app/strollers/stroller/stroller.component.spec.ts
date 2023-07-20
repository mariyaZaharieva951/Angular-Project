import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrollerComponent } from './stroller.component';

describe('StrollerComponent', () => {
  let component: StrollerComponent;
  let fixture: ComponentFixture<StrollerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrollerComponent]
    });
    fixture = TestBed.createComponent(StrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
