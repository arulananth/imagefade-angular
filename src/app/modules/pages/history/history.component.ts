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
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  tableList: any;
  userRole: any;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: Router,
    public dialog: MatDialog,
    public userAuth: AuthService
  ) {
    this.userRole = this.userAuth.userRole;
  }

  ngOnInit(): void {
    if(this.userRole){
      this.getHistory();
    }
    else if(!this.userRole){
      this.getMerchant();
    }
  }

  getMerchant(){
    this.apiService.get('/users/user-machine-history').subscribe(
      (response: any) => {
        console.log('merchant-history',response);
        this.tableList = response.res;
      },
      (err: any) => {
        console.log('err',err);
      }
    );
  }

  getHistory(){
    this.apiService.post('/users/history-list',{}).subscribe(
      (response: any) => {
        console.log('user-history',response);
        this.tableList = response.res;
      },
      (err: any) => {
        console.log('err',err);
      }
    );
  }

}
