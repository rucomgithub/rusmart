
   
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Token } from '../student';



@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  public currentUser: Observable<Token>;
  private currentUserSubject: BehaviorSubject<Token>;


  token: Token = {
    accessToken: '',
    isAuth: false,
  };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('isAuth')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  googleAuth(idToken: string, stdCode: string): Observable<Token> {

    const playLoad = {
      'std_code': stdCode
    };
    this.setGoogleIdToken(idToken);
    this.setStudentCode(stdCode);
    return this.http.post<Token>(`${environment.googleAuth}`, playLoad).pipe(
      tap(res => {
        this.setAccessToken(res.accessToken);
        this.setIsAuthenticated(res.isAuth);
        this.currentUserSubject.next(res);
      }),
      catchError(err => {
        return throwError(err);
      })
    );

  }

  setGoogleIdToken(idToken: string) {
    localStorage.setItem('idToken', idToken);
  }

  getGoogleIdToken(): string {
    return localStorage.getItem('idToken');
  }

  setStudentCode(stdCode: string) {
    localStorage.setItem('stdCode', stdCode);
  }

  getStudentCode(): string {
    return localStorage.getItem('stdCode');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  setIsAuthenticated(isAuth: boolean) {
    localStorage.setItem('isAuth',  JSON.stringify(isAuth));
  }

  getIsAuthenticated(): boolean {
    return JSON.parse(localStorage.getItem('isAuth'));
  }

  revokeGoogleIdToken() {
    localStorage.removeItem('idToken');
  }

  revokeStudentCode() {
    localStorage.removeItem('stdCode');
  }

  revokeAccessToken() {
    localStorage.removeItem('accessToken');
  }

  revokeIsAuthenticated() {
    localStorage.removeItem('isAuth');
  }

  signOut() {
    this.revokeGoogleIdToken();
    this.revokeStudentCode();
    this.revokeIsAuthenticated();
    this.revokeAccessToken();
    this.currentUserSubject.next(null);
    //window.location.reload();
    //this.router.navigate(['/runews']);
  }
}