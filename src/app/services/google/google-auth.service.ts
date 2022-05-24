import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
//import { Storage } from '@capacitor/storage';อย่าได้เปิด
//import { Storage } from '@ionic/storage';
import { Storage } from "@ionic/storage";
import { Observable, throwError, BehaviorSubject, from } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";

import { Token } from "../student";

import { Authentication } from "../../services/google/googleAuth";

@Injectable({
  providedIn: "root",
})
export class GoogleAuthService {
  public currentUser: Observable<Token>;
  private currentUserSubject: BehaviorSubject<Token>;

  token: Token = {
    accessToken: "",
    isAuth: false,
  };

  authentication: Authentication = {
    accessToken: "",
    refreshToken: "",
    isAuth: false,
    message: "",
    status_code: null,
  };

  authState = new BehaviorSubject<Authentication>(this.authentication);

  public get authStateObs() {
    return this.authState.asObservable();
  }

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {
    this.setIsAuth(localStorage.getItem('isAuth'))
    this.currentUserSubject = new BehaviorSubject<Token>(
      JSON.parse(localStorage.getItem("isAuth"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  // googleAuth(idToken: string, stdCode: string): Observable<Token> {
  //   const playLoad = {
  //     std_code: stdCode,
  //   };
  //   this.setGoogleIdToken(idToken);
  //   this.setStudentCode(stdCode);

  //   this.setGoogleIdTokenT(idToken);
  //   this.setStudentCodeT(stdCode);

    

  //   return this.http
  //     .post<Authentication>(`${environment.googleAuth}`, playLoad)
  //     .pipe(
  //       tap((res) => {
  //         this.setAccessToken(res.accessToken);
  //         this.setIsAuthenticated(res.isAuth);
  //         this.setRefreshToken(res.refreshToken);

  //         // local storage
  //         this.setAccessTokenT(res.accessToken);
  //         this.setIsAuthenticatedT(res.isAuth);
  //         this.setRefreshTokenT(res.refreshToken);

  //         this.setIsAuth(JSON.stringify(res.isAuth))
  //         this.currentUserSubject.next(res);

  //       }),
  //       catchError((err) => {
  //         return throwError(err);
  //       })
  //       );
  //     }
      
  //     refreshAuthen(): Observable<Authentication> {
  //       const playLoad = {
  //         std_code: this.getStudentCodeT(),
  //         refresh_token: this.getRefreshTokenT()
  //       };
        
  //       return this.http
  //       .post<Authentication>(`${environment.refreshAuthentication}`, playLoad)
  //       .pipe(
  //         tap((res) => {
  //           console.log("refreshAuthen api...")
  //           this.setAccessToken(res.accessToken);
  //           this.setIsAuthenticated(res.isAuth);
  //           this.setRefreshToken(res.refreshToken);
            
  //           // local storage
  //           this.setAccessTokenT(res.accessToken);
  //           this.setIsAuthenticatedT(res.isAuth);
  //           this.setRefreshTokenT(res.refreshToken);
            
  //           this.setIsAuth(JSON.stringify(res.isAuth))
  //           this.currentUserSubject.next(res);
  //           console.log("refresh authentication ==> ",res)
  //         })
  //     );
  // }

  googleAuth(stdCode: string): Observable<Token> {
    const playLoad = {
      std_code: stdCode,
    };
    this.setStudentCode(stdCode);

    this.setStudentCodeT(stdCode);

    

    return this.http
      .post<Authentication>(`${environment.googleAuth}`, playLoad)
      .pipe(
        tap((res) => {
          this.setAccessToken(res.accessToken);
          this.setIsAuthenticated(res.isAuth);
          this.setRefreshToken(res.refreshToken);

          // local storage
          this.setAccessTokenT(res.accessToken);
          this.setIsAuthenticatedT(res.isAuth);
          this.setRefreshTokenT(res.refreshToken);

          this.setIsAuth(JSON.stringify(res.isAuth))
          this.currentUserSubject.next(res);

        }),
        catchError((err) => {
          return throwError(err);
        })
        );
      }
      
      refreshAuthen(): Observable<Authentication> {
        const playLoad = {
          std_code: this.getStudentCodeT(),
          refresh_token: this.getRefreshTokenT()
        };
        
        return this.http
        .post<Authentication>(`${environment.refreshAuthentication}`, playLoad)
        .pipe(
          tap((res) => {
            console.log("refreshAuthen api...")
            this.setAccessToken(res.accessToken);
            this.setIsAuthenticated(res.isAuth);
            this.setRefreshToken(res.refreshToken);
            
            // local storage
            this.setAccessTokenT(res.accessToken);
            this.setIsAuthenticatedT(res.isAuth);
            this.setRefreshTokenT(res.refreshToken);
            
            this.setIsAuth(JSON.stringify(res.isAuth))
            this.currentUserSubject.next(res);
            console.log("refresh authentication ==> ",res)
          })
      );
  }

  setIsAuth(isAuth: string) {
    if (isAuth != null && isAuth != undefined) {
      if(isAuth == 'true') {
        this.setIsAuthenticatedT(true)
        this.setStateAuthen();
      } else {
        this.setIsAuthenticatedT(false)
        this.revokeStateAuthen();
      }
    }
  }

  setStateAuthen() {
    let state: Authentication = {
      accessToken: this.getAccessTokenT(),
      refreshToken: this.getRefreshTokenT(),
      isAuth: this.getIsAuthenticatedT(),
      message: "",
      status_code: null,
    };

    this.authState.next(state)
  }

  revokeStateAuthen() {
    let state: Authentication = {
      accessToken: "",
      refreshToken: "",
      isAuth: false,
      message: "",
      status_code: null,
    };

    this.authState.next(state)
  }

  setGoogleIdToken(idToken: string) {
    this.storage.set("idToken", idToken);
  }
  getGoogleIdToken() {
    return from(this.storage.get("idToken"));
  }

  private setStudentCode(stdCode: string) {
    this.storage.set("stdCode", stdCode);
  }
  getStudentCode() {
    return from(this.storage.get("stdCode"));
  }

  setAccessToken(accessToken: string) {
    this.storage.set("accessToken", accessToken);
  }
  getAccessToken() {
    return from(this.storage.get("accessToken"));
  }

  setRefreshToken(refreshToken: string) {
    this.storage.set("refreshToken", refreshToken);
  }
  getRefreshToken() {
    return from(this.storage.get("refreshToken"));
  }

  setIsAuthenticated(isAuth: boolean) {
    this.storage.set("isAuth", isAuth);
  }

  getIsAuthenticated() {
    return from(this.storage.get("isAuth"));
  }

  revokeGoogleIdToken() {
    this.storage.remove("idToken");
  }

  revokeStudentCode() {
    this.storage.remove("stdCode");
  }

  revokeAccessToken() {
    this.storage.remove("accessToken");
  }

  revokeRefreshToken() {
    this.storage.remove("refreshToken");
  }

  revokeIsAuthenticated() {
    this.storage.remove("isAuth");
  }

  signOut() {
    this.revokeGoogleIdToken();
    this.revokeStudentCode();
    this.revokeIsAuthenticated();
    this.revokeAccessToken();
    this.revokeRefreshToken();
    this.revokeIsImageT();
    this.revokeGoogleIdTokenT();
    this.revokeStudentCodeT();
    this.revokeIsAuthenticatedT();
    this.revokeAccessTokenT();
    this.revokeRefreshTokenT();
    this.revokeStateAuthen();
    this.currentUserSubject.next(null);
    this.router.navigate(["/app/tabs/home"]);
  }

  setRefreshTokenT(refreshToken: string) {
    localStorage.setItem("refreshToken", refreshToken);
  }
  getRefreshTokenT() {
    return localStorage.getItem("refreshToken");
  }

  setGoogleIdTokenT(idToken: string) {
    localStorage.setItem("idToken", idToken);
  }

  getGoogleIdTokenT(): string {
    return localStorage.getItem("idToken");
  }

  setStudentCodeT(stdCode: string) {
    localStorage.setItem("stdCode", stdCode);
  }

  getStudentCodeT(): string {
    return localStorage.getItem("stdCode");
  }

  setAccessTokenT(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
  }

  getAccessTokenT() {
    return localStorage.getItem("accessToken");
  }

  setIsAuthenticatedT(isAuth: boolean) {
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
  }

  getIsAuthenticatedT(): boolean {
    return JSON.parse(localStorage.getItem("isAuth"));
  }

  revokeGoogleIdTokenT() {
    localStorage.removeItem("idToken");
  }

  revokeStudentCodeT() {
    localStorage.removeItem("stdCode");
  }

  revokeAccessTokenT() {
    localStorage.removeItem("accessToken");
  }

  revokeRefreshTokenT() {
    localStorage.removeItem("refreshToken");
  }

  revokeIsAuthenticatedT() {
    localStorage.removeItem("isAuth");
  }
  revokeIsImageT() {
    localStorage.removeItem("imageUrl");
  }
  
}
