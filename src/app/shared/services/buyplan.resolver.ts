import { ActivatedRoute, ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BuyPlanResolver implements Resolve<any> {
  constructor(
    private AuthService: AuthService,
    private Apiservice: ApiService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return new Promise((resolve, reject) => {
      let userId = route.paramMap.get('id');
      this.Apiservice.get('/pricing/' + userId).subscribe((response: any) => {
        console.log('response--- ',response);
        resolve(response);
      });
    });
  }
}
