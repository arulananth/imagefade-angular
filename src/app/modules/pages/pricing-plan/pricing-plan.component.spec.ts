import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPlanComponent } from './pricing-plan.component';

describe('PricingPlanComponent', () => {
  let component: PricingPlanComponent;
  let fixture: ComponentFixture<PricingPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PricingPlanComponent]
    });
    fixture = TestBed.createComponent(PricingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
