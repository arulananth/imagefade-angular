import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PricingPlanComponent } from './pricing-plan/pricing-plan.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';
import { BuyPlanComponent } from './buy-plan/buy-plan.component';
import { BuyPlanResolver } from '../../shared/services/buyplan.resolver';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {
    path: 'pages',
    children: [
    {
      path: 'home',
      component: HomepageComponent,
      data: { title: 'Home Page' }
    },
    {
      path: 'pricing',
      component: PricingPlanComponent,
      data: { title: 'Pricing Plan' }
    },
    {
      path: 'pricing/:id',
      component: BuyPlanComponent,
      resolve: { message : BuyPlanResolver },
      data: { title: 'Buy Plan' }
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
    },
    {
      path: 'transaction',
      component: TransactionComponent,
      data: { title: 'Transaction' }
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
