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
    this.apiService.post('/admin/subscription-verify',{row}).subscribe(
      (response: any) => {
        console.log('transaction',response);
        this.subVerify = response.res;
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
