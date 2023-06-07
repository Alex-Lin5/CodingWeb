import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodesGetComponent } from './codes-get.component';

describe('CodesGetComponent', () => {
  let component: CodesGetComponent;
  let fixture: ComponentFixture<CodesGetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodesGetComponent]
    });
    fixture = TestBed.createComponent(CodesGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
