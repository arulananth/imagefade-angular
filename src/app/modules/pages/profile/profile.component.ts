import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  changePasswordForm: FormGroup | any;
  hide = true;
  hide1 = true;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public http: HttpClient,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
      // password: ['', [Validators.required,
      //   Validators.pattern(
      //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      //   ),
      //   Validators.minLength(8),
      //   Validators.maxLength(20)]
      // ]
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.changePasswordForm.controls[controlName].hasError(errorName);
  }

  changePassword() {
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.apiService.post('/users/change-password', this.changePasswordForm.value).subscribe(
      (response: any) => {
        console.log('response',response);
        this.toastr.success(response.res.message);
      },
      (err: any) => {
        console.log('err',err);
        this.toastr.error(err.message.errorMessage);
      }
    );
  }

  googleSubmit(){

  }
  appSubmit(){

  }

}
