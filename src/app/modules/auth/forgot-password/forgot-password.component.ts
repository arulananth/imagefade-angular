import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  ForgotForm: FormGroup | any;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public http: HttpClient,
    private apiService: ApiService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.ForgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ForgotForm.controls[controlName].hasError(errorName);
  }

  Forgot() {
    if (this.ForgotForm.invalid) {
      return;
    }
    this.apiService.post('/auth/forgotpassword', this.ForgotForm.value).subscribe(
      (response: any) => {
        console.log('response',response);
          this.toastr.success(response.res.message);
          // if(response.status === 201){
          //   this.toastr.success(response.res.message.message);
          // }
          setTimeout(() => {
            this.router.navigate(['/auth/reset']);
          }, 2000);
      },
      (err: any) => {
        console.log('err',err);
        this.toastr.error(err.message.type);
      }
    );
  }

}

