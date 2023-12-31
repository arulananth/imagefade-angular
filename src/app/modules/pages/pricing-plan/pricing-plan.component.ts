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
  userRole: any;
  currentPlan:boolean=false;
  subscriptionPlan:any='';
  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: Router,
    public dialog: MatDialog,
    public userAuth: AuthService
  ) {
      this.userId = this.userAuth.userId;
      this.userRole = this.userAuth.userRole;
  }

  ngOnInit(): void {
    
    if(this.userId)
    {
    this.apiService.get('/users/me').subscribe(
      (response: any) => {
       let showMachine = response.res;
       this.getPrice();
        if(showMachine && showMachine.subscriptionId)
        {
           let expireDate= showMachine.subscriptionId.expireDate;
           if(new Date(expireDate) > new Date())
           {
              this.currentPlan=true;
              this.subscriptionPlan =  showMachine.membershipId._id;
           }
        }
        
      },
      (err: any) => {
        console.log('err',err);
      }
    );
    }
    else 
    {
      this.getPrice();
    }
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

  getMerchant(){
    this.apiService.get('/users/user-machine-id').subscribe(
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
    if(this.userRole)
    {
    // this.route.navigate(['pages/pricing/' + price._id]);
   
    this.dialog.open(BuyPlanComponent, {
      width: '40%',
      data: { price: price }
    });
    }
    else 
    {
      this.route.navigate(["auth/login"])
    }
  }
  openTransaction(){
    this.route.navigate(['pages/transaction']);
  }

}
