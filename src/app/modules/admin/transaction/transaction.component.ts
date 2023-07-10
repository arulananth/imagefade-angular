import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{

  displayedColumns: string[] = ['Title', 'Network', 'Block Chain', 'Coin Price', 'Price', 'Description', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tableList: any;
  disabled: boolean = true;
  subVerify: any;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: Router,
    public dialog: MatDialog,
    public userAuth: AuthService
  ){ }

  ngOnInit(): void {
    this.getTable();
  }

  getTable(){
    this.apiService.post('/admin/subscription-list',{}).subscribe(
      (response: any) => {
        console.log('transaction',response);
        this.tableList = response.res;
        this.dataSource = new MatTableDataSource(this.tableList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err: any) => {
        console.log('err',err);
      }
    );
  }

  checkTransaction(row: any){
    let formData=row;
    formData.user_id = row.user_id._id;
    formData.plan_id = row.plan_id._id;
    this.apiService.post('/admin/subscription-verify',formData).subscribe(
      (response: any) => {
       
        this.subVerify = response.res;
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
      },
      (err: any) => {
        console.log('err',err);
      }
    );
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
