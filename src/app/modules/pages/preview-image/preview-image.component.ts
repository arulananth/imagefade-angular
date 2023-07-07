import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

  constructor(
    public dialogRef: MatDialogRef<PreviewImageComponent,{ response?: true | false }>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedImage: string | undefined }
  ) {}

  ngOnInit(): void {

  }

  handleFileInput(input: any): void {
    if (input.files && input.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

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
