import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-verify-transaction',
  templateUrl: './verify-transaction.component.html',
  styleUrls: ['./verify-transaction.component.css']
})
export class VerifyTransactionComponent implements OnInit {

  verifyMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public modeldata: any,
    private dialogRef: MatDialogRef<
    VerifyTransactionComponent,{ response?: true | false } >,
    private apiService: ApiService,
    private toastr: ToastrService,
    public matDialogRef: MatDialogRef<any>,
  ) {
    this.verifyMessage = modeldata.data;
  }

  ngOnInit(): void {
   this.startverification()
  }

  startverification(){
    let formData:any= this.modeldata.data;
    formData.user_id= formData.user_id._id;
    formData.plan_id = formData.plan_id._id;
    this.apiService.post('/users/subscription-check', formData).subscribe(
      (response: any) => {
        if(response && response.res && response.res.paymentRequest)
        {
          let paymentRequest= response.res.paymentRequest;
          if(paymentRequest.status=="1" && paymentRequest.newDate!=null)
          {
            this.toastr.success('Transaction verified successfully!');
          }
          else 
          {
            this.toastr.error('Transaction is cancelled!');
          }
        }
       
        this.matDialogRef.close(response);
      },
      (err: any) => {
        console.log('err',err);
        this.toastr.error('Something went wrong... ');
      }
    );
  }

}
