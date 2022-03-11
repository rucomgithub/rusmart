import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { GoogleAuthService } from '../services/google/google-auth.service';
import { Storage } from '@capacitor/storage';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class RuSmartInterceptor implements HttpInterceptor {

  constructor(private googleAuth: GoogleAuthService, private router: Router) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const isAuth = this.googleAuth.getIsAuthenticated();
    if (isAuth == true) {
      const accessToken = this.googleAuth.getAccessToken()
      httpRequest = this.setHttpHeaders(httpRequest, accessToken);
    } else {
      const idToken = this.googleAuth.getGoogleIdToken()
      httpRequest = this.setHttpHeaders(httpRequest, idToken);
    }

    return next.handle(httpRequest).pipe(catchError(error => {
      // if (error instanceof HttpErrorResponse && error.status === 401) {}
      console.error("Unauthorized...")
      this.signOut();
      return throwError(error);
    }));
  }


  private setHttpHeaders(httpRequest: HttpRequest<any>, token: string) {
    return httpRequest = httpRequest.clone({
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    });
  }

  private signOut() {
    this.googleAuth.signOut();
  //  this.router.navigate(['/home'])
  }

}