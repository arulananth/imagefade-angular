import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  }

}

