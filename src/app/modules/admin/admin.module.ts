import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { UsersComponent } from './users/users.component';
import { TransactionComponent } from './transaction/transaction.component';
import { HistoryComponent } from './history/history.component';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    TransactionComponent,
    HistoryComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    AdminRoutingModule
  ],
  providers: [],
})
export class AdminModule {}
