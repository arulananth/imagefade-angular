import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if ( !!localStorage.getItem('currentUser') && !!localStorage.getItem('Token') &&
      !!JSON.parse(localStorage.getItem('currentUser') || '')['_id']
    ) {
      let roleType = JSON.parse(localStorage.getItem('currentUser') || '');
      this.router.navigate(['/pages/home']);
      return false;
    } else {
      return true;
    }
  }

}
