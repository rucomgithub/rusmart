import { switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GoogleAuthService } from '../services/google/google-auth.service'

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  isAuth: boolean;

  constructor(
    private router: Router,
    private googleAuth: GoogleAuthService,
  ) {
    this.googleAuth.authStateObs.subscribe(obs => {
      this.isAuth = obs.isAuth
    })
   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.isAuth) {
         return true;
      } else {
        this.signOut()
        return false;
      }

  }


  private signOut() {
    this.googleAuth.signOut();
    this.router.navigate(["/login"]);
  }

}
