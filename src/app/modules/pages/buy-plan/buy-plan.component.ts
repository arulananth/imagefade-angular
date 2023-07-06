import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-buy-plan',
  templateUrl: './buy-plan.component.html',
  styleUrls: ['./buy-plan.component.css']
})
export class BuyPlanComponent implements OnInit {

  paymenyForm: FormGroup | any;
  priceData: any;
  btcPrice:number=0;
  ethPrice:number=0;
  walletAddress:string=''
  constructor(
    @Inject(MAT_DIALOG_DATA) public modeldata: any,
    private dialogRef: MatDialogRef<
    BuyPlanComponent,{ response?: true | false } >,
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: Router,
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private http:HttpClient
  ) {
    let data=modeldata.price;
    this.priceData = data;
    this.walletAddress= environment.walletAddress;
     this.http.request('GET', 'https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH', {responseType:'json'}).subscribe((msg:any)=>{
        if(msg && msg.BTC)
        {
          this.btcPrice =  parseFloat(msg.BTC)*parseFloat(this.priceData.price)
        }
        if(msg && msg.ETH)
        {
          this.ethPrice =  parseFloat(msg.ETH)*parseFloat(this.priceData.price)
        }
     })
  }

  ngOnInit(): void {
    this.paymenyForm = this.formBuilder.group({
      address: [this.walletAddress],
      link: ['']
    });
  }

  payment() {
    this.paymenyForm.addControl('plan_id', new FormControl(this.priceData._id));
    this.paymenyForm.addControl('user_id', new FormControl(this.auth.userId));
    this.apiService.post('/users/subscription-start',this.paymenyForm.value).subscribe(
      (response: any) => {
        console.log('response',response);
      },
      (err: any) => {
        console.log('err',err);
        this.toastr.error(err.message.errorMessage);
      }
    );
  }

}
