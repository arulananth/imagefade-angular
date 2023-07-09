import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPaymentComponent } from './alert-payment.component';

describe('AlertPaymentComponent', () => {
  let component: AlertPaymentComponent;
  let fixture: ComponentFixture<AlertPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertPaymentComponent]
    });
    fixture = TestBed.createComponent(AlertPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
