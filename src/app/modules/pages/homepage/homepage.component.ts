import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PreviewImageComponent } from '../preview-image/preview-image.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{

  selectedImage: string | undefined;

  constructor(
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {

  }

  openUploadDialog(): void {
    const dialogRef = this.dialog.open(PreviewImageComponent, {
      width: '500px',
      data: { selectedImage: this.selectedImage }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // if (result) {
      //   this.selectedImage = result;
      // }
    });
  }

}
