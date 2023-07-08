import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  priceForm: FormGroup | any;
  editValue: any;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public http: HttpClient,
    private apiService: ApiService,
    private toastr: ToastrService,
    private auth: AuthService,
    public dialog: MatDialog,
    public matDialogRef: MatDialogRef<any>,
    public dialogRef: MatDialogRef<AddUsersComponent,{ response?: true | false }>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editValue = data.data;
    console.log('datas',this.editValue);
  }

  ngOnInit(): void {
    if(!this.editValue){
      this.priceForm = this.formBuilder.group({
        title: ['', [Validators.required]],
        price: ['', [Validators.required]],
        description: ['', [Validators.required]],
        fileCount: ['', [Validators.required]],
        validDays: ['', [Validators.required]],
      });
    }
    else if(this.editValue){
      this.priceForm = this.formBuilder.group({
        title: [this.editValue.title, [Validators.required]],
        price: [this.editValue.price, [Validators.required]],
        description: [this.editValue.description, [Validators.required]],
        fileCount: [this.editValue.fileCount, [Validators.required]],
        validDays: [this.editValue.validDays, [Validators.required]],
      });
    }

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.priceForm.controls[controlName].hasError(errorName);
  }

  save() {
    if (this.priceForm.invalid) {
      return;
    }
    if(!this.editValue){
      this.apiService.post('/pricing', this.priceForm.value).subscribe(
        (response: any) => {
          console.log('pricing save',response);
          this.toastr.success('pricing saved successfully... ');
          this.matDialogRef.close(response);
        },
        (err: any) => {
          console.log('err',err);
          this.toastr.error('Something went wrong... ');
        }
      );
    }
    else if(this.editValue){
      this.apiService.put('/pricing/'+this.editValue._id, this.priceForm.value).subscribe(
        (response: any) => {
          console.log('pricing save',response);
          this.toastr.success('pricing update successfully... ');
          this.matDialogRef.close(response);
        },
        (err: any) => {
          console.log('err',err);
          this.toastr.error('Something went wrong... ');
        }
      );
    }
  }


}

