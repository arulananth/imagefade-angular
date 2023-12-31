import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup | any;
  hide = true;
  hide1 = true;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public http: HttpClient,
    private apiService:ApiService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
      // password: ['', [
      //   Validators.required,
      //   Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/),
      //   Validators.minLength(8),
      //   Validators.maxLength(20)
      // ]],
      // confirmPassword: ['', [
      //   Validators.required,
      //   Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/),
      //   Validators.minLength(8),
      //   Validators.maxLength(20)
      // ], this.passwordMatchValidator()]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword && confirmPassword !== '') {
      formGroup.get('confirmPassword')?.setErrors({ 'mismatch': true });
    }
    return null;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resetForm.controls[controlName].hasError(errorName);
  }

  resetPassword() {
    if (this.resetForm.invalid) {
      return;
    }
    this.apiService.post('/auth/resetpassword', this.resetForm.value).subscribe(
      (response: any) => {
        console.log('response',response);
        this.toastr.success('Password change successfully... ');
        this.router.navigate(['/auth/login']);
      },
      (err: any) => {
        console.log('err',err);
        this.toastr.error(err.message.errorMessage);
      }
    );
  }


}


