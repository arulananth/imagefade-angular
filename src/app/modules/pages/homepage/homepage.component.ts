import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PreviewImageComponent } from '../preview-image/preview-image.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  selectedImage: string | undefined;
  userRole: any;
  userId:any;

  showButton: boolean = false;
  remainingTime: number = 30;
  showImageOptions: boolean = false;

  showMachine: any;

  todayCount:number=0;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private apiService: ApiService,
    private route: Router
  ) {
    this.userRole = authService.userRole;
    this.userId = authService.userId;
  }

  ngOnInit(): void {
    if(this.userRole){
      this.userMe();
    }
    else if(!this.userRole){
      this.machineId();
    }
    
  }

  machineId(){
    this.apiService.get('/users/user-machine-id').subscribe(
      (response: any) => {
        console.log('merchant-id',response);
        this.startTimer();
        this.showMachine = response.res;
        if(this.showMachine && this.showMachine.todayCount)
        {
          this.todayCount = this.showMachine.todayCount;
        }
        this.showImageOptions = true;
      },
      (err: any) => {
        console.log('err',err);
      }
    );
  }

  userMe(){
    this.apiService.get('/users/me').subscribe(
      (response: any) => {
        console.log('userMe',response);
        this.showMachine = response.res;
        if(this.showMachine && this.showMachine.subscriptionId)
        {
           let expireDate= this.showMachine.subscriptionId.expireDate;
           if(new Date(expireDate) > new Date())
           this.todayCount = 0;
           this.remainingTime=1;
           this.startTimer();
        }
        this.showImageOptions = true;
      },
      (err: any) => {
        console.log('err',err);
      }
    );
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

  handleFileInputChange(event: any) {
    const file = event.target.files[0];
    let files: FileList = event.target.files;
    let filer : File = files[0];
    let formData = new FormData();
    formData.append("file", filer);
    formData.append("user_id",this.userId)
    this.apiService.post("/upload/withPhoto",formData).subscribe((msg:any)=>{
       console.log(msg)
    },(error:any)=>{
      console.log(error)
    })
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const dialogRef = this.dialog.open(PreviewImageComponent, {
        width: '50%',
        data: {data:reader.result}
        
      });
    };
  }

  // handleFileInputChange(event: any) {
  //   const file = event.target.files[0];

  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.onload = () => {
  //     const imageData = reader.result as string;
  //     this.route.navigate(['pages/home/imagePreview', { imageData: imageData }]);
  //   };
  // }

  // handleFileInputChange(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     const formData = new FormData();
  //     formData.append('image', file);
  //     this.apiService.post<any>("/upload/withPhoto", formData).subscribe(
  //       (response:any) => {
  //         const dialogRef = this.dialog.open(PreviewImageComponent, {
  //           width: '40%',
  //           data: response.res.filePath
  //         });
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   };
  // }

  // openUploadDialog(): void {
  //   const dialogRef = this.dialog.open(PreviewImageComponent, {
  //     width: '50%',
  //     data: { selectedImage: this.selectedImage }
  //   });

  //   dialogRef.afterClosed().subscribe((result: any) => { });
  // }


}
