import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PricingPlanComponent } from './pricing-plan/pricing-plan.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';

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
    },
    {
      path: 'history',
      component: HistoryComponent,
      data: { title: 'History' }
    },
    {
      path: 'profile',
      component: ProfileComponent,
      data: { title: 'Profile' }
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
