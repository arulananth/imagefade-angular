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

  }

  startverification(){
    this.apiService.post('/users/subscription-start', {}).subscribe(
      (response: any) => {
        console.log('verified',response);
        this.toastr.success('Transaction verified successfully... ');
        this.matDialogRef.close(response);
      },
      (err: any) => {
        console.log('err',err);
        this.toastr.error('Something went wrong... ');
      }
    );
  }

}
