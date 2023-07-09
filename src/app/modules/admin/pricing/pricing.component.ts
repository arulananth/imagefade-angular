import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AddPricingComponent } from './add-pricing/add-pricing.component';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  displayedColumns: string[] = ['title', 'fileCount', 'validDays', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tableList: any;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private toastr: ToastrService,
    private route: Router,
    public userAuth: AuthService
  ){ }

  ngOnInit(): void {
    this.getTable();
  }

  getTable(){
    this.apiService.get('/pricing').subscribe(
      (response: any) => {
        console.log('pricing',response);
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

  addPrice(){
    const dialogRef = this.dialog.open(AddPricingComponent, {
      width: '50%',
      data: { }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('dialogRef',result);
      this.getTable();
      if (result && result.res) {
        let results = result.res;
        this.tableList = results;
      }
    });
  }

  editPrice(row: any){
    console.log('row',row);
    const dialogRef = this.dialog.open(AddPricingComponent, {
      width: '50%',
      data: { data: row }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('dialogRef',result);
      this.getTable();
      if (result && result.res) {
        let results = result.res;
        this.tableList = results;
      }
    });
  }

  deletePrice(row: any){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.apiService.delete('/pricing/'+row._id).subscribe(
        (response: any) => {
          console.log('pricing save',response);
          this.toastr.success('pricing delete successfully... ');
          this.getTable();
        },
        (err: any) => {
          console.log('err',err);
          this.toastr.error('Something went wrong... ');
        }
      );
    }

  }

}
