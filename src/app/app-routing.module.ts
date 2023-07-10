import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { PagesModule } from './modules/pages/pages.module';
import { ToastrModule } from 'ngx-toastr';
import { ErrorComponent } from './modules/auth/error/error.component';
import { AdminModule } from './modules/admin/admin.module';
import { HomepageComponent } from './modules/pages/homepage/homepage.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { UserGuard } from './shared/guard/user.guard';
import { AdminGuard } from './shared/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'pages',
    loadChildren: () => import('./modules/pages/pages.module').then((m) => m.PagesModule),
    // canActivate: [UserGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
    // canActivate: [AdminGuard],
  },
  {
    path: '**',
    component: ErrorComponent,
    data: { title: '404 Error' },
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    AuthModule,
    PagesModule,
    ToastrModule.forRoot(),
    AdminModule
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    UserGuard,
    AdminGuard
  ],
})
export class AppRoutingModule {}
