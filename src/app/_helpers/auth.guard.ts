import { switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GoogleAuthService } from '../services/google/google-auth.service'

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authserviceService: GoogleAuthService,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authserviceService.getIsAuthenticated().pipe(
        tap(isAuth => {
          console.log('show is AuthGuard=>',isAuth);
          if(isAuth){
            console.log("show is AuthGuard True=>" ,isAuth);
            this.authserviceService.setIsAuthenticated(isAuth);
            return isAuth;
          }
          // not logged in so redirect to login page with the return url
          console.log("need login");
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

          return isAuth;
        })
      );
      //return true;


  }

}
