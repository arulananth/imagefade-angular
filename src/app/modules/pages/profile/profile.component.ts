import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    private toastr: ToastrService,
    private auth: AuthService
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
    this.changePasswordForm.addControl('email', new FormControl(this.auth.userEmail));
    this.changePasswordForm.addControl('verificationCode', new FormControl('123456'));
    this.apiService.post('/users/change-password', this.changePasswordForm.value).subscribe(
      (response: any) => {
        console.log('response',response);
        this.toastr.success(response.res.message);
      },
      (err: any) => {
        console.log('err',err);
        this.toastr.error('Something went wrong... ');
      }
    );
  }

  googleSubmit(){

  }
  appSubmit(){

  }

}
