import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UsersComponent } from './users/users.component';
import { TransactionComponent } from './transaction/transaction.component';
import { HistoryComponent } from './history/history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PricingComponent } from './pricing/pricing.component';
import { AdminGuard } from 'src/app/shared/guard/admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    // canActivate: [AdminGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' }
      },
      {
        path: 'price',
        component: PricingComponent,
        data: { title: 'Price' }
      },
      {
        path: 'transaction',
        component: TransactionComponent,
        data: { title: 'Transaction' }
      },
      {
        path: 'history',
        component: HistoryComponent,
        data: { title: 'History' }
      },
      {
        path: 'users',
        component: UsersComponent,
        data: { title: 'User' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
