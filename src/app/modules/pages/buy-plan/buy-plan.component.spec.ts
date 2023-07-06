import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPlanComponent } from './buy-plan.component';

describe('BuyPlanComponent', () => {
  let component: BuyPlanComponent;
  let fixture: ComponentFixture<BuyPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyPlanComponent]
    });
    fixture = TestBed.createComponent(BuyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
