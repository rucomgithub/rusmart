import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { GoogleAuthService } from '../services/google/google-auth.service';
// import { Storage } from '@capacitor/storage';
import { catchError , switchMap} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class RuSmartInterceptor implements HttpInterceptor {

  constructor(private googleAuth: GoogleAuthService, private router: Router) { }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

   return this.googleAuth.getIsAuthenticated().pipe(
     switchMap(isAuth => {
       if(isAuth == true){
        return this.googleAuth.getAccessToken().pipe(
          switchMap( accessToken=>{
            console.log('accessToken => ',accessToken);
            const httpClone = this.setHttpHeaders(httpRequest, accessToken);
            return next.handle(httpClone);
          })
        );
       }else{
        return this.googleAuth.getGoogleIdToken().pipe(
          switchMap( idToken=>{
            console.log('token => ',idToken);
            const httpClone = this.setHttpHeaders(httpRequest, idToken);
            return next.handle(httpClone);
          })
        );
       }
     })
   );





  }


  private setHttpHeaders(httpRequest: HttpRequest<any>, token: string) {
    return httpRequest = httpRequest.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  private signOut() {
    this.googleAuth.signOut();
  //  this.router.navigate(['/home'])
  }

}
