import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

  constructor() {
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
