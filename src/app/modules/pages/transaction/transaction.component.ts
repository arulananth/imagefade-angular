import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { VerifyTransactionComponent } from '../alert/verify-transaction/verify-transaction.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  panelOpenState = false;
  tableList: any;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: Router,
    public dialog: MatDialog,
    public userAuth: AuthService
  ) {

  }

  ngOnInit(): void {
    this.getTable();
  }

  getTable(){
    this.apiService.post('/users/subscription-list',{}).subscribe(
      (response: any) => {
        console.log('user-transaction',response);
        this.tableList = response.res;
      },
      (err: any) => {
        console.log('err',err);
      }
    );
  }
  showCoinSys(cointype:string)
  {
     let coin="ETH";
     if(cointype=="bitcoin")
     coin="BTC";
     return coin;
  }
  showDate(item:any)
  {
    if(item.expireDate) 
     return item.expireDate;
     else 
     return item.createdAt
  }
  Transaction(item:any){
    const dialogRef = this.dialog.open(VerifyTransactionComponent, {
      width: '35%',
      data: { data: item }
    });

    dialogRef.afterClosed().subscribe((result: any) => { });
  }

}
