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
export class AdminGuardGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      !!localStorage.getItem('currentUser') &&
      !!JSON.parse(localStorage.getItem('currentUser') || '')['_id']
    ) {
      if (JSON.parse(localStorage.getItem('currentUser') || '')) return true;
      else {
        this.router.navigate(['/pages/home']);
        return false;
      }
    } else {
      this.router.navigate(['/pages/home']);
      return false;
    }
  }
}
