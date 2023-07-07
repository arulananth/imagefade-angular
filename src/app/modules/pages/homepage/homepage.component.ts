import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PreviewImageComponent } from '../preview-image/preview-image.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  selectedImage: string | undefined;
  userRole: any;

  showButton: boolean = false;
  remainingTime: number = 30;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    this.userRole = authService.userRole
  }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    const timer = setInterval(() => {
      this.remainingTime--;

      if (this.remainingTime <= 0) {
        clearInterval(timer);
        this.showButton = true;
      }
    }, 1000);
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
