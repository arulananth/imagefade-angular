import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.css']
})
export class PreviewImageComponent implements OnInit {

  uploadedImage: File | undefined;
  fileToUpload: any;
  imageUrl: any;

  zoom: number = 1;
  // showLoader: boolean = false;
  showImage: boolean = false;
  remainingTime: number = 3;


  showLoader: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<PreviewImageComponent,{ response?: true | false }>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public httpReq:HttpClient
  ) {}

  ngOnInit(): void {
    this.startTimer();
    let image64:string= this.data.split(',')[1];
    this.httpReq.post("http://localhost:5000/deepnude",{image:image64}).subscribe((response:any)=>{
         console.log(response)
    },error=>{
         console.log(error)
    })
  }

  startTimer(): void {
    const timer = setInterval(() => {
      this.remainingTime--;

      if (this.remainingTime <= 0) {
        clearInterval(timer);
        this.showLoader = false;
      }
    }, 1000);
  }

  // startTimer(): void {
  //   const timer = setInterval(() => {
  //     this.remainingTime--;

  //     if (this.remainingTime <= 0) {
  //       clearInterval(timer);
  //     }
  //   }, 1000);
  // }

  // handleFileInput(input: any): void {
  //   if (input.files && input.files.length > 0) {
  //     this.showLoader = true;
  //     this.startTimer();

  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       setTimeout(() => {
  //         this.showLoader = false;
  //         this.showImage = true;
  //         this.imageUrl = event.target.result;
  //       }, 30000);
  //     };
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }

  // handleFileInputs(input:any): void {
  //   if (input && input.files && input.files.length > 0) {
  //     this.fileToUpload = input.files.item(0);

  //     // Show image preview
  //     let reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.imageUrl = event.target.result;
  //     };
  //     reader.readAsDataURL(this.fileToUpload);
  //   }
  // }


}
