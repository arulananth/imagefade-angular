import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router, private authservice: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if ( !!localStorage.getItem('currentUser') && !!localStorage.getItem('Token') &&
      !!JSON.parse(localStorage.getItem('currentUser') || '')['_id'] ) {

        let roleType = JSON.parse(localStorage.getItem('currentUser') || '')['role'] == 'user';
        if (roleType) return true;
        else this.authservice.logOut();
        return false;

    }
    else if (localStorage.getItem('currentUser')){
      this.authservice.logOut();
      return true;
    }
    else {
      this.authservice.logOut();
      return true;
    }
  }
}
