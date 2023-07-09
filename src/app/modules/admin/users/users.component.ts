import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddUsersComponent } from './add-users/add-users.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'email', 'role', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userList: any;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: Router,
    public userAuth: AuthService
  ){ }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.apiService.get('/admin/getAllUsers').subscribe(
      (response: any) => {
        console.log('User',response);
        this.userList = response.res;
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err: any) => {
        console.log('err',err);
      }
    );
  }

  blockUser(row: any){
    this.apiService.post('/admin/user-unblock-block',{
      user_id: row._id
    }).subscribe(
      (response: any) => {
        console.log('block',response);
        this.toastr.success(response.res.message)
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
