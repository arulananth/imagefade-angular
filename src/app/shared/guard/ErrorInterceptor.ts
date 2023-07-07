import { EMPTY, Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {

        if (err.status === 401 || err.status === 404 || err.status === 403) {
          // auto logout if 401 response returned from api
          //  this.authenticationService.logOut;
          //  location.href="/auth/login"
        }

        const error =  err || err.error;
        return throwError(error);
      })

    );

  }
}
