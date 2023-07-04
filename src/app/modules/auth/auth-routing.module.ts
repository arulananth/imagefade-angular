import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
    {
      path: 'login',
      component: LoginComponent,
      data: { title: 'Log In' }
    },
    {
      path: '',
      component: LoginComponent,
      data: { title: 'login' }
    },
    {
      path: 'register',
      component: RegisterComponent,
      data: { title: 'register' }
    },
    {
      path: 'forgotPassword',
      component: ForgotPasswordComponent,
      data: { title: 'Forgot Password' }
    },
    {
      path: 'reset',
      component: ResetPasswordComponent,
      data: { title: 'Reset Password' }
    },

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
