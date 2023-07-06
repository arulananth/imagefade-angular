import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loginForm: FormGroup | any;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public http: HttpClient,
    private apiService: ApiService,
    // private auth: AuthService,
    // public toaster: ToastrService
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
    this.apiService.post('/user/login', this.loginForm.value).subscribe(
      (data: any) => {
        console.log('data',data);
        this.router.navigate(['/pages/home']);
      },
      (err: any) => {
        console.log('err',err);
      }
    );
  }

  googleSubmit(){

  }
  appSubmit(){

  }

}
