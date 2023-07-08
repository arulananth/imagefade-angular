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

  Transaction(){

  }

}
