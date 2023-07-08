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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dashboardList: any;
  tableList: any;

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: Router,
    public dialog: MatDialog,
    public userAuth: AuthService
  ) {
    // Replace this with your actual temporary data
    const temporaryData = [
      { id: '1', progress: '80', name: 'gdf',fruit: 'dfh'},
      { id: '2', progress: '80', name: 'gdf',fruit: 'fghfh'},
      { id: '3', progress: '40', name: 'gdf',fruit: 'dfh'},
      { id: '4', progress: '70', name: 'gdf',fruit: 'fghdfh'},
      { id: '5', progress: '40', name: 'gdf',fruit: 'dfh'},
      { id: '6', progress: '70', name: 'gdf',fruit: 'fghdfh'},
      // ...
    ];

    this.dataSource = new MatTableDataSource(temporaryData.slice(0, 5));

  }

  ngOnInit(): void {
    this.getPrice();
    this.getDashboard();
  }

  getPrice(){
    this.apiService.get('/admin/dashboard').subscribe(
      (response: any) => {
        console.log('response',response);
        this.dashboardList = response.res;
      },
      (err: any) => {
        console.log('err',err);
      }
    );
  }
  getDashboard(){
    this.apiService.get('/admin/getAllUsers').subscribe(
      (response: any) => {
        console.log('tableList',response);
        this.tableList = response.res;
      },
      (err: any) => {
        console.log('err',err);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
