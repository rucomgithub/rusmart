import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { from, NEVER, Observable, throwError } from "rxjs";
import { GoogleAuthService } from "../services/google/google-auth.service";
import { catchError, switchMap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class RuSmartInterceptor implements HttpInterceptor {
  isAuth: boolean;

  constructor(private googleAuth: GoogleAuthService, private router: Router) {
    this.googleAuth.authStateObs.subscribe((obs) => {
      this.isAuth = obs.isAuth;
    });
  }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("interceptor ==> ", this.isAuth);

      const accessToken = this.googleAuth.getAccessTokenT();
      const idToken = this.googleAuth.getGoogleIdTokenT();
      
      if (this.isAuth === true) {
        
        httpRequest = this.setHttpHeaders(httpRequest, accessToken);
        
      } else if ((idToken != null || idToken != undefined) && this.isAuth === false) {
    
        httpRequest = this.setHttpHeaders(httpRequest, idToken);
        
      }
      
      return next.handle(httpRequest).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            const refreshToken = this.googleAuth.getRefreshTokenT();
            console.log("Unauthorized...");
            console.log("refreshToken ==> ", refreshToken)
            console.log("-------------------------- befroe --------------------------")
            console.log("this.googleAuth.getIsAuthenticatedT() ==> ", this.googleAuth.getIsAuthenticatedT())
            console.log("this.isAuth ==> ", this.isAuth)
            console.log("-------------------------------------------------------------")
            console.log()
            console.log("--------------------------  after  --------------------------")
            this.googleAuth.setIsAuth("false");
            console.log("this.googleAuth.getIsAuthenticatedT() ==> ", this.googleAuth.getIsAuthenticatedT())
            console.log("this.isAuth ==> ", this.isAuth)
            console.log("-------------------------------------------------------------")
            this.googleAuth.setIsAuth("false")
          return this.handle401Unauthorized(httpRequest, next);
        } else {
          this.signOut();
          return throwError(error);
        }
      })
    );
  }

  private handle401Unauthorized(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ) {
    if (this.isAuth === false && this.isAuth != null && this.isAuth != undefined) {
      return this.googleAuth.refreshAuthen().pipe(
        switchMap(() => {
          const accessToken = this.googleAuth.getAccessTokenT();
          this.googleAuth.setIsAuth("true")
          return next
            .handle(this.setHttpHeaders(httpRequest, accessToken))
            .pipe(
              catchError((err) => {
                this.signOut();
                return throwError(err);
              })
            );
        })
      );
    } else {
      this.signOut();
    }
  }

  private setHttpHeaders(httpRequest: HttpRequest<any>, token: string) {
    return (httpRequest = httpRequest.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }),
    }));
  }

  private signOut() {
    this.googleAuth.signOut();
    this.router.navigate(["/login"]);
  }
}
