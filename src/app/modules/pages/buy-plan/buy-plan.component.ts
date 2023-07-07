import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      address: [this.walletAddress,Validators.required],
      blockchain: ['ethereum',Validators.required],
      transactionId: ['',Validators.required]
    });
  }

  payment() {
    if (this.paymenyForm.invalid) {
      return;
    }
    let network='goerli';
    let price = this.ethPrice;
    if(this.paymenyForm.value.blockchain=="bitcoin")
    {
      network="testnet";
      price = this.btcPrice;
    }
    let paymentForm = this.paymenyForm.value;
    paymentForm.coinPrice = price;
    paymentForm.network = network;
    paymentForm.plan_id = this.priceData._id
    paymentForm.user_id = this.auth.userId;
    paymentForm.title = this.priceData.title;
    paymentForm.description = this.priceData.description;
    paymentForm.price = this.priceData.price;
    paymentForm.fileCount = this.priceData.fileCount;
    paymentForm.status = "0";
    paymentForm.validDays = this.priceData.validDays;
    this.apiService.post('/users/subscription-start',paymentForm).subscribe(
      (response: any) => {
        console.log('response',response);
      },
      (err: any) => {
        console.log('err',err);
        this.toastr.error(err.message.errorMessage);
      }
    );
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.paymenyForm.controls[controlName].hasError(errorName);
  }

}
