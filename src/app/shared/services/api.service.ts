import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(
    url: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'response';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<{ res: T; status?: number }> {
    const ob: { observe: 'response' } = { observe: 'response' };
    const op = { ...options, ...ob };
    return this.middleware(this.http.get(environment.BACKEND_BASE_URL + url, op));
  }

  post<T>(
    url: string,
    body: any | null,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'response';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<{ res: T; status?: number }> {
    const ob: { observe: 'response' } = { observe: 'response' };
    const op = { ...options, ...ob };
    return this.middleware(this.http.post(environment.BACKEND_BASE_URL + url, body, op));
  }

  put<T>(
    url: string,
    body: any | null,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'response';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<{ res: T; status?: number }> {
    const ob: { observe: 'response' } = { observe: 'response' };
    const op = { ...options, ...ob };
    return this.middleware(this.http.put(environment.BACKEND_BASE_URL + url, body, op));
  }
  patch<T>(
    url: string,
    body: any | null,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'response';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<{ res: T; status?: number }> {
    const ob: { observe: 'response' } = { observe: 'response' };
    const op = { ...options, ...ob };
    return this.middleware(
      this.http.patch(environment.BACKEND_BASE_URL + url, body, op)
    );
  }

  delete<T>(
    url: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe?: 'response';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<{ res: T; status?: number }> {
    const ob: { observe: 'response' } = { observe: 'response' };
    const op = { ...options, ...ob };
    return this.middleware(this.http.delete(environment.BACKEND_BASE_URL + url, op));
  }

  private middleware<T>(
    req: Observable<HttpResponse<any>>
  ): Observable<{ res: T; status?: number }> {
    return req.pipe(catchError(this.handleError)).pipe(
      map((res) => {
        return { res: res.body, status: res.status };
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    const message =
      error.error ||
      error.error.message ||
      'Something bad happened; please try again later';
    return throwError({
      message,
      status: error.status,
    });
  }
}
