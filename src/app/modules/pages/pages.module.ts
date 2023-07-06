import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PricingPlanComponent } from './pricing-plan/pricing-plan.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';
import { BuyPlanComponent } from './buy-plan/buy-plan.component';
import { PreviewImageComponent } from './preview-image/preview-image.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PricingPlanComponent,
    HomepageComponent,
    HistoryComponent,
    ProfileComponent,
    BuyPlanComponent,
    PreviewImageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PagesRoutingModule,
    MaterialModule
  ],
  providers: [],
})
export class PagesModule {}
