import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.css']
})
export class PricingPlanComponent implements OnInit {

  priceList: any = [];

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: Router
  ) {

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
        this.toastr.error(err.message.errorMessage);
      }
    );
  }

  buyPlan(price: any){
    this.route.navigate(['pages/pricing/' + price._id]);
  }

}
