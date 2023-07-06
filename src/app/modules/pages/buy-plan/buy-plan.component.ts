import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-buy-plan',
  templateUrl: './buy-plan.component.html',
  styleUrls: ['./buy-plan.component.css']
})
export class BuyPlanComponent implements OnInit {

  paymenyForm: FormGroup | any;
  priceData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public modeldata: any,
    private dialogRef: MatDialogRef<
    BuyPlanComponent,{ response?: true | false } >,
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: Router,
    public formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    let data=modeldata.price;
    console.log('data--',data);
    this.priceData = data;
  }

  ngOnInit(): void {
    this.paymenyForm = this.formBuilder.group({
      address: [''],
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
