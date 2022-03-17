import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
        if (isAuth) {
          // authorised so return true
          // this.router.navigate(['/home']);
          console.log('isAuth', isAuth);
          return isAuth;
        }

        // not logged in so redirect to login page with the return url
        console.log('no Auth', isAuth);
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }));
  }

}