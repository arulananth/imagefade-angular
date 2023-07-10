import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup | any;
  hide = true;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public http: HttpClient,
    private apiService: ApiService,
    private toastr: ToastrService,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
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
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.apiService.post('/auth/signIn', this.loginForm.value).subscribe(
      (response: any) => {
        console.log('response',response);
        if(response && response.res){
          if(response.res.user.role === 'user'){
            this.toastr.success('Login Successfully...');
            localStorage.setItem('Token', JSON.stringify(response.res.token));
            localStorage.setItem('currentUser', JSON.stringify(response.res.user));
            setTimeout(() => {
              this.location.go('/pages/home');
              location.reload();
              // this.router.navigate(['/pages/home']);
            }, 1500);
          }
          else if(response.res.user.role === 'admin'){
            this.toastr.success('Login Successfully...');
            localStorage.setItem('Token', JSON.stringify(response.res.token));
            localStorage.setItem('currentUser', JSON.stringify(response.res.user));
            setTimeout(() => {
              this.location.go('/admin/dashboard');
              location.reload();
              // this.router.navigate(['/admin/dashboard']);
            }, 1500);
          }
        }
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
