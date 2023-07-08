import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BuyPlanComponent } from '../buy-plan/buy-plan.component';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.css']
})
export class PricingPlanComponent implements OnInit {

  priceList: any = [];
  userId:string;
  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: Router,
    public dialog: MatDialog,
    public userAuth: AuthService
  ) {
     this.userId = this.userAuth.userId;
  }

  ngOnInit(): void {
    this.getPrice();
  }

  getPrice(){
    this.apiService.get('/pricing').subscribe(
      (response: any) => {
        console.log('response',response);
        this.priceList = response.res;
      },
      (err: any) => {
        console.log('err',err);
      }
    );
  }

  buyPlanDialog(price: any){
    // this.route.navigate(['pages/pricing/' + price._id]);
    this.dialog.open(BuyPlanComponent, {
      width: '40%',
      data: { price: price }
    });
  }
  openTransaction(){
    this.route.navigate(['pages/transaction']);
  }

}
