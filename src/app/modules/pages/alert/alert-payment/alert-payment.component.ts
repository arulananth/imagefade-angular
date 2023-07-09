import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-payment',
  templateUrl: './alert-payment.component.html',
  styleUrls: ['./alert-payment.component.css']
})
export class AlertPaymentComponent implements OnInit {

  alertMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public modeldata: any,
    private dialogRef: MatDialogRef<
    AlertPaymentComponent,{ response?: true | false } >,
  ) {
    this.alertMessage = modeldata.data;
  }

  ngOnInit(): void {

  }

}
