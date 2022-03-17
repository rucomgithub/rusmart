import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, NEVER, of, throwError } from 'rxjs';
import { GoogleAuthService } from '../services/google/google-auth.service';
// import { Storage } from '@capacitor/storage';
import { catchError, map, mergeMap, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable()
export class RuSmartInterceptor implements HttpInterceptor {

  constructor(
    private googleAuth: GoogleAuthService,
    private router: Router,
    private storage: Storage,
  ) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.googleAuth.getIsAuthenticated().pipe(
      switchMap(isAuth => {
        if (isAuth === true) {
          console.log('isAuth ' + isAuth);
          // return next.handle(httpRequest);
          return this.googleAuth.getAccessToken().pipe(
            switchMap(acctoken => {
              console.log('acctoken');
              const reqClone = this.setHttpHeaders(httpRequest, acctoken);
              return next.handle(reqClone).pipe(catchError(error => {
                // if (error instanceof HttpErrorResponse && error.status === 401) {}
                console.error('Unauthorized...idToken');
                this.signOut();
                return throwError(error);
              }));
            })
          );
        } else {
          console.log('isAuth ' + isAuth);
          return this.googleAuth.getGoogleIdToken().pipe(
            switchMap(idToken => {
              console.log('idToken');
              const reqClone = this.setHttpHeaders(httpRequest, idToken);
              return next.handle(reqClone).pipe(catchError(error => {
                // if (error instanceof HttpErrorResponse && error.status === 401) {}
                console.error('Unauthorized...idToken');
                this.signOut();
                return throwError(error);
              }));
            })
          );
        }
      }));

  }

  private setHttpHeaders(httpRequest: HttpRequest<any>, token: string) {
    return httpRequest.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    });
  }

  private signOut() {
    this.googleAuth.signOut();
    //  this.router.navigate(['/home'])
  }
}