import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment'
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('Token') ? JSON.parse(localStorage.getItem('Token')||'') : '';
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    });

    return next.handle(request);
  }

}
