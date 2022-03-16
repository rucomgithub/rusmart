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
import { from, Observable, of, throwError } from "rxjs";
import { GoogleAuthService } from "../services/google/google-auth.service";
import { Storage } from "@capacitor/storage";
import { catchError, mergeMap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class RuSmartInterceptor implements HttpInterceptor {
  //public current_usr: any = {};
  constructor(private googleAuth: GoogleAuthService, private router: Router) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('intercepter');
    // // console.log('-----'+this.googleAuth.getWut());
    // // const wut = this.googleAuth.getWut().then(
    // //   data=>{
    // //     return data
    // // });
    // // console.log('xxxxx'+JSON.stringify(wut));
    // // this.googleAuth.getWut().then(data=>{
    // //   console.log(data);
    // // });
    // // //console.log(a);
    // // this.getStoredData();
    // // console.log(typeof (this.current_usr));
    // // console.log(JSON.stringify(this.current_usr));

    // const isAuth =  this.googleAuth.getIsAuthenticated().then(isAuth => {
    //   console.log('show isAuth' + isAuth);
    //   if (false) {
    //     const accessToken =  this.googleAuth.getAccessToken();
    //     httpRequest = this.setHttpHeaders(httpRequest, accessToken);
    //   } else {
    //     this.googleAuth.getGoogleIdToken().then(idToken => {
    //       console.log('show idToken' + idToken);
    //       httpRequest = this.setHttpHeaders(httpRequest, idToken);
    //       // console.log('data getGoogleIdToken' + data);
    //       return next.handle(httpRequest).pipe(catchError(error => {
    //         // if (error instanceof HttpErrorResponse && error.status === 401) {}
    //         console.error("Unauthorized...")
    //         this.signOut();
    //         return throwError(error);
    //       }));
    //     });
    //   }
    //   return true;
    // });
    // return next.handle(httpRequest);

    let promise = this.googleAuth.getGoogleIdToken();
    console.log(typeof promise);
    // return Observable.fromPromise(promise).mergeMap((token) => {
    //   let clonedReq = this.setHttpHeaders(httpRequest, token);
    //   return next.handle(clonedReq).pipe(
    //     catchError((error) => {
    //       // Perhaps display an error for specific status codes here already?
    //       // Pass the error to the caller of the function
    //       return _throw(error);
    //     })
    //   );
    // });
    return next.handle(httpRequest);
  }

  // public  getStoredData() {
  //   return this.googleAuth.getWut().then(data => {
  //     this.current_usr = data;
  //   });
  // }

  private setHttpHeaders(httpRequest: HttpRequest<any>, token: string) {
    return (httpRequest = httpRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }));
  }

  private signOut() {
    this.googleAuth.signOut();
    //  this.router.navigate(['/home'])
  }
}
