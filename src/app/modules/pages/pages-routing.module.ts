import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PricingPlanComponent } from './pricing-plan/pricing-plan.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: 'pages',
    children: [
    {
      path: 'home',
      component: HomepageComponent,
      data: { title: 'HpmePage' }
    },
    {
      path: 'pricing',
      component: PricingPlanComponent,
      data: { title: 'Pricing Plan' }
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
