import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
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
          this.toastr.success('Login Successfully...');
          localStorage.setItem('Token', JSON.stringify(response.res));
          setTimeout(() => {
            this.router.navigate(['/pages/home']);
          }, 1500);
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
